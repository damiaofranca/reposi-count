import { useQuery } from "react-query";

import { brandService } from "..";
import { IGetAllRequest } from "../../../interfacers/brand";
import { isFunction } from "../../../utils/checker";

export const useGetAllBrand = (
	payload: IGetAllRequest | (() => IGetAllRequest),
) => {
	return useQuery(
		["brands", isFunction(payload) ? payload() : payload],
		() => brandService.getAll(isFunction(payload) ? payload() : payload),
		{
			refetchOnWindowFocus: false,
		},
	);
};
