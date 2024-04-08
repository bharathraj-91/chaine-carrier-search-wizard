import axios, { AxiosResponse } from "axios";
import { Carrier } from "../types"

export const getCarriers = async (): Promise<Carrier[]> => {
    const response: AxiosResponse<any> = await axios.get('https://mocki.io/v1/b174654c-dc79-4ca9-9be3-976a206e145c');

    if (!response || response.status !== 200) {
        throw new Error(response.statusText);
    }

    return response.data.carriers as Carrier[];
}
