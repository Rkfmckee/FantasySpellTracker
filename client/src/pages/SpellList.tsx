import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { SpellsSchema } from "../helpers/Schemas";
import SpellCard from "../components/SpellCard";

export default function SpellList() {
    const spellsJson = [
        {
            name: "spell 1",
        },
    ];

    const spells = SpellsSchema.parse(spellsJson);

    return (
        <>
            <Typography gutterBottom variant="h1" component="div">
                Spells
            </Typography>

            <Grid container spacing={2}>
                {spells.map((spell) => (
                    <Grid key={`spell-${spell.name}`} size={4}>
                        <SpellCard spell={spell} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
