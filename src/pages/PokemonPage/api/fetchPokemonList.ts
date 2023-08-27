import axios from "axios";
import { BASE_URL } from "../const/const";
import { IPokemon } from "../type/type";

interface ResponsePokemonList {
    count: number;
    next: string;
    previous: string;
    results: IPokemon[];
}
export const fetchPokemonList = async (offset?: number) => {
    try {
        const response = await axios.get<ResponsePokemonList>(
            BASE_URL + `pokemon?limit=10&offset=${offset || 0}`
        );

        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (e) {
        console.log("Error", e);
    }
};
