
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { HttpsError } from "firebase-functions/v1/https";

admin.initializeApp();

const db = admin.firestore();

// Rate limiting: 30 generations/user/day
const GENERATIONS_PER_USER_PER_DAY = 30;

interface CloneData {
    name: string;
    platforms: string[];
}

export const createClone = functions.https.onCall(async (data: CloneData, context) => {
    if (!context.auth) {
        throw new HttpsError("unauthenticated", "You must be logged in to create a clone.");
    }

    const { name, platforms } = data;

    if (!name || !platforms || !Array.isArray(platforms) || platforms.length === 0) {
        throw new HttpsError("invalid-argument", "Please provide a name and at least one platform.");
    }

    const newClone = {
        name,
        platforms,
        userId: context.auth.uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        status: "training",
    };

    const cloneRef = await db.collection("clones").add(newClone);

    return { id: cloneRef.id, ...newClone };
});

export const listClones = functions.https.onCall(async (_, context) => {
    if (!context.auth) {
        throw new HttpsError("unauthenticated", "You must be logged in to list clones.");
    }

    const snapshot = await db.collection("clones").where("userId", "==", context.auth.uid).get();

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const deleteClone = functions.https.onCall(async (data: { id: string }, context) => {
    if (!context.auth) {
        throw new HttpsError("unauthenticated", "You must be logged in to delete a clone.");
    }

    const { id } = data;

    if (!id) {
        throw new HttpsError("invalid-argument", "Please provide a clone ID.");
    }

    const cloneRef = db.collection("clones").doc(id);
    const cloneDoc = await cloneRef.get();

    if (!cloneDoc.exists || cloneDoc.data()?.userId !== context.auth.uid) {
        throw new HttpsError("not-found", "Clone not found or you don't have permission to delete it.");
    }

    await cloneRef.delete();

    return { id };
});

export const generatePost = functions.https.onCall(async (data: { cloneId: string; topic: string }, context) => {
    if (!context.auth) {
        throw new HttpsError("unauthenticated", "You must be logged in to generate a post.");
    }

    const { cloneId, topic } = data;

    if (!cloneId || !topic) {
        throw new HttpsError("invalid-argument", "Please provide a clone ID and a topic.");
    }

    const userId = context.auth.uid;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const generationsSnapshot = await db
        .collection("generations")
        .where("userId", "==", userId)
        .where("createdAt", ">=", admin.firestore.Timestamp.fromDate(today))
        .get();

    if (generationsSnapshot.docs.length >= GENERATIONS_PER_USER_PER_DAY) {
        throw new HttpsError("resource-exhausted", "You have reached your daily generation limit.");
    }

    // TODO: AI provider integration (Claude 3.5 Sonnet + GPT-4o-mini) with secrets

    const newGeneration = {
        cloneId,
        topic,
        userId,
        content: `This is a generated post about ${topic}`, // Placeholder
        viralScore: Math.floor(Math.random() * 101), // Placeholder
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const generationRef = await db.collection("generations").add(newGeneration);

    await db.collection("audit").add({
        userId,
        action: "generatePost",
        cloneId,
        generationId: generationRef.id,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });


    return { id: generationRef.id, ...newGeneration };
});
            