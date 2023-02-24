import { extendTheme, useColorModeValue } from "@chakra-ui/react";
import {Button } from './button'



// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF3c00",
    },
  },
  font: {
    body: "Open Sans, sens-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: 'black',
        color: useColorModeValue('white', 'white')
      },
    }),
  },
  components: {
    Button,
  }
});
