import { Box, Flex, Link, AvatarRoot, AvatarFallback, AvatarImage} from "@chakra-ui/react";
import { Link as RouterLink} from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from "../../assets/constants";
import { Tooltip } from "../../components/ui/tooltip";





const Sidebar = () => {
  const sidebarItems = [
    {
      icon: <AiFillHome size={25} />,
      text: "Home",
      link: "/",
    },
    {
      icon: <SearchLogo />,
      text: "Search",
    },
    {
      icon: <NotificationsLogo />,
      text: "Notifications",
    },
    {
      icon: <CreatePostLogo />,
      text: "Create",
    },
    {
      icon: 
      <AvatarRoot size={"sm"}>
        <AvatarFallback name="Francis Uko"/>
        <AvatarImage src="/profilepic.png"/>
      </AvatarRoot>,
      text: "Profile",
      link: "/asaprogrammer",
    },
  ];

  return (
    <Box 
      height="100vh"
      borderRight="1px solid"
      borderColor="whiteAlpha.300"
      py={0}
      position="sticky"
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction="column" gap={10} w="full" height="full">
      <Link to={"/"} as={RouterLink} pl={2} display={{base: "none", md: "block"}} cursor={"pointer"}>
          <InstagramLogo />
        </Link>

       
        <Link to={"/"} as={RouterLink} pl={2} display={{base: "block", md: "none"}} borderRadius={6} _hover={{ bg: "whiteAlpha.200" }} w={10} cursor="pointer">
          <InstagramMobileLogo />
        </Link>

        {/* Sidebar Items */}
        <Flex direction="column" gap={5} cursor="pointer">
          {sidebarItems.map ((item, index) => (
          <Tooltip 
          key={index}
          hasArrow
          label = {item.text}
          placement = "right"
          ml = {1}
          openDelay = {500}
          display = {{base: "block", md: "none"}}
          >
            <Link
            display={"flex"}
            to = {item.link || null}
            as={RouterLink}
            alignItems={"center"}
            gap={4}
            _hover={{bg:"whiteAlpha.400"}}
            borderRadius={6}
            p={2}
            w={{base: 10, md:"full"}}>

              {item.icon}
              <Box display={{base:"none", md:"block"}}>
                {item.text}
              </Box>
            </Link>

          </Tooltip>
          ))}
        </Flex>
        
      </Flex>
    </Box>
  );
};

export default Sidebar;