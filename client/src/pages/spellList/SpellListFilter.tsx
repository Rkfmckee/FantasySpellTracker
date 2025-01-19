import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import EnumMultiselect from "../../components/form/EnumMultiselect";
import { SpellFilter } from "../../schemas/filter/SpellFilterSchema";
import {
    GetSpellLevelKeys,
    GetSpellLevelName,
} from "../../schemas/spell/SpellLevelSchema";
import {
    GetSpellSchoolKeys,
    SpellSchool,
} from "../../schemas/spell/SpellSchoolSchema";
import {
    GetSpellCastingTimeKeys,
    GetSpellCastingTimeName,
} from "../../schemas/spell/SpellCastingTimeSchema";
import {
    GetSpellDurationKeys,
    GetSpellDurationName,
} from "../../schemas/spell/SpellDurationSchema";
import {
    GetSpellRangeTypeKeys,
    SpellRangeType,
} from "../../schemas/spell/SpellRangeTypeSchema";

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
    const [spellFilter, setSpellFilter] = useState<SpellFilter>({
        name: "",
        levels: [],
        schools: [],
        castingTime: [],
        duration: [],
        rangeValue: "",
        rangeType: [],
    });

    useEffect(() => {
        const delay = setTimeout(() => onSpellFilterChange(spellFilter), 500);
        return () => clearTimeout(delay);
    }, [spellFilter]);

    function clearFilter() {
        setSpellFilter({
            name: "",
            levels: [],
            schools: [],
            castingTime: [],
            duration: [],
            rangeValue: "",
            rangeType: [],
        });

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
                    <FormControl className="filter-item">
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
                    <FormControl className="filter-item">
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
                    <FormControl className="filter-item">
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
                    <FormControl className="filter-item">
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
                    <FormControl className="filter-item">
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
                    <FormControl className="filter-item">
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

                    <FormControl className="filter-item">
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
            spellFilter.rangeType.length > 0)
    );
}
