import { Laptop, PhoneAndroid } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
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
import { SortNameDescending } from "../../helpers/FilterHelpers";

export default function SpellList() {
    // Filter properties
    const pageSize = 12;
    const [sortBy, setSortBy] = useState<string>();
    const [page, setPage] = useState<number>(1);

    const [totalRecords, setTotalRecords] = useState(0);
    const [spells, setSpells] = useState<Spell[]>();
    const [viewMode, setViewMode] = useState<ViewMode>("table");

    type ViewMode = "table" | "card";

    useEffect(() => {
        let url = `Spell?page=${page}&pageSize=${pageSize}`;
        if (sortBy != undefined) url += `&sorts=${sortBy}`;

        axios.get<ReadResponse<Spell>>(url).then((response) => {
            setSpells(response.data.currentPageData);
            setTotalRecords(response.data.totalRecords);
        });
    }, [page, sortBy]);

    function handleViewModeChange(
        _event: MouseEvent<HTMLElement>,
        value: string
    ) {
        if (value !== null) {
            setViewMode(value as ViewMode);
        }
    }

    function handleSortBy(sortName: string) {
        const sortNameDesc = SortNameDescending(sortName);

        if (sortBy == sortName) setSortBy(sortNameDesc);
        else if (sortBy == sortNameDesc) setSortBy(undefined);
        else setSortBy(sortName);
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

            {viewMode == "card" || isMobile ? (
                <SpellCards
                    spells={spells}
                    sortBy={sortBy}
                    handleSortBy={handleSortBy}
                />
            ) : (
                <SpellTable
                    spells={spells}
                    sortBy={sortBy}
                    handleSortBy={handleSortBy}
                />
            )}

            <div className="d-flex justify-content-center">
                <Pagination
                    count={Math.ceil(totalRecords / pageSize)}
                    page={page}
                    onChange={(_event, value) => setPage(value)}
                    className="mt-4 justify-content-center"
                />
            </div>
        </>
    );
}
