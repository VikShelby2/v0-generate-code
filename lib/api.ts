import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "./firebase";

const functions = getFunctions(app);

export const createClone = httpsCallable(functions, "createClone");
export const listClones = httpsCallable(functions, "listClones");
export const deleteClone = httpsCallable(functions, "deleteClone");
export const generatePost = httpsCallable(functions, "generatePost");
