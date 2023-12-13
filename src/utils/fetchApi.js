export const fetchApi = async (url, method, body, ...params) => {
    return await fetch(url, { method, body: JSON.stringify(body), ...params });
};
