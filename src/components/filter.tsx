import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TableData } from "interfaces/table";
import { maxAge, minAge } from "constants/userTable.const";
import { FilterField, FilterParam } from "interfaces/filter";
import styles from './../styles/filter.module.scss';

export default function Filter({ setData, data }: { disabled?: boolean, data: TableData[], setData: (data: TableData[]) => void }) {
    const { register, watch, reset, setValue } = useForm<FilterParam>({
        defaultValues: {
            name: '',
            id: '',
            minAge: String(minAge),
            maxAge: String(maxAge),
            isVerified: undefined,
        }
    });

    const filters = watch();

    useEffect(() => {
        setData(filterData());
    }, [JSON.stringify(filters)]);

    useEffect(() => {
        const { minAge: _minAge, maxAge: _maxAge } = filters;

        if (+_minAge < +minAge) setValue(FilterField.MIN_AGE, String(minAge));
        if (+_maxAge > +maxAge) setValue(FilterField.MAX_AGE, String(maxAge));
        if (+_minAge >= +_maxAge) setValue(FilterField.MIN_AGE, String(_maxAge));
        if (+_maxAge <= +_minAge) setValue(FilterField.MAX_AGE, String(_minAge));
    }, [filters.minAge, filters.maxAge, setValue]);

    const filterData = () => {
        return data.filter((item) => {
            const { minAge, maxAge, isVerified, name, id } = filters;
            return (
                (minAge === '' || +item.age >= +minAge!) &&
                (maxAge === '' || +item.age <= +maxAge!) &&
                (!isVerified || item.isVerified === isVerified) &&
                (name === '' || item.name.toLowerCase().includes(name.toLowerCase())) &&
                (id === '' || item.id!.toLowerCase().startsWith(id.toLowerCase()))
            );
        });
    };

    const resetFilter = () => {
        reset();
        setData(data);
    };

    return (
        <form className={styles.filter}>
            <input
                {...register(FilterField.NAME)}
                placeholder="Name"
                aria-label="Search by name"
            />
            <input
                {...register(FilterField.ID)}
                placeholder="ID"
                aria-label="Search by ID"
            />
            <input
                {...register(FilterField.MIN_AGE)}
                type="number"
                placeholder="Min Age"
                aria-label="Min age"
            />
            <input
                {...register(FilterField.MAX_AGE)}
                type="number"
                placeholder="Max Age"
                aria-label="Max age"
            />
            <div>
                <input
                    {...register(FilterField.IS_VERIFIED)}
                    type="checkbox"
                    id="isVerified"
                    aria-label="Verified"
                />
                <label htmlFor="isVerified">Verified</label>
            </div>
            <button type="button" onClick={resetFilter}>Reset</button>
        </form>
    );
}
