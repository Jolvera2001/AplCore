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
    Text,
    Button,
    HStack
} from '@chakra-ui/react'

function Home() {
    const [data, setData] = useState([]); // empty list

    useEffect(() => {
        fetch('http://localhost:8080/application/6600ed08f2a198fc24d51273')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <Container>
            <Box>
                {data.map((apl, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <Heading size='md'>{apl.title}</Heading>
                            <Text>{apl.is_closed ? "Closed" : "Not Closed"}</Text>
                            <Text>{apl.company}</Text>
                        </CardHeader>
                        <CardBody>
                            <Text>{apl.description}</Text>
                            <Text>{apl.status}</Text>
                        </CardBody>
                        <CardFooter>
                            <HStack spacing={2.5}>
                                <Button>Update</Button>
                                <Button>Delete</Button>
                            </HStack>
                        </CardFooter>
                    </Card>
                ))}
            </Box>
        </Container>
    )
}

export default Home