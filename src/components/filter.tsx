import { useEffect, useState } from "react";

import { TableData } from "interfaces/tableData";
import { maxAge, minAge } from "constants/userTable.const";
import { FilterField, FilterParam } from "interfaces/filter";

export default function Filter({ setData, data }: { disabled?: boolean, data: TableData[], setData: (data: TableData[]) => void }) {
    const initialFilterParam = {
        name: '',
        id: '',
        minAge: String(minAge),
        maxAge: String(maxAge),
        isVerified: undefined,
    }
    const [filters, setFilters] = useState<Partial<FilterParam>>(initialFilterParam);

    useEffect(() => {
        setData(filterData());
    }, [filters]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value, type, checked } = e.target;

        if (name === FilterField.MIN_AGE) {
            if (+value < minAge) value = String(minAge);
            if (+value >= +filters.maxAge!) value = String(filters.maxAge);
        }

        if (name === FilterField.MAX_AGE) {
            if (+value > maxAge) value = String(maxAge);
            if (+value <= +filters.minAge!) value = String(filters.minAge);
        }

        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const resetFilter = () => {
        setFilters(initialFilterParam);
        setData(data);
    };

    const filterData = () => {
        return data.filter((item) => {
            const { minAge, maxAge, isVerified, name, id } = filters;
            return (
                (minAge === '' || +item.age >= +minAge!) &&
                (maxAge === '' || +item.age <= +maxAge!) &&
                (!isVerified || item.isVerified === isVerified) &&
                (name === '' || item.name.toLowerCase().includes(name!.toLowerCase())) &&
                (id === '' || item.id!.toLowerCase().startsWith(id!.toLowerCase()))
            );
        });
    };

    return (
        <form>
            <input
                name={ FilterField.NAME }
                placeholder="Name"
                aria-label="Search by name"
                value={filters.name}
                onChange={handleInputChange}
            />
            <input
                name={ FilterField.ID }
                placeholder="ID"
                aria-label="Search by ID"
                value={filters.id}
                onChange={handleInputChange}
            />
            <input
                name={ FilterField.MIN_AGE }
                type="number"
                placeholder="Min Age"
                aria-label="Min age"
                value={filters.minAge}
                onChange={handleInputChange}
            />
            <input
                name={ FilterField.MAX_AGE }
                type="number"
                placeholder="Max Age"
                aria-label="Max age"
                value={filters.maxAge}
                onChange={handleInputChange}
            />
            <div>
                <input
                    name={ FilterField.IS_VERIFIED }
                    type="checkbox"
                    id="isVerified"
                    aria-label="Verified"
                    checked={filters.isVerified}
                    onChange={handleInputChange}
                />
                <label htmlFor="isVerified">Verified</label>
            </div>
            <button type="button" onClick={resetFilter}>Reset</button>
        </form>
    );
}
