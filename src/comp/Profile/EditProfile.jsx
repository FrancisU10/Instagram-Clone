import {
    Button,
    Flex,
    Stack,
    Input,
    Heading,
    Dialog,
    Avatar,
    AvatarImage,
    Text,
    Box,
    AvatarFallback
  } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdClose } from "react-icons/md"
import usePreviewImg from "../../hooks/usePreviewImg";
import useAuthStore from "../../store/authStore";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";
  
  const EditProfile = ({ isOpen, onClose }) => {
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        bio: ''
    })
    const authUser = useAuthStore((state) => state.user)
    const fileRef = useRef(null)
    const {handleImageChange, selectedFile, setSelectedFile } = usePreviewImg()
    const {isUpdating, editProfile} = useEditProfile()
    const showToast = useShowToast()
    const handleEditProfile = async() => {
        try {
            await editProfile(inputs, selectedFile)
            setSelectedFile(null)
            onClose()

        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }
    return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="bg"
            color="fg"
            borderRadius="xl"
            boxShadow="lg"
            px={6}
            py={8}
            maxW="sm"
            w="full"
            position="relative"
          >
            <Dialog.CloseTrigger>
                <Box display="flex" justifyContent="flex-end" p={2}>
                    <MdClose size={20} cursor={"pointer"} onClick={onClose} />
                </Box>
            </Dialog.CloseTrigger>
  
            <Dialog.Header>
              <Dialog.Title asChild>
                <Heading size="md" textAlign="center" w="full">
                  Edit Profile
                </Heading>
              </Dialog.Title>
            </Dialog.Header>
  
            <Dialog.Body >
                <Stack spacing={4}>
                    <Flex align="center" justify="center" gap={4}>
                        <Avatar.Root boxSize={"100px"} variant="solid">
                            <AvatarFallback name= {authUser.username} />
                            <AvatarImage src= {selectedFile || authUser.profilePicURL} />
                        </Avatar.Root>
                        <Button size="sm" variant="solid" bg={"gray.700"} color={"white"} _hover={{bg: "gray.800"}} onClick={() => fileRef.current.click()}>
                            Edit Profile Picture
                        </Button>
                        <Input type="file" hidden ref={fileRef} onChange={handleImageChange}/>
                    </Flex>
                    <Stack >
                        <Text> Full Name </Text>
                        <Input placeholder="Full Name" value={inputs.fullName || authUser.fullName} onChange={(e) => setInputs({...inputs, fullName: e.target.value})}/>
                        <Text> Username </Text>
                        <Input placeholder="Username" value={inputs.username || authUser.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} />
                        <Text> Bio </Text>
                        <Input placeholder="Bio" value={inputs.bio || authUser.bio} onChange={(e) => setInputs({...inputs, bio: e.target.value})} />
                    </Stack>
                </Stack>
            </Dialog.Body>

  
            <Dialog.Footer pt={6}>
              <Flex w="full" gap={4}>
                <Button flex={1} bg={"red.500"} color={"white"} _hover={{bg: "red.600"}} onClick={onClose}>
                  Cancel
                </Button>
                <Button flex={1} bg={"blue.500"} color={"white"} _hover={{bg: "blue.600"}} onClick={handleEditProfile} loading = {isUpdating}>
                  Submit
                </Button>
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
      </>
    )
  }

  export default EditProfile