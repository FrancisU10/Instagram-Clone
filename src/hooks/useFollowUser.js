import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);

  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(firestore, "users", authUser.uid);
      const userToFollowRef = doc(firestore, "users", userId);

      if (isFollowing) {

        await updateDoc(currentUserRef, {
          following: arrayRemove(userId),
        });

        await updateDoc(userToFollowRef, {
          followers: arrayRemove(authUser.uid),
        });

        const updatedFollowing = authUser.following.filter((uid) => uid !== userId);
        setAuthUser({ ...authUser, following: updatedFollowing });

   
        if (userProfile?.uid === userId) {
          const updatedFollowers = userProfile.followers.filter(
            (uid) => uid !== authUser.uid
          );
          setUserProfile({ ...userProfile, followers: updatedFollowers });
        }

      
        if (userProfile?.uid === authUser.uid) {
          setUserProfile({ ...userProfile, following: updatedFollowing });
        }

      
        localStorage.setItem(
          "user-info",
          JSON.stringify({ ...authUser, following: updatedFollowing })
        );

        setIsFollowing(false);
        return false;
      } else {
      
        await updateDoc(currentUserRef, {
          following: arrayUnion(userId),
        });

        await updateDoc(userToFollowRef, {
          followers: arrayUnion(authUser.uid),
        });

        const updatedFollowing = [...authUser.following, userId];
        setAuthUser({ ...authUser, following: updatedFollowing });

        if (userProfile?.uid === userId) {
          const updatedFollowers = [...userProfile.followers, authUser.uid];
          setUserProfile({ ...userProfile, followers: updatedFollowers });
        }

        if (userProfile?.uid === authUser.uid) {
          setUserProfile({ ...userProfile, following: updatedFollowing });
        }

        localStorage.setItem(
          "user-info",
          JSON.stringify({ ...authUser, following: updatedFollowing })
        );

        setIsFollowing(true);
        return true;
      }
    } catch (error) {
      showToast("Error", error.message, "error");
      return isFollowing; 
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      const following = authUser.following.includes(userId);
      setIsFollowing(following);
    }
  }, [authUser, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;