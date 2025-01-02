import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { Spell } from "../../schemas/SpellSchema";

interface RowProps {
    spell: Spell;
}

export default function ItemRow({ spell }: RowProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell component="th" scope="row">
                    <Button onClick={() => setOpen(!open)}>{spell.name}</Button>
                </TableCell>
                <TableCell>{spell.id}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <p>Spell desc</p>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
