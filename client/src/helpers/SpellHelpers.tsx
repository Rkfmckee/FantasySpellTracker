import {
    GetSpellLevelName,
    SpellLevel,
} from "../schemas/spell/SpellLevelSchema";
import { SpellRangeType } from "../schemas/spell/SpellRangeTypeSchema";
import { Spell } from "../schemas/spell/SpellSchema";
import { SpellSchool } from "../schemas/spell/SpellSchoolSchema";
import parse from "html-react-parser";

export function GetLevelAndSchoolDescription(spell: Spell) {
    var school = SpellSchool[spell.school];
    var level = GetSpellLevelName(spell.level);

    if (spell.level == SpellLevel.Cantrip) {
        return `${school} ${level}`;
    } else {
        return `${level} level ${school}`;
    }
}

export function GetRangeDescription(spell: Spell) {
    var rangeType = SpellRangeType[spell.rangeType];

    if (spell.rangeValue == 0) {
        return rangeType;
    } else {
        return `${spell.rangeValue} ${rangeType}`;
    }
}

export function HasDescriptionClass(
    descriptionType: string,
    description: string | undefined
) {
    if (description)
        return `has-description has-description__${descriptionType}`;
}

export function GetDescriptionBox(text: string | undefined, name: string = "") {
    if (text) {
        return (
            <div
                className={`description-box ${
                    name &&
                    `description-box__${name.toLowerCase().replace(" ", "-")}`
                } col-md-auto`}
            >
                <label>
                    <strong>{name ? name : "At higher levels"}</strong>
                </label>
                {parse(text)}
            </div>
        );
    }
}
