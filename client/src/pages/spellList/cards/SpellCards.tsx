import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Spell } from "../../../schemas/spell/SpellSchema";
import SpellCard from "./SpellCard";

interface SpellCardsProps {
    spells: Spell[] | undefined;
}

export default function SpellCards(props: SpellCardsProps) {
    return props.spells && props.spells.length > 0 ? (
        <div className="row">
            {props.spells.map((spell) => (
                <div className="col-md-4 mb-4">
                    <SpellCard spell={spell} />
                </div>
            ))}
        </div>
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
