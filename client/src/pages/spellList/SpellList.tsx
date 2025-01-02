import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import TablePaginationFooter from "../../components/table/TablePaginationFooter";
import { ReadResponse } from "../../schemas/ReadResponseSchema";
import { Spell } from "../../schemas/spell/SpellSchema";
import SpellRow from "./SpellRow";

export default function SpellList() {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [spells, setSpells] = useState<Spell[]>();

    useEffect(() => {
        axios
            .post<ReadResponse<Spell>>("Spell/Read", {
                // TS uses 0 for first page, backend uses 1
                // So increment to match the backend before posting
                pageNumber: page + 1,
                pageSize: rowsPerPage,
            })
            .then((response) => {
                setSpells(response.data.currentPageData);
                setTotalRecords(response.data.totalRecords);
            });
    }, [page, rowsPerPage]);

    return (
        <>
            <Typography variant="h1" gutterBottom>
                Spells
            </Typography>
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
                        {spells && spells.length > 0 ? (
                            spells.map((spell) => (
                                <SpellRow
                                    key={`item-${spell.id}`}
                                    spell={spell}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    No spells available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TablePaginationFooter
                        totalCount={totalRecords}
                        currentPage={page}
                        onPageChange={(pageNum) => setPage(pageNum)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(rowsPerPageNum) =>
                            setRowsPerPage(rowsPerPageNum)
                        }
                    />
                </Table>
            </TableContainer>
        </>
    );
}
