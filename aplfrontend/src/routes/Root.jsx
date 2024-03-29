import React, { useState, useRef } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { 
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Button,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Outlet, Link as ReactRouterLink } from 'react-router-dom';

function Root() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()


  return (
    <>
      <Drawer
      isOpen={isOpen}
      placement='left'
      onClose={onClose}
      finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <Stack>
              <ChakraLink as={ReactRouterLink} to='/home'>Home</ChakraLink>
              <ChakraLink as={ReactRouterLink} to='/register'>Register</ChakraLink>
              <ChakraLink as={ReactRouterLink} to='/addapl'>Add Application</ChakraLink>
              <ChakraLink as={ReactRouterLink} to='/profile'>Profile</ChakraLink>
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Box w='100%' p={5} color='white'>
        <Button ref={btnRef} onClick={onOpen} leftIcon={<GiHamburgerMenu />}>Menu</Button>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </>
  )
}

export default Root
