import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import parse from "html-react-parser";
import { useState } from "react";
import { ToLinebreak } from "../../../helpers/StringHelpers";
import { GetSpellCastingTimeName } from "../../../schemas/spell/SpellCastingTimeSchema";
import { GetSpellComponentsName } from "../../../schemas/spell/SpellComponentSchema";
import { GetSpellDurationName } from "../../../schemas/spell/SpellDurationSchema";
import {
    GetSpellLevelName,
    SpellLevel,
} from "../../../schemas/spell/SpellLevelSchema";
import { SpellRangeType } from "../../../schemas/spell/SpellRangeTypeSchema";
import { Spell } from "../../../schemas/spell/SpellSchema";
import { SpellSchool } from "../../../schemas/spell/SpellSchoolSchema";

interface RowProps {
    spell: Spell;
}

export default function ItemRow({ spell }: RowProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>{GetLevelAndSchoolDescription(spell)}</TableCell>

                <TableCell component="th" scope="row">
                    <Button onClick={() => setOpen(!open)}>{spell.name}</Button>
                </TableCell>

                <TableCell
                    className={HasDescriptionClass(
                        "casting-time",
                        spell.castingTimeDescription
                    )}
                >
                    {GetSpellCastingTimeName(spell.castingTime)}
                </TableCell>

                <TableCell>{GetSpellDurationName(spell.duration)}</TableCell>
                <TableCell
                    className={HasDescriptionClass(
                        "range",
                        spell.rangeDescription
                    )}
                >
                    {GetRangeDescription(spell)}
                </TableCell>
                <TableCell
                    className={HasDescriptionClass(
                        "component",
                        spell.componentsDescription
                    )}
                >
                    {GetSpellComponentsName(spell.components)}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {ToLinebreak(spell.description)}

                            {GetDescriptionBox(spell.higherLevelDescription)}

                            <div className="row">
                                {GetDescriptionBox(
                                    spell.castingTimeDescription,
                                    "Casting time"
                                )}

                                {GetDescriptionBox(
                                    spell.rangeDescription,
                                    "Range"
                                )}

                                {GetDescriptionBox(
                                    spell.componentsDescription,
                                    "Components"
                                )}
                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

function GetLevelAndSchoolDescription(spell: Spell) {
    var school = SpellSchool[spell.school];
    var level = GetSpellLevelName(spell.level);

    if (spell.level == SpellLevel.Cantrip) {
        return `${school} ${level}`;
    } else {
        return `${level} level ${school}`;
    }
}

function GetRangeDescription(spell: Spell) {
    var rangeType = SpellRangeType[spell.rangeType];

    if (spell.rangeValue == 0) {
        return rangeType;
    } else {
        return `${spell.rangeValue} ${rangeType}`;
    }
}

function HasDescriptionClass(
    descriptionType: string,
    description: string | undefined
) {
    if (description)
        return `has-description has-description__${descriptionType}`;
}

function GetDescriptionBox(text: string | undefined, name: string = "") {
    if (text) {
        return (
            <div
                className={`description-box ${
                    name &&
                    `description-box__${name.toLowerCase().replace(" ", "-")}`
                } col-md-auto`}
            >
                <label>{name ? name : "At higher levels"}</label>
                {parse(text)}
            </div>
        );
    }
}
