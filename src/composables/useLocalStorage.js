const useLocalStorage = storeName => {
  const save = item => localStorage.setItem(storeName, JSON.stringify(item));
  const load = () => {
    let item = localStorage.getItem(storeName);
    if (item) {
      return JSON.parse(item);
    }
    return item;
  };
  const clear = () => localStorage.removeItem(storeName);
  return {
    save,
    load,
    clear
  };
};

export default useLocalStorage;
