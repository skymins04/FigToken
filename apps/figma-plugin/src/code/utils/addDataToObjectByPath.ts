export type NestedGroupObject<T> = {
  [key: string]: T | NestedGroupObject<T>;
};

export const addDataToObjectByPath = <T>(obj: any, path: string[], data: T) => {
  if (path.length > 1) {
    if (!obj[path[0]]) {
      obj[path[0]] = {};
    }
    addDataToObjectByPath(obj[path[0]], path.slice(1), data);
  } else {
    obj[path[0]] = data;
    return obj;
  }
};
