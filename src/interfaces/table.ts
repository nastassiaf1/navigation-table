export type TableRow = {
    id: string,
    [key: string]: string
};

export type TableColumn = {
    id: string,
    name: string,
}

export interface Table {
    id: string;
    userId: string;
    name: string;
    columns: TableColumn[];
    rows?: TableRow[];
}
