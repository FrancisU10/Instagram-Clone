import { useCallback } from "react"
import { toaster } from "../components/ui/toaster"

const useShowToast = () => {
  const showToast = useCallback((title, description, status) => {
    toaster.create({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
    })
  }, [])

  return showToast
}

export default useShowToast