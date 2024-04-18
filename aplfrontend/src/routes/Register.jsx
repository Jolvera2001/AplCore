import React, { useState } from 'react'
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
    //localhost8080/auth/login
    //localhost8080/auth/register
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Student');
    const [age, setAge] = useState(20);

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: null,
                name: name,
                password: password,
                email: email,
                role: role,
                age: age
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))

        console.log(response)
    }

    return(
        <>
            <Container maxW='2xl'>
                <HStack spacing={20}>
                    <Box m={5} my={16} w='100vh'>
                        <Card boxShadow='lg'>
                        <CardHeader>Register Below!</CardHeader>
                        <CardBody>
                            <FormControl>
                            <FormLabel>name</FormLabel>
                            <Input type="text" placeholder='name' value={name} onChange={e => setName(e.target.value)}/>
                            <FormLabel>Password</FormLabel>
                            <Input type="text" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
                            <FormLabel>Role</FormLabel>
                            <Select placeholder='Role' value={role} onChange={e => setRole(e.target.value)}>
                                <option value='Student'>Student</option>
                                <option value='Graduate'>Graduate</option>
                                <option value='Other'>Other</option>
                                <option value='No Answer'>No Answer</option>
                            </Select>
                            <FormLabel>age</FormLabel>
                            <NumberInput defaultValue={20} min={15} max={100} value={age} onChange={e => setAge(e)}>
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
                            <Button colorScheme="blue" onClick={handleSubmit}>Submit</Button>
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