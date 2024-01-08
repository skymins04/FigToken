import useSWR from "swr";
import { FigmaStyleNestedGroupObject } from "../../../code/styles/styles.service";
import { sendRequestMessage } from "../../../common/message/message-request";

type FetcherKey = readonly [["GET", "/styles/effects"]];

const fetcher = async ([keys]: FetcherKey) => {
  return sendRequestMessage(...keys)
    .then((res) => res.data)
    .catch(() => undefined);
};

export const useGetEffectStyles = () =>
  useSWR<FigmaStyleNestedGroupObject, any, FetcherKey>(
    [["GET", "/styles/effects"]],
    fetcher
  );
