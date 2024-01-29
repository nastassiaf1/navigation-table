import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useGetRowQuery, useGetTableDataQuery, useUpdateDataMutation } from "../api";
import Spinner from "../components/spinner";
import { TableData } from "../interfaces/tableData";
import { maxLengthName, minLengthName } from "../constants/userTable.const";
import { useEffect } from "react";

export default function EditPage() {
    const navigate = useNavigate();
    const { rowId } = useParams();
    const { data, error, isLoading } = useGetRowQuery({ id: Number(rowId) });
    const { control, handleSubmit, setValue } = useForm({
        id: rowId,
        name: null,
        age: null,
        isVerified: null
    });

    const [updateData] = useUpdateDataMutation();
    const getTableDataQuery = useGetTableDataQuery();

    useEffect(() => {
        if (data) {
            setValue('name', data.name);
            setValue('age', data.age);
            setValue('isVerified', String(data.isVerified));
        }
    }, [data, setValue]);

    const onSubmit: SubmitHandler<TableData> = async ({ id, name, age, isVerified }) => {
        const updatedData = await updateData({ id: rowId, name, age, isVerified: isVerified.value });

        if (!updatedData.error) {
            await getTableDataQuery.refetch();

            navigate('/table');
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true, maxLength: maxLengthName, minLength: minLengthName }}
            render={({ field }) => <input defaultValue={data!.name} {...field} />}
          />
          <Controller
            name="age"
            control={control}
            rules={{ required: true, min: 17, max: 99 }}
            render={({ field }) => <input defaultValue={data!.age} type="number" {...field} />}
          />
            <Controller
                name="isVerified"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={[
                            { value: "true", label: "true" },
                            { value: "false", label: "false"}
                        ]}
                        placeholder={String(data!.isVerified)}
                    />
                )}
            />

          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => {
                navigate(-1);
            }}
          >
            Cancel
          </button>
        </form>
      )
}
