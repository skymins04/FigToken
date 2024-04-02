import { NestedGroupObject } from "src/code/utils";

export const getPathGroupFromVariablesGroupObject = (
  obj: NestedGroupObject<Variable>,
  variableFilter?: (variable: Variable) => boolean
) => {
  const result: {
    [path: string]: Record<string, { variable: Variable; select: boolean }>;
  } = {};
  const stack: {
    obj: NestedGroupObject<Variable>;
    key: string;
    path: string;
    basePath: string | null;
  }[] = Object.keys(obj).map((key) => ({
    obj,
    key,
    path: key,
    basePath: null,
  }));

  while (stack.length > 0) {
    const task = stack.pop();
    if (!task) break;

    const { obj, key, path, basePath } = task;
    if (!obj[key].id) {
      for (const nestedKey in obj[key]) {
        const nestedPath = `${path}/${nestedKey}`;
        stack.push({
          obj: obj[key] as NestedGroupObject<Variable>,
          key: nestedKey,
          path: nestedPath,
          basePath: path,
        });
      }
    } else if (
      !variableFilter ||
      variableFilter(obj[key] as unknown as Variable)
    ) {
      if (basePath) {
        result[basePath] = {
          ...result[basePath],
          [key]: { variable: obj[key] as unknown as Variable, select: true },
        };
      } else {
        result[key] = {
          [key]: { variable: obj[key] as unknown as Variable, select: true },
        };
      }
    }
  }

  return result;
};
