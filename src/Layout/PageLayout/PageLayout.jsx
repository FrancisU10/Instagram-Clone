import { Box, Flex, Spinner } from "@chakra-ui/react"
import Sidebar from "../../comp/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase/firebase"
import Navbar from "../../comp/Navbar/Navbar"

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);

  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar = !user && !loading && pathname !== "/auth";
  const checkUserIsAuth = !user && loading;

  if (checkUserIsAuth) return <PageLayoutSpinner />;

  return (
    <Flex flexDir={canRenderNavbar ? "column" : "row"} minH="100vh">
      {canRenderSidebar && (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      )}

      {canRenderNavbar && <Navbar />}

      <Box flex={1} px={{ base: 4, md: 8 }} py={4}>
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Flex flexDir="column" h="100vh" alignItems="center" justifyContent="center">
      <Spinner size="xl" />
    </Flex>
  );
};