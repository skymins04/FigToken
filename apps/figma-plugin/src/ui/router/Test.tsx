import { useGetTextStyles, useGetVariablesCollections } from "../fetchers";

export const Test = () => {
  const { data: textStyles } = useGetTextStyles();
  const { data: variablesCollections } = useGetVariablesCollections();

  // eslint-disable-next-line no-console
  console.log("text", variablesCollections);

  return <></>;
};
