
export const TOKEN_STORAGE_KEY = "TOKEN_STORAGE_KEY"
export const USER_STORAGE_KEY = "USER_STORAGE_KEY"
export const USER_INFO_KEY = "USER_INFO_KEY"

export const getValue = (key, initialValue) => {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue;
    if (initialValue instanceof Function) return initialValue();
    return initialValue;
}
export const saveValue = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}
export const removeValue = (key) => {
    localStorage.removeItem(key)
}

const LocalStorage = {
    getValue, saveValue, removeValue
}

export default LocalStorage;