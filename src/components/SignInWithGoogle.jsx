import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

function SignInWithGoogle() {
  const googleSignIn = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        });
      }
      window.location.href = '/profile'
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div
        className="flex justify-center cursor-pointer rounded"
        onClick={googleSignIn}
      >
        <img
          src="/images/google.png"
          width={"60%"}
          className="bg-white rounded mx"
        />
      </div>
    </>
  );
}

export default SignInWithGoogle;
