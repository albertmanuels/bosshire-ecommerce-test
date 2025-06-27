export const setLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
} 

export const getLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  if (item === null) {
    return null;
  }
  
  const result = JSON.parse(item);
  return result;
}