import { Laptop, PhoneAndroid } from "@mui/icons-material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { IsMobile } from "../../helpers/MuiHelpers";
import { ReadResponse } from "../../schemas/ReadResponseSchema";
import { Spell } from "../../schemas/spell/SpellSchema";
import SpellCards from "./cards/SpellCards";
import SpellTable from "./table/SpellTable";

export default function SpellList() {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [spells, setSpells] = useState<Spell[]>();
    const [viewMode, setViewMode] = useState<ViewMode>("table");

    type ViewMode = "table" | "card";

    useEffect(() => {
        axios
            .post<ReadResponse<Spell>>("Spell/Read", {
                // Frontend uses 0 for first page, backend uses 1
                // So increment to match the backend before posting
                pageNumber: page + 1,
                pageSize: rowsPerPage,
            })
            .then((response) => {
                setSpells(response.data.currentPageData);
                setTotalRecords(response.data.totalRecords);
            });
    }, [page, rowsPerPage]);

    function handleViewModeChange(
        _event: MouseEvent<HTMLElement>,
        value: string
    ) {
        if (value !== null) {
            setViewMode(value as ViewMode);
        }
    }

    function showTableOrCardView(isMobile: boolean) {
        if (viewMode == "card" || isMobile) {
            return <SpellCards spells={spells} />;
        }

        return (
            <SpellTable
                spells={spells}
                totalRecords={totalRecords}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        );
    }

    const isMobile = IsMobile();

    return (
        <>
            <Typography variant="h1" gutterBottom>
                Spells
            </Typography>

            {!isMobile && (
                <ToggleButtonGroup
                    className="mb-4"
                    value={viewMode}
                    onChange={handleViewModeChange}
                    exclusive
                    aria-label="View mode"
                >
                    <ToggleButton value="table" aria-label="left aligned">
                        <Laptop className="spell-view-icon" />
                        Table view
                    </ToggleButton>
                    <ToggleButton value="card" aria-label="centered">
                        <PhoneAndroid className="spell-view-icon" />
                        Card view
                    </ToggleButton>
                </ToggleButtonGroup>
            )}

            {showTableOrCardView(isMobile)}
        </>
    );
}
