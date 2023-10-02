export function keyIsInArrayOfLocalStorageKeys(key: string){
  const localStorageKeys: any[] = ['user', 'tokens'];
  return localStorageKeys.some(localStorageKey => localStorageKey === key);
}
