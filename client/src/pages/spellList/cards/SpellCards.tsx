import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Spell } from "../../../schemas/spell/SpellSchema";
import SpellCard from "./SpellCard";
import Masonry from "@mui/lab/Masonry";

interface SpellCardsProps {
    spells: Spell[] | undefined;
}

export default function SpellCards(props: SpellCardsProps) {
    return props.spells && props.spells.length > 0 ? (
        <Masonry columns={3} spacing={2}>
            {props.spells.map((spell) => (
                <SpellCard spell={spell} />
            ))}
        </Masonry>
    ) : (
        <Card>
            <CardContent>
                <div className="mb-3">
                    <Typography variant="h5" component="div">
                        No spells available
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}
