import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { StringIsNumber } from "../../helpers/StringHelpers";
import { SpellFilter } from "../../schemas/filter/SpellFilterSchema";
import {
    GetSpellLevelName,
    SpellLevel,
} from "../../schemas/spell/SpellLevelSchema";

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
        levels: null,
    });

    const spellLevelKeys = Object.keys(SpellLevel)
        .filter(StringIsNumber)
        .map((key) => Number(key));

    useEffect(() => {
        const delay = setTimeout(() => onSpellFilterChange(spellFilter), 500);
        return () => clearTimeout(delay);
    }, [spellFilter]);

    function clearFilter() {
        setSpellFilter({
            name: "",
            levels: null,
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

                <FormControl className="filter-item">
                    <Autocomplete
                        id="filter-level"
                        filterSelectedOptions
                        value={spellFilter.levels}
                        onChange={(_event, values: SpellLevel | null) => {
                            setSpellFilter({
                                ...spellFilter,
                                levels: values,
                            });
                        }}
                        options={spellLevelKeys}
                        getOptionLabel={(option) => GetSpellLevelName(option)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Level"
                            />
                        )}
                    />
                </FormControl>

                {SpellFilterIsNotEmpty(spellFilter) && (
                    <div>
                        <Button onClick={() => clearFilter()} className="m-2">
                            Clear filter
                        </Button>
                    </div>
                )}
            </Paper>
            <p>{spellFilter.levels}</p>
        </Collapse>
    );
}

export function SpellFilterIsNotEmpty(spellFilter: SpellFilter | undefined) {
    return spellFilter && (spellFilter.name || spellFilter.levels);
}
