import React from 'react'
import {
    Box,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Container,
    FormControl,
    FormLabel,
    HStack,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
    Text,
} from '@chakra-ui/react'

function Register() {
    return(
        <>
            <Container maxW='2xl'>
                <HStack spacing={20}>
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
        </>
    )
}

export default Register