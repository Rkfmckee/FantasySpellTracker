import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import EnumMultiselect from "../../components/form/EnumMultiselect";
import { SpellFilter } from "../../schemas/filter/SpellFilterSchema";
import {
    GetSpellCastingTimeKeys,
    GetSpellCastingTimeName,
} from "../../schemas/spell/SpellCastingTimeSchema";
import { SpellComponents } from "../../schemas/spell/SpellComponentSchema";
import {
    GetSpellDurationKeys,
    GetSpellDurationName,
} from "../../schemas/spell/SpellDurationSchema";
import {
    GetSpellLevelKeys,
    GetSpellLevelName,
} from "../../schemas/spell/SpellLevelSchema";
import {
    GetSpellRangeTypeKeys,
    SpellRangeType,
} from "../../schemas/spell/SpellRangeTypeSchema";
import {
    GetSpellSchoolKeys,
    SpellSchool,
} from "../../schemas/spell/SpellSchoolSchema";
import { Source } from "../../schemas/source/SourceSchema";
import axios from "axios";

interface SpellListFilterProps {
    showFilters: boolean;
    onSpellFilterChange: (spellFilter: SpellFilter) => void;
    filterCleared?: () => void;
}

export default function SpellListFilter({
    showFilters,
    onSpellFilterChange,
    filterCleared,
}: SpellListFilterProps) {
    const defaultSpellFilter = {
        name: "",
        levels: [],
        schools: [],
        castingTime: [],
        duration: [],
        rangeValue: "",
        rangeType: [],
        components: [],
        flags: null,
        sources: [],
    };

    const [sources, setSources] = useState<Source[]>([]);
    const [spellFilter, setSpellFilter] =
        useState<SpellFilter>(defaultSpellFilter);

    useEffect(() => {
        getSources();
    }, []);

    async function getSources() {
        await axios.get<Source[]>("Source/Spell").then((response) => {
            setSources(response.data);
        });
    }

    useEffect(() => {
        const delay = setTimeout(() => onSpellFilterChange(spellFilter), 500);
        return () => clearTimeout(delay);
    }, [spellFilter]);

    function clearFilter() {
        setSpellFilter(defaultSpellFilter);

        if (filterCleared) filterCleared();
    }

    return (
        <Collapse
            in={showFilters}
            timeout="auto"
            unmountOnExit
            className="filter-section"
        >
            <Paper elevation={3}>
                <div className="filter-grid">
                    {/* Name */}
                    <FormControl>
                        <TextField
                            id="filter-name"
                            label="Name"
                            variant="standard"
                            value={spellFilter.name}
                            onChange={(event) => {
                                setSpellFilter({
                                    ...spellFilter,
                                    name: event.target.value,
                                });
                            }}
                        />
                    </FormControl>

                    {/* Level */}
                    <FormControl>
                        <EnumMultiselect
                            label="Level"
                            options={GetSpellLevelKeys()}
                            values={spellFilter.levels}
                            onValuesChanged={(values) =>
                                setSpellFilter({
                                    ...spellFilter,
                                    levels: values,
                                })
                            }
                            getOptionLabel={GetSpellLevelName}
                        />
                    </FormControl>

                    {/* School */}
                    <FormControl>
                        <EnumMultiselect
                            label="School"
                            options={GetSpellSchoolKeys()}
                            values={spellFilter.schools}
                            onValuesChanged={(values) =>
                                setSpellFilter({
                                    ...spellFilter,
                                    schools: values,
                                })
                            }
                            getOptionLabel={(value) => SpellSchool[value]}
                        />
                    </FormControl>

                    {/* Casting time */}
                    <FormControl>
                        <EnumMultiselect
                            label="Casting time"
                            options={GetSpellCastingTimeKeys()}
                            values={spellFilter.castingTime}
                            onValuesChanged={(values) =>
                                setSpellFilter({
                                    ...spellFilter,
                                    castingTime: values,
                                })
                            }
                            getOptionLabel={GetSpellCastingTimeName}
                        />
                    </FormControl>

                    {/* Duration */}
                    <FormControl>
                        <EnumMultiselect
                            label="Duration"
                            options={GetSpellDurationKeys()}
                            values={spellFilter.duration}
                            onValuesChanged={(values) =>
                                setSpellFilter({
                                    ...spellFilter,
                                    duration: values,
                                })
                            }
                            getOptionLabel={GetSpellDurationName}
                        />
                    </FormControl>

                    {/* Range */}
                    <FormControl>
                        <TextField
                            type="number"
                            id="filter-range-value"
                            label="Range value"
                            variant="standard"
                            value={spellFilter.rangeValue}
                            onChange={(event) => {
                                setSpellFilter({
                                    ...spellFilter,
                                    rangeValue: event.target.value,
                                });
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <EnumMultiselect
                            label="Range type"
                            options={GetSpellRangeTypeKeys()}
                            values={spellFilter.rangeType}
                            onValuesChanged={(values) =>
                                setSpellFilter({
                                    ...spellFilter,
                                    rangeType: values,
                                })
                            }
                            getOptionLabel={(value) => SpellRangeType[value]}
                        />
                    </FormControl>

                    {/* Components */}
                    <FormControl>
                        <ToggleButtonGroup
                            value={spellFilter.components}
                            onChange={(_event, values) =>
                                setSpellFilter({
                                    ...spellFilter,
                                    components: values,
                                })
                            }
                        >
                            <ToggleButton
                                value={SpellComponents.Verbal}
                                className="filter-grid-item__components"
                            >
                                V
                            </ToggleButton>
                            <ToggleButton
                                value={SpellComponents.Somatic}
                                className="filter-grid-item__components"
                            >
                                S
                            </ToggleButton>
                            <ToggleButton
                                value={SpellComponents.Material}
                                className="filter-grid-item__components"
                            >
                                M
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </FormControl>

                    {/* Flags */}
                    <FormControl className="filter-grid-item__flag-group">
                        <ToggleButtonGroup
                            value={spellFilter.flags}
                            onChange={(_event, values) =>
                                setSpellFilter({
                                    ...spellFilter,
                                    flags: values,
                                })
                            }
                        >
                            <ToggleButton
                                value={"concentration"}
                                className="filter-grid-item__flag-concentration"
                            >
                                Is Concentration
                            </ToggleButton>
                            <ToggleButton
                                value={"ritual"}
                                className="filter-grid-item__flag-ritual"
                            >
                                Is Ritual
                            </ToggleButton>
                            <ToggleButton
                                value={"upcast"}
                                className="filter-grid-item__flag-upcast"
                            >
                                Can Upcast
                            </ToggleButton>
                            <ToggleButton
                                value={"materialCost"}
                                className="filter-grid-item__flag-materialCost"
                            >
                                Has Material Cost
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </FormControl>

                    {/* Source */}
                    <FormControl>
                        <EnumMultiselect
                            label="Source"
                            options={sources}
                            values={spellFilter.sources}
                            onValuesChanged={(values) =>
                                setSpellFilter({
                                    ...spellFilter,
                                    sources: values,
                                })
                            }
                            getOptionLabel={(value) => value.title}
                        />
                    </FormControl>
                </div>

                {SpellFilterIsNotEmpty(spellFilter) && (
                    <div>
                        <Button onClick={() => clearFilter()} className="m-2">
                            Clear filter
                        </Button>
                    </div>
                )}
            </Paper>
        </Collapse>
    );
}

export function SpellFilterIsNotEmpty(spellFilter: SpellFilter | undefined) {
    return (
        spellFilter &&
        (spellFilter.name ||
            spellFilter.levels.length > 0 ||
            spellFilter.schools.length > 0 ||
            spellFilter.castingTime.length > 0 ||
            spellFilter.duration.length > 0 ||
            spellFilter.rangeValue ||
            spellFilter.rangeType.length > 0 ||
            spellFilter.components.length > 0 ||
            spellFilter.flags ||
            spellFilter.sources.length > 0)
    );
}
