import {
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import {
  Dialog,
  Portal,
  CloseButton,
  Input,
} from "@chakra-ui/react";
import { Tooltip } from "../../components/ui/tooltip";
import { SearchLogo } from "../../assets/constants";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useRef } from "react";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";
import useSearchUser from "../../hooks/useSearchUser";

const Search = () => {
  const searchRef = useRef(null);
  const { user, isLoading, getUserProfile, setUser } = useSearchUser();
  const handleSearchUser = (e) => {
    e.preventDefault();
    const value = searchRef.current?.value?.trim();
    if (value) {
      getUserProfile(value);
    }
  };
  console.log(user)
  return (
    <Dialog.Root>
      <Tooltip
        content="Search"
        showArrow
        openDelay={500}
        positioning={{ placement: "left-start" }}
      >
        <Dialog.Trigger asChild>
          <Flex
            alignItems="center"
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            justifyContent={{ base: "center", md: "flex-start" }}
            ml={1}
            cursor="pointer"
          >
            <SearchLogo />
            <Box display={{ base: "none", md: "block" }}>Search</Box>
          </Flex>
        </Dialog.Trigger>
      </Tooltip>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="black"
            color="white"
            maxW="400px"
            w="full"
            borderRadius="lg"
            p={3}
          >
            <Dialog.CloseTrigger asChild>
              <CloseButton position="absolute" top={2} right={2} />
            </Dialog.CloseTrigger>

            <Dialog.Header mb={2}>
              <Dialog.Title>Search User</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body pb={3}>
              <form onSubmit={handleSearchUser}>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input placeholder='Username' ref={searchRef} />
                </FormControl>

                <Flex w="full" justifyContent="flex-end">
                  <Button
                    type="submit"
                    size="sm"
                    mt={4}
                    loading ={isLoading}
                    bg="gray.800"
                    color="white"
                    _hover={{ bg: "gray.900" }}
                  >
                    Search
                  </Button>
                </Flex>
              </form>
              {user && <SuggestedUser user={user} setUser={setUser} />}
            </Dialog.Body>

          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Search;