import { DataTable, VariableAndStyleTokensPageLayout } from "@ui/components";
import { getColorTokenVariablesTableColumns } from "./getColorTokenVariablesTableColumns";
import { getColorTokenVariablesTableData } from "./getColorTokenVariablesTableData";
import { useVariablesCollection } from "@ui/hooks";

const COLOR_TOKEN_VARIABLE_COLLECTION_STORE_KEY = "color";

const ColorTokenVariableTabRenderer = () => {
  const { selectedCollection } = useVariablesCollection(
    COLOR_TOKEN_VARIABLE_COLLECTION_STORE_KEY,
    (variable) => variable.resolvedType === "COLOR"
  );

  if (!selectedCollection) return;
  const { collection, groups, selectedGroup } = selectedCollection;

  const columns = getColorTokenVariablesTableColumns(collection.modes);
  const data = getColorTokenVariablesTableData(
    collection.modes,
    groups,
    selectedGroup
  );
  const rowSelection = selectedGroup
    ? Object.fromEntries(
        Object.entries(groups[selectedGroup]).map(([key, value]) => [
          key,
          value.select,
        ])
      )
    : {};

  // eslint-disable-next-line no-console
  console.log("test log", rowSelection);

  return (
    <DataTable
      className="mb-4"
      columns={columns}
      idColumnName="name"
      data={data}
      rowSelection={rowSelection}
    />
  );
};

export const ColorTokenPage = () => {
  return (
    <VariableAndStyleTokensPageLayout
      title="Color Tokens"
      collectionKey={COLOR_TOKEN_VARIABLE_COLLECTION_STORE_KEY}
      filterSelectCollectionVariable={(variable) =>
        variable.resolvedType === "COLOR"
      }
      placeholder={{
        emptyGroups: "Not Found Color Variable Groups...",
      }}
      renderVariableTab={ColorTokenVariableTabRenderer}
    />
  );
};
