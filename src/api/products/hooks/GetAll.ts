import { AxiosError } from "axios";
import { useQuery } from "react-query";

import { productService } from "..";
import { isFunction } from "../../../utils/checker";
import { IGetAllRequest } from "../../../interfacers/product";

export const useGetAllProduct = (
	payload: IGetAllRequest | (() => IGetAllRequest),
	onError?: (err: AxiosError<any>) => void,
) => {
	return useQuery(
		["products", isFunction(payload) ? payload() : payload],
		() => productService.getAll(isFunction(payload) ? payload() : payload),
		{
			refetchOnWindowFocus: false,
			...(onError ? { onError: onError } : {}),
		},
	);
};
