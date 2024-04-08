import React from "react";
import {BookCarrierProps} from "../types";
import {Box, Button, Card, CardBody, CardFooter, Flex, Text} from "@chakra-ui/react";

const BookCarrier: React.FC<BookCarrierProps> = ({selectedCarrier, moveToPreviousTab, finaliseBooking}) => {
    return (
        <Box>
            <Flex>
                <Text fontSize="3xl">Final Confirmation For Booking Carrier:</Text>
            </Flex>
            <Card>
                <CardBody>
                    <Flex flexDirection="column" alignItems="flex-start">
                    <Text fontSize="xl">Carrier Name: {selectedCarrier?.name}</Text>
                    <Text fontSize="xl">Cost: {selectedCarrier?.cost}</Text>
                    <Text fontSize="xl">Rating: {selectedCarrier?.rating}</Text>
                    <Text fontSize="xl">Special Requirements: {selectedCarrier?.specialRequirements.join(", ")}</Text>
                    </Flex>
                </CardBody>
                <CardFooter>
                    <Box mt={18} mr={16}>
                        <Button colorScheme="blue" onClick={moveToPreviousTab}>
                            Change Carrier
                        </Button>
                    </Box>
                    <Box mt={18}>
                        <Button colorScheme="blue" onClick={finaliseBooking}>
                            Book Carrier
                        </Button>
                    </Box>
                </CardFooter>
            </Card>
        </Box>
    );
}

export default BookCarrier;
