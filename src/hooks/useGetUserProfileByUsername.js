import { useEffect, useState } from "react"
import useShowToast from "./useShowToast"
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import useUserProfileStore from "../store/userProfileStore"


const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true)
  const showToast = useShowToast()
  const {userProfile, setUserProfile} = useUserProfileStore()

  useEffect(() => {
    const getUserProfile = async() => {
        setIsLoading(true)
        try {
            const q = query(collection(firestore, "users"), where("username", "==", username))
            console.log("Querying Firestore for username:", username);
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                setUserProfile(null)
                return
            } 
            let userDoc
            querySnapshot.forEach((doc) => {
                userDoc = doc.data()
                console.log("Matched user doc:", userDoc);
            })
            setUserProfile(userDoc)
            console.log(userDoc);
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLoading(false)
        }
    }
    getUserProfile()

  }, [setUserProfile, username, showToast])
  return {isLoading, userProfile}
}

export default useGetUserProfileByUsername