import React, { useState, useEffect } from 'react'
import {
    useDisclosure,
    Container,
    Box,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Heading,
    Divider,
    Stack,
    Text,
    Button,
    HStack,
    Avatar,
    AvatarBadge,
    Badge,
    Center,
    Flex,
    Spacer,
    Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    Input,
    Select,
    FormLabel,

} from '@chakra-ui/react'
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

    function getDateTime(time) {
        return DateTime.fromISO(time).toLocaleString();
    }

    function editItem(apl) {
        console.log("editing: ", apl);
        setEditing(apl);
    }

    return (
        <>
            <Flex mt={10} mx={7} >
                <Box w="40%" overflow="auto" maxHeight="82vh">
                    <Stack spacing={2.5} >
                        <HStack>
                            <Button onClick={onOpen}>Add Aplication</Button>
                        </HStack>
                        {data ? data.map((apl, index) => (
                            <Card key={index} size='sm' onClick={editItem(apl)}>
                                <CardHeader>
                                    <HStack>
                                        <Avatar size='sm' name={apl.company}> 
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
                                    <HStack spacing={2.5}>
                                        <Button>Update</Button>
                                    </HStack>
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
                <Box w="50%">
                    { editing ? (
                        <Box key={editing._id}>
                            <Heading size='md'>{editing.title}</Heading>
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
        </>
    )
}

export default Home