import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignIn() {
  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">Sign In</h1>
        <p className="mb-6 text-center text-gray-600">Choose your preferred sign-in method</p>
        <div className="space-y-4">
          <button
            onClick={GoogleLogin}
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign in with Google
          </button>
          <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <FaGithub className="mr-2 h-5 w-5" />
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
