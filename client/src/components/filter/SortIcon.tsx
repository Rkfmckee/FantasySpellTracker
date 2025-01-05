import { SortNameDescending } from "../../helpers/FilterHelpers";

interface SortIconProps {
    sortName: string;
    sortBy: string | undefined;
}

export default function SortIcon({ sortName, sortBy }: SortIconProps) {
    const sortNameDesc = SortNameDescending(sortName);

    function sortIcon() {
        if (sortBy == sortName) return <i className="fa-solid fa-sort-up" />;

        if (sortBy == sortNameDesc)
            return <i className="fa-solid fa-sort-down" />;

        return <i className="fa-solid fa-sort" />;
    }

    return sortIcon();
}
