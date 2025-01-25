import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface EnumMultiselectProps<T> {
    label: string;
    options: T[];
    values: T[];
    onValuesChanged: (values: T[]) => void;
    getOptionLabel: (value: T) => string;
}

export default function EnumMultiselect<T>({
    label,
    options,
    values,
    onValuesChanged,
    getOptionLabel,
}: EnumMultiselectProps<T>) {
    return (
        <Autocomplete
            multiple
            filterSelectedOptions
            id={`filter-${label.toLowerCase()}`}
            value={values}
            onChange={(_event, values) => {
                onValuesChanged(values as T[]);
            }}
            options={options}
            getOptionLabel={(option) => getOptionLabel(option as T)}
            renderInput={(params) => (
                <TextField {...params} variant="standard" label={label} />
            )}
        />
    );
}
