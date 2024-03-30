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
  Flex,
  Spacer,
  Heading,
  HStack,
  Icon,


} from "@chakra-ui/react";
import AplCoreLogo from '../assets/AplCoreLogo.svg'
import { Outlet, Link as ReactRouterLink } from 'react-router-dom';

function Root() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()


  return (
    <>
      <Drawer
      isOpen={isOpen}
      placement='right'
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
      <Flex>
        <Box w='100%' p={5} padding={4} borderBottom='1px' borderColor='black' bg="tomato">
          <HStack>
            <img src={AplCoreLogo} style={{width: "3.75%"}} />
            <Heading size='lg'>AplCore</Heading>
            <Spacer />
            <Button ref={btnRef} onClick={onOpen} leftIcon={<GiHamburgerMenu />}>Menu</Button>
          </HStack>
        </Box>
      </Flex>
      <Box>
        <Outlet />
      </Box>
    </>
  )
}

export default Root
