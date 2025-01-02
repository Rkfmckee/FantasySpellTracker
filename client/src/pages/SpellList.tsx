import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import SpellCard from "../components/SpellCard";
import { Spell } from "../schemas/SpellSchema";
import { ReadResponseSchema } from "../schemas/ReadResponseSchema";

export default function SpellList() {
    const [spells, setSpells] = useState<Spell[]>();

    useEffect(() => {
        const url = "Spell/Read";

        axios
            .post(url, {
                pageNumber: 1,
                pageSize: 20,
            })
            .then((response) => {
                const readResponse = ReadResponseSchema.parse(response.data);
                setSpells(readResponse.currentPageData);
            });
    }, []);

    return (
        <>
            <Typography gutterBottom variant="h1" component="div">
                Spells
            </Typography>

            <Grid container spacing={2}>
                {spells &&
                    spells.map((spell) => (
                        <Grid key={`spell-${spell.id}`} size={4}>
                            <SpellCard spell={spell} />
                        </Grid>
                    ))}
            </Grid>
        </>
    );
}
