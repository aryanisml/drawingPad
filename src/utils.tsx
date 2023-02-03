export function loadFromLocalStorage(localStorageKey : any) {
    if (localStorage.getItem(localStorageKey)) {
      return JSON.parse(localStorage.getItem(localStorageKey) || '');
    }
  }