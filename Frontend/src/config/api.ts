export const API_BASE = "/api";

export const BOOKS = {
    GET_ALL: `${API_BASE}/book`,
    ADD: `${API_BASE}/book`,
    UPDATE: (id: string) => `${API_BASE}/book/${id}`,
    DELETE: (id: string) => `${API_BASE}/book/${id}`,
    GET_SINGLE: (id: string) => `${API_BASE}/book/${id}`
};
