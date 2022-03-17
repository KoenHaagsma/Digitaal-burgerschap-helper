async function fetchData(url, fallbackUrl, config) {
    try {
        let res = await fetch(`${url}`, config);
        return await res.json();
    } catch (error) {
        let res = await fetch(`${fallbackUrl}`, config);
        return await res.json();
    }
}

export { fetchData };
