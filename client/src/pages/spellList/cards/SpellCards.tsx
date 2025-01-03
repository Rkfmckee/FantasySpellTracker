import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Spell } from "../../../schemas/spell/SpellSchema";
import SpellCard from "./SpellCard";
import Masonry from "@mui/lab/Masonry";
import { IsMobile } from "../../../helpers/MuiHelpers";

interface SpellCardsProps {
    spells: Spell[] | undefined;
}

export default function SpellCards(props: SpellCardsProps) {
    function CardsLayout() {
        const isMobile = IsMobile();

        if (props.spells && props.spells.length > 0) {
            if (isMobile) {
                return props.spells.map((spell) => (
                    <div key={spell.id} className="mb-4">
                        <SpellCard spell={spell} />
                    </div>
                ));
            } else {
                return (
                    <Masonry columns={3} spacing={2}>
                        {props.spells.map((spell) => (
                            <SpellCard key={spell.id} spell={spell} />
                        ))}
                    </Masonry>
                );
            }
        } else {
            return (
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
    }

    return CardsLayout();
}
