import { memo } from "react";
import cls from "./PokemonCard.module.scss";
import clsx from "clsx";
import { IPokemonDetails } from "pages/PokemonPage";
import { MyAvatar } from "ui/Avatar/Avatar";
import { Skeleton } from "@mui/material";

interface PokemonCardProps {
    className?: string;
    pokemonDetail: IPokemonDetails;
    isLoading: boolean;
}

export const PokemonCard = memo((props: PokemonCardProps) => {
    const { className = "", pokemonDetail, isLoading } = props;

    if (isLoading) {
        return (
            <div className={clsx(cls.pokemonCard, className)}>
                <Skeleton
                    className={clsx(
                        cls.pokemonName,
                        cls.nameSkeleton,
                        cls.skeletons
                    )}
                    variant="rectangular"
                />

                <Skeleton
                    className={clsx(
                        cls.pokemonAvatar,
                        cls.avatarSkeleton,
                        cls.skeletons
                    )}
                    variant="rectangular"
                />

                <ul className={cls.pokemonInfo}>
                    <li className={clsx(cls.pokemonItem, cls.itemSkeleton)}>
                        <Skeleton
                            className={clsx(cls.skeletons)}
                            variant="rectangular"
                        />
                    </li>
                    <li className={clsx(cls.pokemonItem, cls.itemSkeleton)}>
                        <Skeleton
                            className={clsx(cls.skeletons)}
                            variant="rectangular"
                        />
                    </li>
                    <li className={clsx(cls.pokemonItem, cls.itemSkeleton)}>
                        <Skeleton
                            className={clsx(cls.skeletons)}
                            variant="rectangular"
                        />
                    </li>
                    <li className={clsx(cls.pokemonItem, cls.itemSkeleton)}>
                        <Skeleton
                            className={clsx(cls.skeletons)}
                            variant="rectangular"
                        />
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <div className={clsx(cls.pokemonCard, className)}>
            <h3 className={cls.pokemonName}>{pokemonDetail.name}</h3>

            <MyAvatar
                className={cls.pokemonAvatar}
                src={pokemonDetail.avatar}
            />

            <ul className={cls.pokemonInfo}>
                <li className={clsx(cls.pokemonItem, cls.pokemonId)}>
                    {`Снялся в ${pokemonDetail.countSeries} сери${
                        pokemonDetail.countSeries % 10 === 1 ? "и" : "ях"
                    }`}
                </li>
                <li className={clsx(cls.pokemonItem, cls.pokemonId)}>
                    id: {pokemonDetail.id}
                </li>
                <li className={clsx(cls.pokemonItem, cls.pokemonHeight)}>
                    height: {pokemonDetail.height}
                </li>
                <li className={clsx(cls.pokemonItem, cls.pokemonAttack)}>
                    attack: {pokemonDetail.attack}
                </li>
            </ul>
        </div>
    );
});
