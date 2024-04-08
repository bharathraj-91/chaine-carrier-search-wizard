import React from "react";
import {Alert, AlertDescription, AlertIcon, AlertTitle} from "@chakra-ui/react";
import {AlertComponentType} from "../types";

const AlertComponent: React.FC<AlertComponentType> = ({type, title, description}) => {
    return (
        <Alert status={type}>
            <AlertIcon />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    )
}

export default AlertComponent;
