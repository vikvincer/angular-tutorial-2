export const clearSession = (key: string): void => {
    sessionStorage.removeItem(key);
}