import React from "react";
import {Box, Button, Flex, Text} from "@chakra-ui/react";
import CarrierCard from "./CarrierCard";
import { MatchingCarrierProps } from "../types";

export const MatchingCarriers: React.FC<MatchingCarrierProps> = ({carriers, selectedCarrier, handleSelectedCarrier, moveToPreviousTab, moveToNextTab}) => {
    return (
        <Flex flexDirection="column">
            {carriers.length > 0 && <Flex flexWrap="wrap">
                {carriers.map((carrier) => (
                    <CarrierCard
                        key={carrier.id}
                        carrier={carrier}
                        selected={selectedCarrier?.id === carrier.id}
                        selectable={true}
                        handleSelectedCarrier={handleSelectedCarrier}
                    />
                ))}
            </Flex>}
            <Flex justifyContent="center">
                {carriers.length === 0 && <Box mt={18}>
                    <Text fontSize='3xl'>No carriers match your preferences. Try changing your preferences</Text>
                </Box>}
                </Flex>
            <Flex justifyContent="flex-end">
                <Box mt={18} mr={16}>
                    <Button colorScheme="blue" onClick={moveToPreviousTab}>
                        Change Preferences
                    </Button>
                </Box>
                {carriers.length > 0 && selectedCarrier && <Box mt={18}>
                    <Button colorScheme="blue" onClick={moveToNextTab}>
                        Next
                    </Button>
                </Box>}
            </Flex>
        </Flex>
    );
};
