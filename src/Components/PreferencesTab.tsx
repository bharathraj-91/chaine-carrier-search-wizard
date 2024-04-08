import React from "react";
import { Box, Card, CardBody, Flex, Text, Button } from "@chakra-ui/react";
import { SliderComponent } from "../Components/Slider";
import ArrayToCheckboxes from "../Components/ArrayToCheckboxes";
import { PreferencesTabProps } from "../types";

export const PreferencesTab: React.FC<PreferencesTabProps> = ({
                                                                  minimumPrice,
                                                                  maximumPrice,
                                                                  defaultPrice,
                                                                  selectedPrice,
                                                                  handlePricePreferenceChange,
                                                                  ratingRange,
                                                                  selectedCarrierRatings,
                                                                  handleCarrierRatingRangeChange,
                                                                  selectedDeliveryRatings,
                                                                  handleDeliveryRatingRangeChange,
                                                                  availableSpecialRequirements,
                                                                  selectedSpecialRequirements,
                                                                  handleSpecialRequirementsChange,
                                                                  moveToNextTab,
                                                              }) => {
    return (
        <Box p={16}>
            <Card m={8}>
                <CardBody>
                    <Text fontSize="3xl">Budget</Text>
                    <Text fontSize="xs">
                        Choose a price range that falls under your budget
                    </Text>
                    <SliderComponent
                        minValue={minimumPrice}
                        maxValue={maximumPrice}
                        defaultValue={defaultPrice}
                        value={selectedPrice}
                        onChange={handlePricePreferenceChange}
                    />
                </CardBody>
            </Card>
            <Card m={8}>
                <CardBody>
                    <Text fontSize="3xl">Carrier Rating</Text>
                    <Text fontSize="xs">Select carrier ratings</Text>
                    <ArrayToCheckboxes
                        ratingRange={ratingRange}
                        selectedRatingRange={selectedCarrierRatings}
                        onChange={(range) => handleCarrierRatingRangeChange(range)}
                    />
                </CardBody>
            </Card>
            <Card m={8}>
                <CardBody>
                    <Text fontSize="3xl">On Time Delivery Rating</Text>
                    <Text fontSize="xs">
                        Select ratings given to a carrier based on their timely deliveries
                    </Text>
                    <Flex flexDirection="row">
                        <ArrayToCheckboxes
                            ratingRange={ratingRange}
                            selectedRatingRange={selectedDeliveryRatings}
                            onChange={(range) => handleDeliveryRatingRangeChange(range)}
                        />
                    </Flex>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Text fontSize="3xl">Special Requirements</Text>
                    <Text fontSize="xs">
                        Please choose a special requirement if you have any
                    </Text>
                    <Flex flexDirection="row" alignItems="center">
                        <ArrayToCheckboxes
                            ratingRange={availableSpecialRequirements}
                            selectedRatingRange={selectedSpecialRequirements}
                            onChange={(range) => handleSpecialRequirementsChange(range)}
                        />
                    </Flex>
                </CardBody>
            </Card>
            <Flex justifyContent="flex-end">
                <Box mt={18}>
                    <Button colorScheme="blue" onClick={moveToNextTab}>
                        Next
                    </Button>
                </Box>
            </Flex>
        </Box>
    );
};
