import { FigmaVariablesGroups } from "@ui/hooks";
import { getFigmaVariableValue } from "@ui/utils";

export const getColorTokenVariablesTableData = (
  modes: {
    modeId: string;
    name: string;
  }[],
  groups: FigmaVariablesGroups,
  selectedGroup?: string
) => {
  const entries = Object.entries(selectedGroup ? groups[selectedGroup] : {});
  return entries.map(([name, { variable }]) => {
    const data: any = {};
    data["name"] = name;
    data["type"] = variable.resolvedType;
    modes.forEach(({ modeId }) => {
      data[modeId] = getFigmaVariableValue(
        variable.resolvedType,
        variable.valuesByMode[modeId]
      );
    });

    return data;
  });
};
