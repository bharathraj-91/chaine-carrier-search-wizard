import React, { useEffect, useState } from "react";
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from "@chakra-ui/react";
import { getCarriers } from "../api's";
import { Carrier } from "../types";
import { PreferencesTab } from "../Components/PreferencesTab";
import { MatchingCarriers } from "../Components/MatchingCarriers";
import AlertComponent from "../Components/Alert";
import BookCarrier from "../Components/BookCarrier";

export const CarrierSearchWizard: React.FC = () => {
    const [carriers, setCarriers] = useState<Carrier[]>([]);
    const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
    const [minimumCarrierPrice, setMinimumCarrierPrice] = useState<number>(0);
    const [maximumCarrierPrice, setMaximumCarrierPrice] = useState<number>(0);
    const [availableSpecialRequirements, setAvailableSpecialRequirements] = useState<string[]>([]);
    const [pricePreference, setPricePreference] = useState<number>(0);
    const [carrierRatingRange, setCarrierRatingRange] = React.useState<string[]>([]);
    const [onTimeDeliveryRatingRange, setOnTimeDeliveryRatingRange] = React.useState<string[]>([]);
    const [specialRequirements, setSpecialRequirements] = React.useState<string[]>([]);
    const [carriersMatchingPreferences, setCarriersMatchingPreferences] = React.useState<Carrier[]>([]);
    const [selectedCarrier, setSelectedCarrier] = React.useState<Carrier | null>(null);
    const [showAlert, setShowAlert] = React.useState<boolean>(false);
    const [alert, setAlert] = React.useState<{ type: "success" | "error" | "warning" | "info", title: string, description: string }>({
        type: "success",
        title: "",
        description: ""
    });

    const defaultValue = minimumCarrierPrice && maximumCarrierPrice ? (minimumCarrierPrice + maximumCarrierPrice) / 2 : 1200;
    const ratingRanges = ["1-2", "2-3", "3-4", "4-5"];

    useEffect(() => {
        getCarriers()
            .then((data: Carrier[]) => {
                setCarriers(data);
                setMaximumAndMinimumPrice(data);
                getAvailableSpecialRequirements(data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, []);

    const setMaximumAndMinimumPrice = (data: Carrier[]) => {
        const prices = data.map((carrier: Carrier) => carrier.cost);
        setMinimumCarrierPrice(Math.min(...prices));
        setMaximumCarrierPrice(Math.max(...prices));
    };

    const getAvailableSpecialRequirements = (data: Carrier[]) => {
        const requirements: Set<string> = new Set();

        data.forEach((carrier: Carrier) => {
            carrier.specialRequirements.forEach((requirement: string) => {
                if (!availableSpecialRequirements.includes(requirement)) {
                    requirements.add(requirement);
                }
            });
        });

        setAvailableSpecialRequirements([...availableSpecialRequirements, ...Array.from(requirements)]);
    };

    const handlePricePreferenceChange = (val: number) => {
        setPricePreference(val);
    };

    const toggleState = (
        state: string[],
        setStateSetter: React.Dispatch<React.SetStateAction<string[]>>,
        range: string
    ) => {
        if (state.includes(range)) {
            setStateSetter(state.filter((rating) => rating !== range));
        } else {
            setStateSetter([...state, range]);
        }
    };

    const getOnTimeDeliveryRatings = (deliveryValue: number) => {
        if (deliveryValue < 0 || deliveryValue > 1) {
            throw new Error("Delivery value must be between 0 and 1");
        }

        const index = Math.min(Math.floor(deliveryValue * ratingRanges.length), ratingRanges.length - 1);

        return ratingRanges[index];
    }

    const getCarriesMatchingPreferences = () => {
        if(!pricePreference && !carrierRatingRange.length && !onTimeDeliveryRatingRange.length && !specialRequirements.length) {
            setCarriersMatchingPreferences(carriers);
        } else {
            const matchingCarriers = carriers.filter((carrier) => {
                const {cost, rating, onTimeDeliveryPercentage, specialRequirements: carrierSpecialRequirements} = carrier;
                let isMatching = false;
                if (pricePreference && cost <= pricePreference) {
                    isMatching = true;
                }

                if (carrierRatingRange.length) {
                    isMatching = carrierRatingRange.some((range) => {
                        const [min, max] = range.split("-").map(Number);
                        return rating >= min && rating <= max;
                    });
                }

                if (onTimeDeliveryRatingRange.length) {
                    const carrierOnTimeDeliverRating = getOnTimeDeliveryRatings(onTimeDeliveryPercentage);
                    isMatching = onTimeDeliveryRatingRange.includes(carrierOnTimeDeliverRating);
                }

                if (specialRequirements.length && carrierSpecialRequirements.some((requirement) => specialRequirements.includes(requirement))){
                    isMatching = true;
                }

                return isMatching;
            });

            setCarriersMatchingPreferences(matchingCarriers);
        }
        setCurrentTabIndex(currentTabIndex + 1)
    }

    const handleSelectedCarrier = (carrier: Carrier) => {
        if(selectedCarrier && selectedCarrier.id === carrier.id) {
            setSelectedCarrier(null);
        } else {
            setSelectedCarrier(carrier);
        }
    }

    const finaliseBookingForCarrier = () => {
        resetUserPreferences();
        setCurrentTabIndex(0);
        setAlert({
            type: "success",
            title: "Carrier Booked",
            description: `Carrier ${selectedCarrier?.name} has been booked successfully`
        });
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    }

    const resetUserPreferences = () => {
        setPricePreference(0);
        setCarrierRatingRange([]);
        setOnTimeDeliveryRatingRange([]);
        setSpecialRequirements([]);
        setCurrentTabIndex(0);
        setSelectedCarrier(null);
    }

    return (
        <Tabs isLazy index={currentTabIndex}>
            <TabList>
                <Tab isDisabled={currentTabIndex !== 0}>Preferences</Tab>
                <Tab isDisabled={currentTabIndex !== 1}>Matching Carriers</Tab>
                <Tab isDisabled={currentTabIndex !== 2}>Book Carrier</Tab>
            </TabList>
            <TabPanels>
                {showAlert && <AlertComponent type={alert.type} title={alert.title} description={alert.description}/>}
                <TabPanel>
                    <PreferencesTab
                        minimumPrice={minimumCarrierPrice}
                        maximumPrice={maximumCarrierPrice}
                        defaultPrice={defaultValue}
                        selectedPrice={pricePreference}
                        handlePricePreferenceChange={handlePricePreferenceChange}
                        ratingRange={ratingRanges}
                        selectedCarrierRatings={carrierRatingRange}
                        handleCarrierRatingRangeChange={(range) => toggleState(carrierRatingRange, setCarrierRatingRange, range)}
                        selectedDeliveryRatings={onTimeDeliveryRatingRange}
                        handleDeliveryRatingRangeChange={(range) => toggleState(onTimeDeliveryRatingRange, setOnTimeDeliveryRatingRange, range)}
                        availableSpecialRequirements={availableSpecialRequirements}
                        selectedSpecialRequirements={specialRequirements}
                        handleSpecialRequirementsChange={(requirement) => toggleState(specialRequirements, setSpecialRequirements, requirement)}
                        moveToNextTab={() => getCarriesMatchingPreferences()}
                    />
                </TabPanel>
                <TabPanel>
                    <MatchingCarriers
                        carriers={carriersMatchingPreferences}
                        selectedCarrier={selectedCarrier}
                        handleSelectedCarrier={handleSelectedCarrier}
                        moveToPreviousTab={() => {
                            setSelectedCarrier(null)
                            setCurrentTabIndex(currentTabIndex - 1)
                        }}
                        moveToNextTab={() => setCurrentTabIndex(currentTabIndex + 1)} />
                </TabPanel>
                <TabPanel>
                    <BookCarrier
                        selectedCarrier={selectedCarrier} moveToPreviousTab={() => {
                        setCurrentTabIndex(currentTabIndex - 1)
                        }}
                        finaliseBooking={finaliseBookingForCarrier}
                        />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
