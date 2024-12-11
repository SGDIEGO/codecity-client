export function savelocal(key: string, value: string) {
    const jsonValue = JSON.stringify(value)
    localStorage.setItem(key, jsonValue);
}

export function getLocal<T>(key: string): T {
    const jsonValue = localStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
}

export function removeLocal(key: string) {
    localStorage.removeItem(key);
}