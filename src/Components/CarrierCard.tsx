import React from "react";
import {Flex, Card, CardHeader, CardBody, Box, Text, CardFooter, Checkbox} from "@chakra-ui/react";
import { CarrierCardProps } from "../types";

const CarrierCard:React.FC<CarrierCardProps> = ({carrier, selected, selectable, handleSelectedCarrier}) => {
    return (
        <Flex mr={8} mb={8}>
        <Card w={400}>
            <CardHeader>{carrier.name}</CardHeader>
            <CardBody>
                <Flex flexDirection="column" alignItems="flex-start">
                    <Box>
                        <Flex alignItems="center">
                        <Text fontSize='sm' as="b">Status: </Text>
                        <Text fontSize='xs' ml={2}>{carrier.availability ? 'Available': 'UnAvailable'}</Text>
                        </Flex>
                    </Box>
                    <Box flexDirection="column">
                        <Flex alignItems="center">
                        <Text fontSize='sm' as="b">Price: </Text>
                        <Text fontSize='xs'>{carrier.cost}</Text>
                        </Flex>
                    </Box>
                    <Box flexDirection="column">
                        <Flex alignItems="center">
                        <Text fontSize='sm' as="b">Rating: </Text>
                        <Text fontSize='xs'>{carrier.rating}</Text>
                        </Flex>
                    </Box>
                    <Box flexDirection="column">
                        <Flex alignItems="center">
                        <Text fontSize='sm' as="b">On Time Delivery Rating: </Text>
                        <Text fontSize='xs'>{carrier.onTimeDeliveryPercentage}</Text>
                        </Flex>
                    </Box>
                    <Box flexDirection="column">
                        <Flex alignItems="center">
                        <Text fontSize='sm' as="b">Special Requirements: </Text>
                        <Text fontSize='xs'>{carrier.specialRequirements.join(", ")}</Text>
                        </Flex>
                    </Box>
                </Flex>
            </CardBody>
            <CardFooter w={400}>
                {selectable && handleSelectedCarrier && <Box>
                    <Checkbox colorScheme="blue" isChecked={selected} onChange={() => handleSelectedCarrier(carrier)}>Select Carrier</Checkbox>
                </Box>}
            </CardFooter>
        </Card>
        </Flex>
    );
}

export default CarrierCard;
