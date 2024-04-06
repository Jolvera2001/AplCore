import React, { useState, useEffect } from 'react'
import {
    Avatar,
    AvatarBadge,
    Badge,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Container,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    HStack,
    Input,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Spacer,
    Spinner,
    Stack,
    Text,
    Textarea,
    useDisclosure,

} from '@chakra-ui/react';
import { FaCheck, FaBan } from "react-icons/fa6"

function Home() {
    const [data, setData] = useState([]); // empty list
    const [editing, setEditing] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetch('http://localhost:8080/application/6600ed08f2a198fc24d51273')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);

    function getStatusColor(status) {
        switch (status) {
            case 'Pending':
                return 'yellow';
            case 'Accepted':
                return 'green';
            case 'Interview':
                return 'purple';
            case 'Rejected':
                return 'red';
        }
    }

    return (
        <>
            <Flex mt={10} mx={7} >
                <Box w="40%" overflow="auto" maxHeight="85vh">
                    <Stack spacing={2.5} >
                        <HStack>
                            <Button onClick={onOpen}>Add Aplication</Button>
                        </HStack>
                        {data ? data.map((apl, index) => (
                            <Card key={index} size='sm' onClick={() => setEditing(apl)} >
                                <CardHeader>
                                    <HStack>
                                        <Avatar size='sm' name={apl.company} src={`https://logo.clearbit.com/${apl.company}.com?size=112`}> 
                                            <AvatarBadge boxSize='1.25em' bg={getStatusColor(apl.status)} borderColor=''/>
                                        </Avatar>
                                        <Heading size='md'>{apl.title}</Heading>
                                        <Badge colorScheme={getStatusColor(apl.status)} variant='subtle' >{apl.status}</Badge>
                                    </HStack>
                                    <Text as='i' >{apl.company}</Text>
                                </CardHeader>
                                <CardBody>
                                    <Text>{apl.description}</Text>
                                </CardBody>
                                <CardFooter>

                                </CardFooter>
                            </Card>
                        )) : <Spinner size='lg' />}
                    </Stack>
                </Box>
                <Spacer/>
                <Center>
                    <Divider orientation='vertical' color='black' />
                </Center>
                <Spacer/>
                <Box w="50%" h='100vh'>
                    { editing ? (
                        <Box key={editing._id}>
                            <Stack>
                                <HStack spacing={3}>
                                    <Avatar size='md' name={editing.company} src={`https://logo.clearbit.com/${editing.company}.com?size=180`}/>
                                    <Heading size='lg'>{editing.title}</Heading>
                                </HStack>
                                <Text as="i" fontSize='xl'>{editing.company}</Text>
                                <FormControl mb={5} mt={5}>
                                    <FormLabel>Status</FormLabel>
                                    <Select value={editing.status} >
                                        <option value='Pending'>Pending</option>
                                        <option value='Accepted'>Accepted</option>
                                        <option value='Interview'>Interview</option>
                                        <option value='Rejected'>Rejected</option>
                                    </Select>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea value={editing.description} size='md' resize='horizontal' />
                                    <Divider m={5} borderWidth={2}/>
                                    <FormLabel>Notes</FormLabel>
                                    <Textarea size='lg' resize='horizontal' />
                                </FormControl>
                            </Stack>
                            <ButtonGroup>
                                <Button colorScheme='green' leftIcon={<FaCheck />} >Make Changes</Button>
                                <Button colorScheme='red' leftIcon={<FaBan />} onClick={() => setEditing(null)}>Cancel</Button>
                            </ButtonGroup>
                        </Box>
                    ) : 'No Item selected'}
                </Box>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <HStack>
                        <ModalHeader>Add Application</ModalHeader>
                        <ModalCloseButton />
                    </HStack>
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input type='text' placeholder='Title' />
                            <FormLabel>Company</FormLabel>
                            <Input type='text' placeholder='Company' />
                            <FormLabel>Status</FormLabel>
                            <Select>
                                <option value='Pending'>Pending</option>
                                <option value='Accepted'>Accepted</option>
                                <option value='Interview'>Interview</option>
                                <option value='Rejected'>Rejected</option>
                            </Select>
                            <FormLabel>Description</FormLabel>
                            <Input type='text' placeholder='Description' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='teal' onClick={onClose} mr={3}>Add Application</Button>
                        <Button colorScheme='red' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* TODO: Move footer to ROOT component */}
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

export default Home