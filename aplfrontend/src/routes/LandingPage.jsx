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
                <Box w="100%" h='80vh' py={32} bgGradient='linear(to-r, red.500, red.400)'>
                    <HStack mt={8}>
                        <Container maxW='4xl' p={5} textAlign='left'>
                            <Heading size='xl' my={2}>Application Tracking</Heading>
                            <Heading size='lg' as='i' as='u' pl={5} my={2}>Simplified</Heading>
                            <Text fontSize='xl' mt={5} w='45%' my={5} pl={2}>AplCore aims to make your application process easier and simple. Whether you're searching for you next job or browsing, we aim to make it a smooth process.</Text>
                            <Button size='lg'>Register now!</Button>
                        </Container>
                        
                    </HStack>
                </Box>
                <Box w="100%" py={16} px={2} my={8}>
                    <Center>
                        <Grid templateRows='repeat(1, 1fr)' templateColumns='repeat(3, 1fr)' gap={4}>
                            <GridItem rowSpan={1} colSpan={1}>
                                <Card maxW='25vw' h='25vh'>
                                    <CardHeader>
                                        <Heading size='md'>Easy to use</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>Simple and easy to use interface! Even if you have hundreds of applications, we make it easu for you to track them</Text>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem rowSpan={1} colSpan={1}>
                                <Card maxW='25vw' h='25vh'>
                                    <CardHeader>
                                        <Heading size='md'>Simply Add</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>Add a new application to track with a click of a button! Edit mistakes or add new information with another button!</Text>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem rowSpan={1} colSpan={1}>
                                <Card maxW='25vw' h='25vh'>
                                    <CardHeader>
                                        <Heading size='md'>Filter easily</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>Look through all your application through different filters or search for what you named it</Text>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </Grid>
                    </Center>
                </Box >
            </VStack>
        </>
    )
}

export default LandingPage;