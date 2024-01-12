import { productService } from "..";
import { useQuery } from "react-query";
import { isFunction } from "../../../utils/checker";
import { IGetOneRequest } from "../../../interfacers/product";

export const useGetOneProduct = (
	payload: IGetOneRequest | (() => IGetOneRequest),
) => {
	return useQuery(
		["products-unique", isFunction(payload) ? payload() : payload],
		() => productService.getOne(isFunction(payload) ? payload() : payload),
		{
			refetchOnWindowFocus: false,
		},
	);
};
