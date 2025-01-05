import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SortableTableCell from "../../../components/filter/SortableTableCell";
import { Spell } from "../../../schemas/spell/SpellSchema";
import SpellRow from "./SpellRow";

interface SpellTableProps {
    spells: Spell[] | undefined;
    sortBy: string | undefined;
    handleSortBy: (sortByName: string) => void;
}

export default function SpellTable({
    spells,
    sortBy,
    handleSortBy,
}: SpellTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <SortableTableCell
                            width="12%"
                            sortName="level"
                            sortBy={sortBy}
                            handleSortBy={handleSortBy}
                        >
                            School/Level
                        </SortableTableCell>
                        <SortableTableCell
                            sortName="name"
                            sortBy={sortBy}
                            handleSortBy={handleSortBy}
                        >
                            Name
                        </SortableTableCell>
                        <SortableTableCell
                            width="10%"
                            sortName="castingTime"
                            sortBy={sortBy}
                            handleSortBy={handleSortBy}
                        >
                            Casting time
                        </SortableTableCell>
                        <SortableTableCell
                            width="10%"
                            sortName="duration"
                            sortBy={sortBy}
                            handleSortBy={handleSortBy}
                        >
                            Duration
                        </SortableTableCell>
                        <SortableTableCell
                            width="10%"
                            sortName="rangeType,rangeValue"
                            sortBy={sortBy}
                            handleSortBy={handleSortBy}
                        >
                            Range
                        </SortableTableCell>
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
