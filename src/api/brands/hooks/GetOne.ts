import { brandService } from "..";
import { useQuery } from "react-query";
import { isFunction } from "../../../utils/checker";
import { IGetOneRequest } from "../../../interfacers/brand";

export const useGetOneBrand = (
	payload: IGetOneRequest | (() => IGetOneRequest),
) => {
	return useQuery(
		["brands-unique", isFunction(payload) ? payload() : payload],
		() => brandService.getOne(isFunction(payload) ? payload() : payload),
		{
			refetchOnWindowFocus: false,
		},
	);
};
