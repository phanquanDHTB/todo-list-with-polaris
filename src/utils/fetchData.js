export const fetchData = async (url = "", method = "GET", body, ...params) => {
    const res = await fetch(url, { method, body: JSON.stringify(body), ...params });
    const status = res.status;
    const data = await res.json();
    return { status, data: data.data };
};
