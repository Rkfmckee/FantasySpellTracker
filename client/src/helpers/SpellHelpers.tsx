import parse from "html-react-parser";
import {
    GetSpellLevelName,
    SpellLevel,
} from "../schemas/spell/SpellLevelSchema";
import { SpellRangeType } from "../schemas/spell/SpellRangeTypeSchema";
import { Spell } from "../schemas/spell/SpellSchema";
import { SpellSchool } from "../schemas/spell/SpellSchoolSchema";
import { NewlineToLinebreak } from "./StringHelpers";
import { Tooltip } from "@mui/material";

export function GetDescription(spell: Spell) {
    return parse(NewlineToLinebreak(spell.description));
}

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
                <div>{parse(text)}</div>
            </div>
        );
    }
}

export function GetConcentrationTag(spell: Spell, showLabel: boolean = false) {
    return (
        spell.isConcentration &&
        GetTagWithLabel(showLabel, "Concentration", "fa-solid fa-brain")
    );
}

export function GetRitualTag(spell: Spell, showLabel: boolean = false) {
    return (
        spell.isRitual &&
        GetTagWithLabel(showLabel, "Ritual", "fa-solid fa-registered")
    );
}

export function GetCriticalRoleTag(spell: Spell, showLabel: boolean = false) {
    return (
        IsCriticalRole(spell) &&
        GetTagWithLabel(
            showLabel,
            "Source: Critical Role",
            "fa-brands fa-critical-role"
        )
    );
}

export function GetUnearthedArcanaTag(
    spell: Spell,
    showLabel: boolean = false
) {
    return (
        IsUnearthedArcana(spell) &&
        GetTagWithLabel(showLabel, "Source: Unearthed Arcana", "fa-solid fa-u")
    );
}

export function IsCriticalRole(spell: Spell) {
    const criticalRoleSourceIds = [81, 83, 85];

    if (criticalRoleSourceIds.includes(spell.source.id)) return true;
    return false;
}

export function IsUnearthedArcana(spell: Spell) {
    const unearthedArcanaSourceIds = [1];

    if (unearthedArcanaSourceIds.includes(spell.source.id)) return true;
    return false;
}

function GetTagWithLabel(showLabel: boolean, label: string, iconClass: string) {
    return (
        <span className="spell-tag">
            <Tooltip title={label} arrow>
                <i className={iconClass} />
            </Tooltip>
            {showLabel && <em className="px-1">{label}</em>}
        </span>
    );
}
