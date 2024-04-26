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
            </VStack>
        </>
    )
}

export default LandingPage;