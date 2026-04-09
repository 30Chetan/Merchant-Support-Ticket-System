/* API service — wraps fetch calls to the backend */

const BASE = '/api/tickets';

const handleResponse = async (res) => {
    const data = await res.json();
    if (!res.ok) {
        const msg = data.message || 'Something went wrong';
        throw new Error(msg);
    }
    return data;
};

export const api = {
    /* GET /api/tickets?status=&priority= */
    getTickets: (params = {}) => {
        const query = new URLSearchParams(
            Object.fromEntries(Object.entries(params).filter(([, v]) => v))
        ).toString();
        return fetch(`${BASE}${query ? `?${query}` : ''}`).then(handleResponse);
    },

    /* POST /api/tickets */
    createTicket: (body) =>
        fetch(BASE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(handleResponse),

    /* PATCH /api/tickets/:id */
    updateStatus: (id, status) =>
        fetch(`${BASE}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        }).then(handleResponse),
};
