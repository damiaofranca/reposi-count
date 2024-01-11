import { AxiosError } from "axios";
import { useQuery } from "react-query";

import { storageService } from "..";
import { isFunction } from "../../../utils/checker";
import { IGetAllRequest } from "../../../interfacers/storage";

export const useGetAllStorage = (
	payload: IGetAllRequest | (() => IGetAllRequest),
	onError?: (err: AxiosError<any>) => void,
) => {
	return useQuery(
		["storages", isFunction(payload) ? payload() : payload],
		() => storageService.getAll(isFunction(payload) ? payload() : payload),
		{
			refetchOnWindowFocus: false,
			...(onError ? { onError: onError } : {}),
		},
	);
};
