import React, { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import cls from "./PokemonPage.module.scss";
import { fetchPokemonList } from "../api/fetchPokemonList";
import { IPokemon, IPokemonDetails } from "../type/type";
import { fetchPokemonDetails } from "../api/fetchPokemonDetails";
import ClickImg from "assets/img/click.png";
import { MyButton, ThemeButton } from "ui/Button/Button";
import { PokemonCard } from "component/PokemonCard";

interface PokemonPageProps {
    className?: string;
}

export const PokemonPage: React.FC<PokemonPageProps> = (props) => {
    const { className = "" } = props;
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [isLoadingPokemon, setIsLoadingPokemon] = useState(false);

    const [pokemonDetail, setPokemonDetail] = useState<IPokemonDetails>();

    const getPokemonList = useCallback(async () => {
        const offset = Math.round(Math.random() * 1271);
        const response = await fetchPokemonList(offset);
        if (response) {
            setPokemons(response.results);
            onClickPokemon(response.results[0]);
        }
        setIsLoadingList(false);
    }, []);

    useEffect(() => {
        setIsLoadingPokemon(true);
        setIsLoadingList(true);
        getPokemonList();
    }, []);

    const onClickPokemon = useCallback(
        async (pokemon: IPokemon) => {
            if (pokemon.name === pokemonDetail?.name) return;
            setIsLoadingPokemon(true);
            const respone = await fetchPokemonDetails(pokemon.name);
            if (respone) {
                let avatar = respone.sprites.front_default;
                if (!avatar) {
                    avatar = Object.values<{ [key: string]: string }>(
                        respone.sprites.other
                    ).find((sprite) => sprite.front_default)?.front_default;
                }
                setPokemonDetail({
                    ...pokemon,
                    id: respone.id,
                    height: respone.height,
                    attack: respone.stats[1].base_stat,
                    avatar,
                    countSeries: respone.moves.length,
                });
            }
            setIsLoadingPokemon(false);
        },
        [pokemonDetail]
    );

    const pokemonsList = useMemo(() => {
        if (isLoadingList) {
            return Array(10)
                .fill(0)
                .map((_, i) => (
                    <MyButton
                        key={i}
                        variant="contained"
                        theme={ThemeButton.BACKGROUND}
                        className={cls.btn}
                        skeleton={true}
                    />
                ));
        }
        return pokemons.map((pokemon) => (
            <MyButton
                key={pokemon.name}
                variant="contained"
                onClick={() => onClickPokemon(pokemon)}
                theme={ThemeButton.BACKGROUND}
                className={cls.btn}
            >
                {pokemon.name}
            </MyButton>
        ));
    }, [pokemons, isLoadingList, pokemonDetail]);

    return (
        <section className={clsx(cls.pokemonPage, {}, [className])}>
            <div className={cls.wrapper}>
                <div className={cls.pokemonHeader}>
                    <a href="https://pokeapi.co/" className={cls.pokemonApi}>
                        Покемоны API
                    </a>
                    <div className={cls.pokemonToolip}>
                        <img
                            className={cls.tooltipImg}
                            src={ClickImg}
                            alt="hand click"
                        />
                        <p className={cls.tooltipText}>
                            Нажмите на нужного Покемона
                        </p>
                    </div>
                </div>
                <div className={cls.pokemonMain}>
                    <section className={cls.pokemonsBtn}>
                        {pokemonsList}
                    </section>
                    <section className={cls.pokemonShow}>
                        {pokemonDetail && (
                            <PokemonCard
                                pokemonDetail={pokemonDetail}
                                isLoading={isLoadingPokemon}
                            />
                        )}
                    </section>
                </div>
            </div>
        </section>
    );
};
