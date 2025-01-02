import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import SpellCard from "../components/SpellCard";
import { ReadResponseSchema, Spell } from "../helpers/Schemas";

export default function SpellList() {
    const [spells, setSpells] = useState<Spell[]>();

    useEffect(() => {
        const url = "http://localhost:5160/api/Spell/Read";

        axios
            .post(url, {
                pageNumber: 1,
                pageSize: 20,
            })
            .then((response) => {
                const readResponse = ReadResponseSchema.parse(response.data);
                setSpells(readResponse.currentPageData);
                console.log(response.data);
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
