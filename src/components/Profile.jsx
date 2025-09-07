import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function Profile() {
  const [userDetails, setUserDetails] = useState("");

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docSnap = getDoc(doc(db, "Users", user.uid));
        if ((await docSnap).exists()) {
          setUserDetails((await docSnap).data());
        }
      } else {
        toast.error(error.message, {
          position: "bottom-center",
        });
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <h1>Welcome</h1>
      <div>
        <p>{userDetails.email}</p>
        <p>{userDetails.name}</p>
        <p>{userDetails.photo}</p>
      </div>
    </>
  );
}

export default Profile;
