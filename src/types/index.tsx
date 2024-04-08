export interface Carrier {
    id: number;
    name: string;
    rating: number;
    onTimeDeliveryPercentage: number;
    cost: number;
    specialRequirements: string[];
    availability: boolean;
}

export type SliderComponentProps = {
    defaultValue?: number,
    minValue?: number,
    maxValue?: number,
    value?: number,
    onChange?: (value: number) => void,
};

export type PreferencesTabProps = {
    minimumPrice: number,
    maximumPrice: number,
    defaultPrice: number,
    selectedPrice: number,
    handlePricePreferenceChange: (val: number) => void,
    ratingRange: string[],
    selectedCarrierRatings: string[],
    handleCarrierRatingRangeChange: (range: string) => void,
    selectedDeliveryRatings: string[],
    handleDeliveryRatingRangeChange: (range: string) => void,
    availableSpecialRequirements: string[],
    selectedSpecialRequirements: string[],
    handleSpecialRequirementsChange: (requirement: string) => void,
    moveToNextTab: () => void
};

export type RatingRangeProps = {
    ratingRange: string[]
    onChange: (value: string) => void
    selectedRatingRange?: string[]
};

export type MatchingCarrierProps = {
    carriers: Carrier[],
    selectedCarrier: Carrier | null,
    handleSelectedCarrier: (carrier: Carrier) => void,
    moveToPreviousTab: () => void
    moveToNextTab: () => void
};

export type CarrierCardProps = {
    carrier: Carrier,
    selected?: boolean,
    selectable?: boolean,
    handleSelectedCarrier?: (carrier: Carrier) => void
};

export type AlertComponentType = {
    type: "success" | "error" | "warning" | "info",
    title: string,
    description: string
};

export type BookCarrierProps = {
    selectedCarrier: Carrier | null,
    moveToPreviousTab: () => void,
    finaliseBooking: () => void
};
