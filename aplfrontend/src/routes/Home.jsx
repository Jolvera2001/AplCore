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
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel

} from '@chakra-ui/react';
import { FaCheck, FaBan, FaPlus } from "react-icons/fa6"

function Home() {
    const [data, setData] = useState([]); // empty list
    const [editing, setEditing] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const addApplication = {
        user_id: "6600ed08f2a198fc24d51273",
        title: "",
        status: "",
        description: "",
        company: "",
        is_closed: false,
    }

    const handleSubmitAddApplication = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addApplication)
        };
        fetch('http://localhost:8080/application', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

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
            <Flex>
                <Box w='100vw' p={5} pl={14} pr={16}>
                    <HStack>
                        <Button onClick={onOpen} leftIcon={<FaPlus />} size='sm' >Add Aplication</Button>
                        <Spacer />
                        <Text>Views:</Text>
                        <Tabs>
                            <TabList>
                                <Tab>Default</Tab>
                                <Tab>Table</Tab>
                            </TabList>
                        </Tabs>
                    </HStack>
                </Box>
            </Flex>
            <Flex mx={8} >
                <Box w="45%" overflow="auto" maxHeight="85vh" pl={5} borderRight='2px' borderColor='grey'>
                    <Stack spacing={2.5} >
                        {data ? data.map((apl, index) => (
                            <Card key={index} size='sm' w='md' onClick={() => setEditing(apl)} >
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
                <Box w="50%" h='100vh'>
                    { editing ? (
                        <Box key={editing._id} pr={12} mr={4}>
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
                                    <Divider mt={5} mb={5} borderWidth={2}/>
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
                        <FormControl isRequired>
                            <FormLabel >Title</FormLabel>
                            <Input type='text' placeholder='Title' onChange={event => addApplication.title = event.currentTarget.value}/>
                            <FormLabel>Company</FormLabel>
                            <Input type='text' placeholder='Company' onChange={event => addApplication.company = event.currentTarget.value}/>
                            <FormLabel>Status</FormLabel>
                            <Select onChange={event => addApplication.status = event.currentTarget.value}>
                                <option value='Pending'>Pending</option>
                                <option value='Accepted'>Accepted</option>
                                <option value='Interview'>Interview</option>
                                <option value='Rejected'>Rejected</option>
                            </Select>
                            <FormLabel>Description</FormLabel>
                            <Input type='text' placeholder='Description' onChange={event => addApplication.decsription = event.currentTarget.value} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='teal' onClick={handleSubmitAddApplication} mr={3}>Add Application</Button>
                        <Button colorScheme='red' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* TODO: Move footer to ROOT component */}
            
        </>
    )
}

export default Home