import { NestedGroupObject, addDataToObjectByPath } from "../utils";

export type FigmaVariablesCollection = {
  id: string;
  defaultModeId: string;
  hiddenFromPublishing: boolean;
  key: string;
  modes: {
    modeId: string;
    name: string;
  }[];
  name: string;
  remote: boolean;
  variables: NestedGroupObject<Variable>;
};

export class VariablesService {
  private getVariableById(id: string) {
    const variable = figma.variables.getVariableById(id);
    if (!variable) return null;

    return {
      id: variable.id,
      codeSyntax: variable.codeSyntax,
      description: variable.description,
      hiddenFromPublishing: variable.hiddenFromPublishing,
      key: variable.key,
      name: variable.name,
      remote: variable.remote,
      resolvedType: variable.resolvedType,
      scopes: variable.scopes,
      valuesByMode: variable.valuesByMode,
      variableCollectionId: variable.variableCollectionId,
    };
  }

  getVariablesCollections() {
    const collections: FigmaVariablesCollection[] = figma.variables
      .getLocalVariableCollections()
      .map((collection) => {
        const variables = collection.variableIds
          .map(this.getVariableById)
          .filter((variable) => variable !== null) as Variable[];

        const groupedObject: NestedGroupObject<Variable> = {};
        variables.forEach((variable) => {
          const splitedName = variable.name.split("/");
          addDataToObjectByPath(groupedObject, splitedName, {
            ...variable,
            name: splitedName[splitedName.length - 1],
          });
        });

        return {
          id: collection.id,
          defaultModeId: collection.defaultModeId,
          hiddenFromPublishing: collection.hiddenFromPublishing,
          key: collection.key,
          modes: collection.modes,
          name: collection.name,
          remote: collection.remote,
          variables: groupedObject,
        };
      });

    return collections;
  }
}
