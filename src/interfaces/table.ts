export interface TableData {
    id?: string;
    name: string;
    age: number;
    isVerified: boolean;
}

export interface Table {
    id: string;
    userId: string;
    name: string;
    columns: string[];
}
