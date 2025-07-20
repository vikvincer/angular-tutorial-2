export const getSession = (key: string) => {
    return sessionStorage.getItem(key);
}