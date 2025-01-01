import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

interface NavlinkProps {
    to: string;
    label?: string;
}

export default function Navlink({ to, label }: NavlinkProps) {
    function getLabel() {
        if (label) return label;
        return to.charAt(0).toUpperCase() + to.slice(1);
    }

    return (
        <Button component={Link} to={to} color="white">
            {getLabel()}
        </Button>
    );
}
