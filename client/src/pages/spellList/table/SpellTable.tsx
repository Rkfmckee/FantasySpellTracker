import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Spell } from "../../../schemas/spell/SpellSchema";
import SpellRow from "./SpellRow";
import { SortNameDescending } from "../../../helpers/FilterHelpers";

interface SpellTableProps {
    spells: Spell[] | undefined;
    sortBy: string | undefined;
    setSortBy: (sortByName: string | undefined) => void;
}

export default function SpellTable({
    spells,
    sortBy,
    setSortBy,
}: SpellTableProps) {
    function handleColumnClick(sortName: string) {
        const sortNameDesc = SortNameDescending(sortName);

        if (sortBy == sortName) setSortBy(sortNameDesc);
        else if (sortBy == sortNameDesc) setSortBy(undefined);
        else setSortBy(sortName);
    }

    function sortIcon(sortName: string) {
        const sortNameDesc = SortNameDescending(sortName);

        if (sortBy == sortName) return <i className="fa-solid fa-sort-up" />;

        if (sortBy == sortNameDesc)
            return <i className="fa-solid fa-sort-down" />;

        return <i className="fa-solid fa-sort" />;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell
                            width="12%"
                            onClick={() => handleColumnClick("level")}
                        >
                            School/Level
                            {sortIcon("level")}
                        </TableCell>
                        <TableCell onClick={() => handleColumnClick("name")}>
                            Name
                            {sortIcon("name")}
                        </TableCell>
                        <TableCell
                            width="10%"
                            onClick={() => handleColumnClick("castingTime")}
                        >
                            Casting time
                            {sortIcon("castingTime")}
                        </TableCell>
                        <TableCell
                            width="10%"
                            onClick={() => handleColumnClick("duration")}
                        >
                            Duration
                            {sortIcon("duration")}
                        </TableCell>
                        <TableCell
                            width="10%"
                            onClick={() =>
                                handleColumnClick("rangeType,rangeValue")
                            }
                        >
                            Range
                            {sortIcon("rangeType,rangeValue")}
                        </TableCell>
                        <TableCell width="10%">Components</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {spells && spells.length > 0 ? (
                        spells.map((spell) => (
                            <SpellRow key={`item-${spell.id}`} spell={spell} />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No spells available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
