export type RowTable = {
    id: string,
    [key: string]: string
};

export type ColumnTable = {
    id: string,
    name: string,
}

export interface Table {
    id: string;
    userId: string;
    name: string;
    columns: ColumnTable[];
    rows?: RowTable[];
}
