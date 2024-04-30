import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    Spacer,
    Flex,
    Grid,
    GridItem,
    Image,
    Link,
    Center,
    Divider,
    Stack,
    HStack,
    VStack,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from '@chakra-ui/react';

function LandingPage() {
    return(
        <>
            <VStack>
                <Box w="100%" h='87vh' py={10} bgGradient='linear(to-r, red.500, red.400)'>
                    <HStack mt={8}>
                        <Container maxW='4xl' p={5} textAlign='left'>
                            <Heading size='xl' my={2}>Application Tracking</Heading>
                            <Heading size='lg' as='i' pl={5} my={2}>Simplified</Heading>
                            <Text fontSize='2xl' mt={5} w='45%' my={3} pl={1}>AplCore aims to make your application process easier and simple. Whether you're searching for you next job or browsing, we aim to make it a smooth process.</Text>
                            <Button size='lg' ml={2} mt={1} >Register now!</Button>
                        </Container>
                        
                    </HStack>
                </Box>
                <Box w="100%" py={16} px={2} my={6}>
                    <Center>
                        <Grid templateRows='repeat(1, 1fr)' templateColumns='repeat(3, 1fr)' gap={4}>
                            <GridItem rowSpan={1} colSpan={1}>
                                <Card maxW='25vw' h='25vh' boxShadow={0}>
                                    <CardHeader>
                                        <Heading size='lg'>Easy to use</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text fontSize='lg'>Simple and easy to use interface! Even if you have hundreds of applications, we make it easy for you to track them</Text>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem rowSpan={1} colSpan={1}>
                                <Card maxW='25vw' h='25vh' boxShadow={0}>
                                    <CardHeader>
                                        <Heading size='lg'>Simply Add</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text fontSize='lg'>Add a new application to track with a click of a button! Edit and delete existing ones just as easily</Text>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem rowSpan={1} colSpan={1}>
                                <Card maxW='25vw' h='25vh' boxShadow={0}>
                                    <CardHeader>
                                        <Heading size='lg'>Filter easily</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text fontSize='lg'>Look through all your application through different filters or search for what a specific one</Text>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </Grid>
                    </Center>
                </Box >
                <Box>

                </Box>
            </VStack>
        </>
    )
}

export default LandingPage;