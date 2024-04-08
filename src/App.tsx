import * as React from "react"
import {
    Box,
    ChakraProvider,
    theme,
} from "@chakra-ui/react"
import {CarrierSearchWizard} from "./Containers/CarrierSerachWizard";

export const App = () => (
  <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
          <CarrierSearchWizard />
      </Box>
  </ChakraProvider>
)
