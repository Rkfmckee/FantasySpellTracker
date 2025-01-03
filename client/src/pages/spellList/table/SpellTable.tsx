import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePaginationFooter from "../../../components/table/TablePaginationFooter";
import { Spell } from "../../../schemas/spell/SpellSchema";
import Paper from "@mui/material/Paper";
import SpellRow from "./SpellRow";

interface SpellTableProps {
    spells: Spell[] | undefined;
    totalRecords: number;
    page: number;
    setPage: (pageNum: number) => void;
    rowsPerPage: number;
    setRowsPerPage: (rowsPerPageNum: number) => void;
}

export default function SpellTable(props: SpellTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width="12%">School/Level</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell width="10%">Casting time</TableCell>
                        <TableCell width="10%">Duration</TableCell>
                        <TableCell width="10%">Range</TableCell>
                        <TableCell width="10%">Components</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.spells && props.spells.length > 0 ? (
                        props.spells.map((spell) => (
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
                <TablePaginationFooter
                    totalCount={props.totalRecords}
                    currentPage={props.page}
                    onPageChange={(pageNum) => props.setPage(pageNum)}
                    rowsPerPage={props.rowsPerPage}
                    onRowsPerPageChange={(rowsPerPageNum) =>
                        props.setRowsPerPage(rowsPerPageNum)
                    }
                />
            </Table>
        </TableContainer>
    );
}
