import React from "react";
import {Box, Checkbox, Flex} from "@chakra-ui/react";
import { RatingRangeProps } from "../types";

const ArrayToCheckboxes: React.FC<RatingRangeProps> = ({ratingRange, selectedRatingRange = [], onChange}) => {
    return (
        <Flex flexDirection="row">
            {ratingRange.map((range, index) => (
                <Box p={16} w={200} key={index}>
                    <Checkbox
                        isChecked={selectedRatingRange.includes(range)}
                        onChange={() => onChange(range)}
                    >
                        {range}
                    </Checkbox>
                </Box>
            ))}
        </Flex>
    );
}

export default ArrayToCheckboxes;
