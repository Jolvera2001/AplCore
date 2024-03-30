import React, { useState, useEffect } from 'react'
import {
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
    Icon,
    Avatar,
    AvatarBadge,
    Badge,
    Center,
    Flex,
    Spacer,

} from '@chakra-ui/react'
import { FaCheck, FaBan } from "react-icons/fa6"

function Home() {
    const [data, setData] = useState([]); // empty list
    const [editing, setEditing] = useState();

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

    function editItem(index) {
        console.log('Editing item at index:', index);
        console.log(data[index]);
        setEditing(data[index]);
    }

    return (
            <Flex mt={10} mx={7} >
                <Box w="40%" overflow="auto" maxHeight="80vh">
                    <Stack spacing={2.5} >
                        {data.map((apl, index) => (
                            <Card key={index} size='sm' onClick={editItem}>
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
                        ))}
                    </Stack>
                </Box>
                <Spacer/>
                <Center>
                    <Divider orientation='vertical' color='black' />
                </Center>
                <Spacer/>
                <Box w="50%">
                    { editing ? (editing.map((apl, index) => (
                        <Heading key={index} size='md'>{apl.title}</Heading>
                    ))) : 'No Item selected'}
                </Box>
            </Flex>
    )
}

export default Home