export const setSession = (key: string, data: string): void => {
    sessionStorage.setItem(key, data);
}