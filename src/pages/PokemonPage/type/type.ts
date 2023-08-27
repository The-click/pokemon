export interface IPokemon {
    name: string;
    url: string;
}

export interface IPokemonDetails extends IPokemon {
    id: number;
    height: number;
    attack: number;
    countSeries: number;
    avatar: string;
}
