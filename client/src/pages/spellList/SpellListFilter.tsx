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
    const [name, setName] = useState<string>();
    const [levels, setLevels] = useState<SpellLevel[]>();

    const spellLevelKeys = Object.keys(SpellLevel)
        .filter(StringIsNumber)
        .map((key) => Number(key));

    let spellFilter: SpellFilter = {
        name: name,
        levels: levels,
    };

    useEffect(() => {
        const delay = setTimeout(() => onSpellFilterChange(spellFilter), 500);
        return () => clearTimeout(delay);
    }, [spellFilter]);

    function clearFilter() {
        setName("");
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
                <TextField
                    id="filter-name"
                    label="Name"
                    variant="standard"
                    className="filter-item"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <FormControl fullWidth>
                    <Autocomplete
                        multiple
                        filterSelectedOptions
                        onChange={(_event, value) =>
                            setLevels((prevLevels) =>
                                prevLevels ? [...prevLevels, ...value] : value
                            )
                        }
                        id="filter-level"
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
        </Collapse>
    );
}

export function SpellFilterIsNotEmpty(spellFilter: SpellFilter | undefined) {
    return spellFilter && (spellFilter.name || spellFilter.levels);
}
