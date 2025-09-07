import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function Profile() {
  const [userDetails, setUserDetails] = useState("");

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "Users", user.uid));
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
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
        <img src={userDetails.photo}/>
      </div>
    </>
  );
}

export default Profile;
