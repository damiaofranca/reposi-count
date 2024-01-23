import { AxiosError } from "axios";
import { useQuery } from "react-query";

import { storageService } from "..";
import { isFunction } from "../../../utils/checker";
import { IDashboardRequest } from "../../../interfacers/storage";

export const useTransactionHistoric = (
	payload: IDashboardRequest | (() => IDashboardRequest),
	onError?: (err: AxiosError<any>) => void,
) => {
	return useQuery(
		["transaction-historic", isFunction(payload) ? payload() : payload],
		() =>
			storageService.transactionHistoric(
				isFunction(payload) ? payload() : payload,
			),
		{
			refetchOnWindowFocus: false,
			...(onError ? { onError: onError } : {}),
		},
	);
};
