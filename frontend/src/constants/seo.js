export const BASE_URL = "https://www.paradisevattavada.com";

export const getCanonicalUrl = (path) => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${BASE_URL}/${cleanPath}`;
};
