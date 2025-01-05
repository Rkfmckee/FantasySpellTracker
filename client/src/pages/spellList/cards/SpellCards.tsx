import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Spell } from "../../../schemas/spell/SpellSchema";
import SpellCard from "./SpellCard";
import Masonry from "@mui/lab/Masonry";
import { IsMobile } from "../../../helpers/MuiHelpers";
import SortableLabel from "../../../components/filter/SortableLabel";

interface SpellCardsProps {
    spells: Spell[] | undefined;
    sortBy: string | undefined;
    handleSortBy: (sortByName: string) => void;
}

export default function SpellCards({
    spells,
    sortBy,
    handleSortBy,
}: SpellCardsProps) {
    function CardsLayout() {
        const isMobile = IsMobile();

        if (spells && spells.length > 0) {
            if (isMobile) {
                return spells.map((spell) => (
                    <div key={spell.id} className="mb-4">
                        <SpellCard spell={spell} />
                    </div>
                ));
            } else {
                return (
                    <Masonry columns={3} spacing={2}>
                        {spells.map((spell) => (
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

    return (
        <>
            <div className="mb-4">
                Sort by:
                <SortableLabel
                    sortName="level"
                    sortBy={sortBy}
                    handleSortBy={handleSortBy}
                >
                    Level
                </SortableLabel>
                <SortableLabel
                    sortName="name"
                    sortBy={sortBy}
                    handleSortBy={handleSortBy}
                >
                    Name
                </SortableLabel>
                <SortableLabel
                    sortName="castingTime"
                    sortBy={sortBy}
                    handleSortBy={handleSortBy}
                >
                    Casting time
                </SortableLabel>
                <SortableLabel
                    sortName="duration"
                    sortBy={sortBy}
                    handleSortBy={handleSortBy}
                >
                    Duration
                </SortableLabel>
                <SortableLabel
                    sortName="rangeType,rangeValue"
                    sortBy={sortBy}
                    handleSortBy={handleSortBy}
                >
                    Range
                </SortableLabel>
            </div>
            {CardsLayout()}
        </>
    );
}
