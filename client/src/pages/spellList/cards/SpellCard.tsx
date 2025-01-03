import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import {
    GetDescriptionBox,
    GetLevelAndSchoolDescription,
    GetRangeDescription,
    HasDescriptionClass,
} from "../../../helpers/SpellHelpers";
import { ToLinebreak } from "../../../helpers/StringHelpers";
import { GetSpellCastingTimeName } from "../../../schemas/spell/SpellCastingTimeSchema";
import { GetSpellComponentsName } from "../../../schemas/spell/SpellComponentSchema";
import { GetSpellDurationName } from "../../../schemas/spell/SpellDurationSchema";
import { Spell } from "../../../schemas/spell/SpellSchema";

interface SpellCardProps {
    spell: Spell;
}

export default function SpellCard({ spell }: SpellCardProps) {
    const [showDescription, setShowDescription] = useState(false);

    return (
        <Card>
            <CardContent>
                <Typography variant="body1" component="div">
                    <strong>{spell.name}</strong>
                </Typography>

                <Typography variant="subtitle1" component="div">
                    <small>{GetLevelAndSchoolDescription(spell)}</small>
                </Typography>

                <hr />

                <Typography
                    variant="body2"
                    className={HasDescriptionClass(
                        "casting-time",
                        spell.castingTimeDescription
                    )}
                >
                    <strong>Casting time: </strong>
                    {GetSpellCastingTimeName(spell.castingTime)}
                </Typography>

                <Typography variant="body2" component="div">
                    <strong>Duration: </strong>
                    {GetSpellDurationName(spell.duration)}
                </Typography>

                <Typography
                    variant="body2"
                    className={HasDescriptionClass(
                        "range",
                        spell.rangeDescription
                    )}
                >
                    <strong>Range: </strong>
                    {GetRangeDescription(spell)}
                </Typography>

                <Typography
                    variant="body2"
                    className={HasDescriptionClass(
                        "components",
                        spell.componentsDescription
                    )}
                >
                    <strong>Components: </strong>
                    {GetSpellComponentsName(spell.components)}
                </Typography>

                <Button
                    className="p-0 mt-3"
                    onClick={() => setShowDescription(!showDescription)}
                >
                    {showDescription ? "Hide" : "Show"} description
                </Button>

                {showDescription && (
                    <Typography variant="body2" className="mt-3">
                        {ToLinebreak(spell.description)}
                        {GetDescriptionBox(spell.higherLevelDescription)}
                        {GetDescriptionBox(
                            spell.castingTimeDescription,
                            "Casting time"
                        )}
                        {GetDescriptionBox(spell.rangeDescription, "Range")}
                        {GetDescriptionBox(
                            spell.componentsDescription,
                            "Components"
                        )}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}
