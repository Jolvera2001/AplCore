import { Outlet, Link as ReactRouterLink } from 'react-router-dom';
import theme from '../theme';
import {
    Box,
    HStack,
    Heading,
    Spacer,
    Button,
    Flex,
    Link as ChakraLink,
    ChakraProvider
} from "@chakra-ui/react";

function Landing() {
    return (
        <ChakraProvider theme={theme}>
            <Box w='100%' p={5} px={12}>
                <HStack spacing={8}>
                    <Heading size='lg'>AplCore</Heading>
                    <Spacer />
                    <ChakraLink as={ReactRouterLink}>Home</ChakraLink>
                    <ChakraLink as={ReactRouterLink}>About Us</ChakraLink>
                    <ChakraLink as={ReactRouterLink}>Contact Us</ChakraLink>
                    <ChakraLink as={ReactRouterLink} borderRadius='md' bg='teal' color='white' p={2}>Sign In</ChakraLink>
                    <ChakraLink as={ReactRouterLink} borderRadius='md' bg='tomato' color='white' p={2}>Sign Up</ChakraLink>
                </HStack>
            </Box>
            <Box>
                <Outlet />
            </Box>
            <Box>

            </Box>
        </ChakraProvider>
    );
}

export default Landing;