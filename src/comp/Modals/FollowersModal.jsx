import {
  Dialog,
  CloseButton,
  Flex,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserCard from "./UserCard"; 

const FollowersModal = ({ open, setOpen, userIds, type }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleUnfollow = (uid) => {
      setUsers((prev) => prev.filter((u) => u.uid !== uid));
    };

  useEffect(() => {
    const fetchUsers = async () => {
      if (!userIds || userIds.length === 0) return;
      setLoading(true);

      const chunks = [];
      for (let i = 0; i < userIds.length; i += 10) {
        chunks.push(userIds.slice(i, i + 10));
      }

      const allResults = [];
      for (const chunk of chunks) {
        const q = query(collection(firestore, "users"), where("uid", "in", chunk));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
          allResults.push({ id: doc.id, ...doc.data() });
        });
      }

      setUsers(allResults);
      setLoading(false);
    };

    fetchUsers();
  }, [userIds]);

  return (
   <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          bg="black"
          color="white"
          maxW="sm"
          w="full"
          borderRadius="lg"
          border="1px solid gray"
          p={5}
        >
          <Dialog.CloseTrigger asChild>
            <CloseButton position="absolute" top={2} right={2} />
          </Dialog.CloseTrigger>

          <Dialog.Header>
            <Dialog.Title textAlign="center">{type}</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            {loading ? (
              <Flex justify="center" py={5}>
                <Spinner />
              </Flex>
            ) : (
              <VStack align="start" spacing={4} maxH="300px" overflowY="auto">
                {users.map((user) => (
                  <UserCard key={user.uid} user={user} type={type} onUnfollow={handleUnfollow} />
                ))}
              </VStack>
            )}
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default FollowersModal;