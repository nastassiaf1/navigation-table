import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import mockData from './data';
import { environment } from 'env/env';

export const handlers = [
    http.get(`${environment.apiUrl}/data`, () => {
        return HttpResponse.json(mockData);
    }),
    http.post('/api/updateData', ({ params }) => {
        const updatedItem = mockData.find(item => item.id === params.id)
        return HttpResponse.json(updatedItem);
    }),
];

export const server = setupServer(...handlers);
