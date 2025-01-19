import { Laptop, PhoneAndroid } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { SortNameDescending } from "../../helpers/FilterHelpers";
import { IsMobile } from "../../helpers/MuiHelpers";
import { SpellFilter } from "../../schemas/filter/SpellFilterSchema";
import { ReadResponse } from "../../schemas/ReadResponseSchema";
import { Spell } from "../../schemas/spell/SpellSchema";
import SpellCards from "./cards/SpellCards";
import SpellListFilter, { SpellFilterIsNotEmpty } from "./SpellListFilter";
import SpellTable from "./table/SpellTable";

export default function SpellList() {
    // Filter properties
    const pageSize = 12;
    const [sortBy, setSortBy] = useState<string>();
    const [page, setPage] = useState<number>(1);
    const [showFilters, setShowFilters] = useState(false);
    const [spellFilter, setSpellFilter] = useState<SpellFilter>();

    const [totalRecords, setTotalRecords] = useState(0);
    const [spells, setSpells] = useState<Spell[]>();
    const [viewMode, setViewMode] = useState<ViewMode>("table");

    type ViewMode = "table" | "card";

    useEffect(() => {
        if (page != 1) setPage(1);
        else getSpellsFromApi();
    }, [spellFilter, sortBy]);

    useEffect(() => {
        getSpellsFromApi;
    }, [page]);

    async function getSpellsFromApi() {
        let url = `Spell?page=${page}&pageSize=${pageSize}`;
        if (sortBy) url += `&sorts=${sortBy}`;

        if (SpellFilterIsNotEmpty(spellFilter)) {
            url += "&filters=";
            if (spellFilter?.name) url += `name@=${spellFilter.name},`;

            if (spellFilter?.levels && spellFilter?.levels.length > 0) {
                url += `level==${spellFilter.levels.join("|")},`;
            }

            if (spellFilter?.schools && spellFilter?.schools.length > 0) {
                url += `school==${spellFilter.schools.join("|")},`;
            }
        }

        await axios.get<ReadResponse<Spell>>(url).then((response) => {
            setSpells(response.data.currentPageData);
            setTotalRecords(response.data.totalRecords);
        });
    }

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

            <div className="mb-4 d-flex">
                {!isMobile && (
                    <ToggleButtonGroup
                        value={viewMode}
                        onChange={handleViewModeChange}
                        aria-label="View mode"
                        exclusive
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

                <Button
                    onClick={() => setShowFilters(!showFilters)}
                    className="my-auto mx-2"
                >
                    {showFilters ? "Hide" : "Show"} filters
                </Button>
            </div>

            <SpellListFilter
                showFilters={showFilters}
                onSpellFilterChange={setSpellFilter}
                filterCleared={() => setShowFilters(false)}
            />

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
