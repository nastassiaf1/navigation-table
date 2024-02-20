export type RowTable = {
    id: string,
    [key: string]: string
};

export interface Table {
    id: string;
    userId: string;
    name: string;
    columns: string[];
    rows?: RowTable[];
}
