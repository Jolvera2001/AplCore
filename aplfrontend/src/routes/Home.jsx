import React, { useState, useEffect } from 'react'
import {
    Container,
    Box,
    Card,
    CardHeader,
    CardFooter,
    CardBody
} from '@chakra-ui/react'

function Home() {
    const [data, setData] = useState([]); // empty list

    useEffect(() => {
        fetch('http://localhost:8080/application/6600ed08f2a198fc24d51273')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page</p>
        </div>
    )
}

export default Home