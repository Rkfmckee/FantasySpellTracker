import { Typography } from "@mui/material";
import SortIcon from "./SortIcon";

interface SortableLabelProps {
    children: string;
    sortName: string;
    sortBy: string | undefined;
    handleSortBy: (sortByName: string) => void;
}

export default function SortableLabel({
    children,
    sortName,
    sortBy,
    handleSortBy,
}: SortableLabelProps) {
    return (
        <Typography
            onClick={() => handleSortBy(sortName)}
            variant="body1"
            component="span"
        >
            {children}
            <SortIcon sortName={sortName} sortBy={sortBy} />
        </Typography>
    );
}
