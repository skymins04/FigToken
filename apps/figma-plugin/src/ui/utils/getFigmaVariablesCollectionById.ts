import { FigmaVariablesCollection } from "src/code/variables/variables.service";

export const getFigmaVariableCollectionById = (
  collections: FigmaVariablesCollection[],
  id: string
) => {
  return collections.find((collection) => collection.id === id);
};
