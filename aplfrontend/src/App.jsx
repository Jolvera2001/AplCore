import React, { useState, useRef } from 'react'
import { 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  HStack, 
  Container, 
  Box, 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from "@chakra-ui/react";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <Container maxW='2xl'>
        <HStack spacing={20}>
          <Box w='40%'>
            <Text>HELLO VIETNAM</Text>
            <Button colorScheme="blue" ref={btnRef} onClick={onOpen}>
              Open
            </Button>
          </Box>
          <Box>
            <Card>
              <CardHeader>Register Below!</CardHeader>
              <CardBody>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" placeholder='Username' />
                  <FormLabel>Password</FormLabel>
                  <Input type="text" placeholder='Password' />
                  <FormLabel>Role</FormLabel>
                  <Select placeholder='Role'>
                    <option value='Student'>Student</option>
                    <option value='Graduate'>Graduate</option>
                    <option value='Other'>Other</option>
                    <option value='No Answer'>No Answer</option>
                  </Select>
                  <FormLabel>age</FormLabel>
                  <NumberInput defaultValue={20} min={15} max={100}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </CardBody>
              <CardFooter>
                <HStack spacing={2.5}>
                  <Button colorScheme="blue">Submit</Button>
                  <Button colorScheme="red">Cancel</Button>
                </HStack>
              </CardFooter>
            </Card>
          </Box>
        </HStack>
      </Container>
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
           
          </DrawerBody>
          <DrawerFooter>
            
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default App
