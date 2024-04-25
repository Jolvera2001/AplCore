import { Outlet, Link as ReactRouterLink } from 'react-router-dom';
import {
    Box,
    HStack,
    Heading,
    Spacer,
    Button,
    Flex,
    Link as ChakraLink
} from "@chakra-ui/react";

function Landing() {
    return (
        <>
            <Box w='100%' p={5} px={12}>
                <HStack>
                    <Heading size='lg'>AplCore</Heading>
                    <Spacer />
                    <ChakraLink as={ReactRouterLink}>Home</ChakraLink>
                    <ChakraLink as={ReactRouterLink}>About Us</ChakraLink>
                    <ChakraLink as={ReactRouterLink}>Contact Us</ChakraLink>
                    <ChakraLink as={ReactRouterLink}>Sign In</ChakraLink>
                    <ChakraLink as={ReactRouterLink}>Sign Up</ChakraLink>
                </HStack>
            </Box>
            <Box>
                <Outlet />
            </Box>
            <Box>

            </Box>
        </>
    );
}

export default Landing;