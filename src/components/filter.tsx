import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Table } from "interfaces/table";
import { FilterParam } from "interfaces/filter";

import styles from './../styles/filter.module.scss';

export default function Filter({ setData, data }: { disabled?: boolean, data: Table, setData: (data: Table) => void }) {
    const defaultValues = data.columns.reduce((prev, curr) => {
        prev[curr.name] = '';
        return prev;
    }, {} as FilterParam);

    const { register, watch, reset } = useForm<FilterParam>({
        defaultValues,
    });

    const filters = watch();

    useEffect(() => {
        setData({ ...data, rows: filterData() });
    }, [JSON.stringify(filters)]);

    const filterData = () => {
        const _columnsToFilter = data.columns.filter(({ name }) => filters[name].trim()).map(({ name }) => name);

        if (_columnsToFilter.length === 0) return data.rows;

        return data.rows?.filter((row) => {
            return _columnsToFilter.every((columnName) => {
                const filterValue = filters[columnName].trim().toLowerCase();
                const rowValue = row[columnName].toLowerCase();
                return rowValue.includes(filterValue);
            });
        });
    };

    const resetFilter = () => {
        reset();
        setData(data);
    };

    return (
        <form className={styles.filter}>
            {
                data.columns.map(({name}) => (
                    <input
                        {...register(name)}
                        key={name}
                        placeholder={name}
                        aria-label={`Search by ${name}`}
                    />
                ))
            }

            <button type="button" onClick={resetFilter}>Reset</button>
        </form>
    );
}
