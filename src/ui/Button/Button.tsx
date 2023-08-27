import React, { ButtonHTMLAttributes, memo } from "react";
import cls from "./Button.module.scss";
import clsx from "clsx";
import { Button, ButtonProps, Skeleton } from "@mui/material";

export enum ThemeButton {
    CLEAR = "clear",
    BACKGROUND = "background",
}

interface ButtonPr extends ButtonProps {
    className?: string;
    theme?: ThemeButton;
    skeleton?: boolean;
}

export const MyButton = memo((props: ButtonPr) => {
    const {
        className,
        theme = ThemeButton.CLEAR,
        children,
        skeleton,
        ...otherProps
    } = props;

    if (skeleton) {
        return (
            <Skeleton
                className={clsx(
                    cls.button,
                    className,
                    cls[theme],
                    cls.skeleton
                )}
                variant="rectangular"
            />
        );
    }

    return (
        <Button
            type="button"
            className={clsx(cls.button, className, cls[theme])}
            {...otherProps}
        >
            {children}
        </Button>
    );
});
