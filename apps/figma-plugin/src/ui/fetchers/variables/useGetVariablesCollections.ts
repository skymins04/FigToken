import useSWR from "swr";
import { sendRequestMessage } from "../../../common/message/message-request";
import { FigmaVariablesCollection } from "../../../code/variables/variables.service";

type FetcherKey = readonly [["GET", "/variables/collections"]];

const fetcher = async ([keys]: FetcherKey) => {
  return sendRequestMessage(...keys)
    .then((res) => res.data)
    .catch(() => undefined);
};

export const useGetVariablesCollections = () =>
  useSWR<FigmaVariablesCollection[], any, FetcherKey>(
    [["GET", "/variables/collections"]],
    fetcher
  );
