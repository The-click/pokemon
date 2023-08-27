import axios from "axios";
import { BASE_URL } from "../const/const";

export const fetchPokemonDetails = async (name: string) => {
    try {
        const response = await axios.get(BASE_URL + `pokemon/${name}`);

        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (e) {
        console.log("Error", e);
    }
};
