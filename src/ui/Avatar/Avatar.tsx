import { memo } from "react";
import clsx from "clsx";
import cls from "./Avatar.module.scss";
import { Avatar, AvatarProps } from "@mui/material";

interface MyAvatarProps extends AvatarProps {
    className?: string;
}

export const MyAvatar = memo((props: MyAvatarProps) => {
    const { className, ...otherProps } = props;

    return (
        <Avatar
            className={clsx(cls.avatar, className)}
            variant="square"
            {...otherProps}
        />
    );
});
