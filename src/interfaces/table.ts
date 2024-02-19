/*
draft
export interface TableData {
    id?: string;
    name: string;
    age: number;
    isVerified: boolean;
}
*/

type RowTable = {
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
