import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { isUndefined, isEqual } from "lodash";

import { TableData } from "interfaces/tableData";
import { maxAge, minAge } from "constants/userTable.const";

export default function Filter({ setData, data }: { disabled?: boolean, data: TableData[], setData: (data: TableData[]) => void }) {
    const { control, watch } = useForm();
    const [filteredData, setFilteredData] = useState<TableData[]>([]);

    const watchAllFields = watch();

    useEffect(() => {
        if(isUndefined(watchAllFields.name ??
            watchAllFields.minAge ??
            watchAllFields.maxAge ??
            watchAllFields.id ??
            watchAllFields.isVerified)
        ) return;

        const _filteredData = filterData();

        if (isEqual(filteredData, _filteredData)) return;

        setFilteredData(_filteredData);
        setData(_filteredData);
    }, [watchAllFields]);

    const filterData = () => {
        return data.filter((item) => {
          const { minAge, maxAge, isVerified, name, id } = watchAllFields;
          return (
            (!minAge || minAge == ''|| item.age >= +minAge) &&
            (!maxAge || maxAge == '' || item.age <= +maxAge) &&
            (isVerified == undefined || item.isVerified === isVerified) &&
            (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
            (!id || item.id === id)
          );
        });
    };

    return (
        <form>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <input placeholder="Name" aria-label="Search by name" {...field} />
                )}
            />
            <Controller
                name="id"
                control={control}
                render={({ field }) => (
                    <input aria-label="Search by id" {...field} />
                )}
            />
             <Controller
                name="minAge"
                control={control}
                rules={{ min: minAge, max: (+watchAllFields.maxAge || maxAge) - 1 }}
                render={({ field }) => (
                    <input type="number" aria-label="Min age" {...field} />
                )}
            />
            <Controller
                name="maxAge"
                control={control}
                rules={{ min: (+watchAllFields.minAge || minAge) + 1, max: maxAge }}
                render={({ field }) => (
                    <input type="number" aria-label="Max age" {...field} />
                )}
            />
            <Controller
                name="isVerified"
                control={control}
                render={({ field }) => (
                    <div>
                        <input
                            type="checkbox"
                            id="isVerified"
                            aria-label={field.value ? 'Verified' : 'Not verified'}
                            {...field}
                            checked={field.value}
                        />
                        <label htmlFor="isVerified">Verified</label>
                    </div>
                )}
            />
        </form>
    );
}
