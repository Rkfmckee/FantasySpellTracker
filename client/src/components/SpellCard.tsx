import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Spell } from "../helpers/Schemas";

interface SpellCardProps {
    spell: Spell;
}

export default function SpellCard({ spell }: SpellCardProps) {
    return (
        <Card>
            <CardContent>
                <div className="mb-3">
                    <Typography variant="h5" component="div">
                        {spell.name}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}
