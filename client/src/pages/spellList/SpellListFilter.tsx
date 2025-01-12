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
                {/* Name */}
                <FormControl>
                    <TextField
                        id="filter-name"
                        label="Name"
                        variant="standard"
                        className="filter-item"
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

                {/* School */}
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
            spellFilter.schools.length > 0)
    );
}
