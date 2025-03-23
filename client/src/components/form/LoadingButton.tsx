import Button from "@mui/material/Button";
import { MouseEventHandler } from "react";

interface LoadingButtonProps {
    loading: boolean;
    text: string;
    loadingText: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<Element> | undefined;
}

const LoadingButton = (props: LoadingButtonProps) => {
    return (
        <Button variant="contained" disabled={props.disabled || props.loading} onClick={props.onClick}>
            {props.loading ? <span>{props.loadingText}...</span> : <span>{props.text}</span>}
        </Button>
    );
};

export default LoadingButton;
