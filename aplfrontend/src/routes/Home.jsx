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

} from '@chakra-ui/react'
import { FaCheck, FaBan } from "react-icons/fa6"

function Home() {
    const [data, setData] = useState([]); // empty list

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
        <Container>
            <Box>
                <Stack spacing={2.5}>
                    {data.map((apl, index) => (
                        <Card key={index}>
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
                                <Text>{apl.status}</Text>
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
        </Container>
    )
}

export default Home