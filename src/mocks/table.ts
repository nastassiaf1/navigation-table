import { Table } from "interfaces/table";
import mockUsers from "./user";

const mockTables: Table[] = [
    {
        id: '1',
        name: 'Test 1',
        columns: [
            {
                id: 'column1',
                name: 'column 1',
            },
            {
                id: 'column2',
                name: 'column 2',
            }
        ],
        rows: [
            {
                id: 'row1',
                'column 1': 'row 1',
                'column 2': '',
            },
            {
                id: 'row2',
                'column 1': 'row 2',
                'column 2': 'row 2',
            }
        ],
        userId: mockUsers[0].id
    },
    { id: '2', name: 'Test 2', columns: [], rows: [], userId: mockUsers[0].id },
];

export default mockTables;
