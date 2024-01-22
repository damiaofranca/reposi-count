import { AxiosError } from "axios";
import { useQuery } from "react-query";

import { storageService } from "..";
import { isFunction } from "../../../utils/checker";
import { IDashboardRequest } from "../../../interfacers/storage";

export const useGetDashboardData = (
	payload: IDashboardRequest | (() => IDashboardRequest),
	onError?: (err: AxiosError<any>) => void,
) => {
	return useQuery(
		["storages-dashboard", isFunction(payload) ? payload() : payload],
		() => storageService.dashboard(isFunction(payload) ? payload() : payload),
		{
			refetchOnWindowFocus: false,
			...(onError ? { onError: onError } : {}),
		},
	);
};
