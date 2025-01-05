import TableCell from "@mui/material/TableCell";
import SortIcon from "./SortIcon";

interface SortableTableCellProps {
    children: string;
    width?: string | number | undefined;
    sortName: string;
    sortBy: string | undefined;
    handleSortBy: (sortByName: string) => void;
}

export default function SortableTableCell({
    children,
    width,
    sortName,
    sortBy,
    handleSortBy,
}: SortableTableCellProps) {
    return (
        <TableCell width={width} onClick={() => handleSortBy(sortName)}>
            {children}
            <SortIcon sortName={sortName} sortBy={sortBy} />
        </TableCell>
    );
}
