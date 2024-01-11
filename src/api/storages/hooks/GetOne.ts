import { storageService } from "..";
import { useQuery } from "react-query";
import { isFunction } from "../../../utils/checker";
import { IGetOneRequest } from "../../../interfacers/storage";

export const useGetOneStorage = (
	payload: IGetOneRequest | (() => IGetOneRequest),
) => {
	return useQuery(
		["storages-unique", isFunction(payload) ? payload() : payload],
		() => storageService.getOne(isFunction(payload) ? payload() : payload),
		{
			refetchOnWindowFocus: false,
		},
	);
};
