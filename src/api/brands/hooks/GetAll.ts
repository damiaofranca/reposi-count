import { useQuery } from "react-query";

import { brandService } from "..";
import {
	IGetAllNoPaginationRequest,
	IGetAllRequest,
} from "../../../interfacers/brand";
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

export const useGetAllNoPaginationBrand = (
	payload: IGetAllRequest | (() => IGetAllNoPaginationRequest),
) => {
	return useQuery(
		["brands-no-pagination", isFunction(payload) ? payload() : payload],
		() =>
			brandService.getAllWithNoPagination(
				isFunction(payload) ? payload() : payload,
			),
		{
			refetchOnWindowFocus: false,
		},
	);
};
