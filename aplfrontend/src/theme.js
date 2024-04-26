import { extendTheme } from "@chakra-ui/react";
import '@fontsource/open-sans'
import '@fontsource/raleway'

const theme = extendTheme({
    fonts: {
        heading: `'Raleway', sans-serif`,
        body: `'Open Sans', sans-serif`,
    },
})

export default theme;