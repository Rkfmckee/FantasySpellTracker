import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { SpellFilter } from "../../schemas/filter/SpellFilterSchema";
import { useEffect, useState } from "react";

interface SpellListFilterProps {
    showFilters: boolean;
    onSpellFilterChange: (spellFilter: SpellFilter) => void;
}

export default function SpellListFilter({
    showFilters,
    onSpellFilterChange,
}: SpellListFilterProps) {
    const [name, setName] = useState<string>();

    let spellFilter: SpellFilter = {
        name: name,
    };

    useEffect(() => {
        const delay = setTimeout(() => onSpellFilterChange(spellFilter), 500);
        return () => clearTimeout(delay);
    }, [spellFilter]);

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
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
            </Paper>
        </Collapse>
    );
}

export function SpellFilterIsNotEmpty(spellFilter: SpellFilter | undefined) {
    return spellFilter && spellFilter.name;
}
