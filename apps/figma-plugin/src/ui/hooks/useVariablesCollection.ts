import useSWRImmutable from "swr/immutable";
import { useGetVariablesCollections } from "@ui/fetchers";
import { useCallback, useMemo } from "react";
import { FigmaVariablesCollection } from "src/code/variables/variables.service";
import { getPathGroupFromVariablesGroupObject } from "@ui/utils";

export type FigmaVariablesGroup = Record<
  string,
  { variable: Variable; select: boolean }
>;

export type FigmaVariablesGroups = {
  [path: string]: FigmaVariablesGroup;
};

export type FigmaSelectedVariablesCollection = {
  collection: FigmaVariablesCollection;
  groups: FigmaVariablesGroups;
  selectedGroup?: string;
};

export const useVariablesCollection = (
  key: string,
  filterSelectCollectionVariable?: (variable: Variable) => boolean
) => {
  const { data: selectedCollection, mutate: setSelectedCollection } =
    useSWRImmutable<FigmaSelectedVariablesCollection>(
      ["useSelectedVariablesCollection", key],
      null
    );
  const { data: collections = [] } = useGetVariablesCollections();

  const filteredCollections = useMemo(() => {
    // eslint-disable-next-line no-console
    console.log("test3");
    return collections.map((collection) => ({
      ...collection,
      id: collection.id.toLowerCase(),
    }));
  }, [collections]);

  const selectCollection = useCallback(
    (id?: string) => {
      if (!id) {
        setSelectedCollection(undefined);
      } else {
        const collection = filteredCollections.find(
          (collection) => collection.id === id
        );
        if (collection) {
          setSelectedCollection({
            collection,
            groups: getPathGroupFromVariablesGroupObject(
              collection.variables,
              filterSelectCollectionVariable
            ),
          });
        }
      }
    },
    [filteredCollections]
  );

  const selectGroup = (groupKey: string) => {
    if (selectedCollection?.groups[groupKey]) {
      // eslint-disable-next-line no-console
      console.log("test1", selectedCollection);
      setSelectedCollection({
        ...selectedCollection,
        selectedGroup: groupKey,
      });
      // eslint-disable-next-line no-console
      console.log("test2");
    }
  };

  const setSelectVariable = (
    groupKey: string,
    variableKey: string,
    select: boolean
  ) => {
    if (selectedCollection?.groups[groupKey]?.[variableKey]) {
      setSelectedCollection({
        ...selectedCollection,
        groups: {
          ...selectedCollection.groups,
          [groupKey]: {
            ...selectedCollection.groups[groupKey],
            [variableKey]: {
              ...selectedCollection.groups[groupKey][variableKey],
              select,
            },
          },
        },
      });
    }
  };

  const toggleSelectVariable = (groupKey: string, variableKey: string) => {
    if (selectedCollection?.groups[groupKey]?.[variableKey]) {
      setSelectedCollection({
        ...selectedCollection,
        groups: {
          ...selectedCollection.groups,
          [groupKey]: {
            ...selectedCollection.groups[groupKey],
            [variableKey]: {
              ...selectedCollection.groups[groupKey][variableKey],
              select: !selectedCollection.groups[groupKey][variableKey].select,
            },
          },
        },
      });
    }
  };

  return {
    collections: filteredCollections,
    selectedCollection,
    selectCollection,
    selectGroup,
    setSelectVariable,
    toggleSelectVariable,
  };
};
