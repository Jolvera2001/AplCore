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
  Grid,
  GridItem,
  Link,
  Text

} from "@chakra-ui/react";
import AplCoreLogo from '../assets/AplCoreLogo.svg'
import { Outlet, Link as ReactRouterLink } from 'react-router-dom';

function Main() {
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
              <ChakraLink as={ReactRouterLink} to='/main/home'>Home</ChakraLink>
              <ChakraLink as={ReactRouterLink} to='/main/profile'>Profile</ChakraLink>
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
      <Box h='125px' bg='black' p={10}>
        <Grid>
          <GridItem>
            <Link href="https://clearbit.com" target='_blank'>
              <Text color='white' fontSize='lg'>Logo API</Text>
            </Link>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}

export default Main
