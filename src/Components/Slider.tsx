import React, { useState } from "react";
import {
    Box,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from "@chakra-ui/react";
import { SliderComponentProps } from "../types";

export const SliderComponent: React.FC<SliderComponentProps> = ({
                                                                    minValue = 0,
                                                                    maxValue = 100,
                                                                    defaultValue = 30,
                                                                    value = 0,
                                                                    onChange,
                                                                }) => {
    const [sliderValue, setSliderValue] = useState(value);
    const handleOnChange = (val: number) => {
        setSliderValue(val);
        if (onChange) onChange(val);
    };
    const labelStyles = {
        mt: "2",
        ml: "-2.5",
        fontSize: "sm",
    };
    return (
        <Box p={16}>
            <Slider
                id="slider"
                aria-label="slide"
                defaultValue={defaultValue}
                min={minValue}
                max={maxValue}
                value={value || sliderValue}
                onChange={handleOnChange}
            >
                {maxValue - minValue <= 10 && maxValue - minValue > 1
                    ? Array.from({ length: maxValue - minValue + 1 }, (_, i) => (
                        <SliderMark key={i + 5} value={i} {...labelStyles}>
                            {i}
                        </SliderMark>
                    ))
                    : [
                        <SliderMark key={minValue} value={minValue} {...labelStyles}>
                            {minValue}
                        </SliderMark>,
                        <SliderMark
                            key={Math.floor((minValue + maxValue) / 2)}
                            value={Math.floor((minValue + maxValue) / 2)}
                            {...labelStyles}
                        >
                            {Math.floor((minValue + maxValue) / 2)}
                        </SliderMark>,
                        <SliderMark key={maxValue} value={maxValue} {...labelStyles}>
                            {maxValue}
                        </SliderMark>,
                    ]}
                {maxValue - minValue > 10 && (
                    <SliderMark
                        value={sliderValue}
                        textAlign="center"
                        bg="blue.500"
                        color="white"
                        mt="-10"
                        ml="-5"
                        w="12"
                    >
                        {sliderValue}
                    </SliderMark>
                )}
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
        </Box>
    );
};
