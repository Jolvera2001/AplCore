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
    CardFooter
} from '@chakra-ui/react';

function LandingPage() {
    return(
        <>
            <VStack>
                <Box w="100%" h='1/3' py={16}>
                    <HStack>
                        <Container maxW='4xl' p={5} textAlign='left'>
                            <Heading size='xl' my={2}>Application Tracking</Heading>
                            <Heading size='lg' as='i' pl={5} my={2}>Simplified</Heading>
                            <Text fontSize='xl' mt={5} w='33%' my={5}>AplCore aims to make your application process easier and simple</Text>
                            <Button size='lg' m={2}>Register now!</Button>
                        </Container>
                    </HStack>
                </Box>
                <Box w="100%" h='1/3' py={16} px={2}>
                    <Grid>
                        <GridItem row>
                            <Card>
                                <CardHeader>
                                    <Heading size='md'>Easy to use</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text>Simple and easy to use interface! Even if you have hundreds of applications, we make it easu for you to track them</Text>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Card>
                                <CardHeader>
                                    <Heading size='md'>Simply Add</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text>Add a new application to track with a click of a button.</Text>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Card>
                                <CardHeader>
                                    <Heading size='md'>Filter easily</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text>Look through all your application through different filters or search for what you named it</Text>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </Grid>
                </Box >
            </VStack>
        </>
    )
}

export default LandingPage;