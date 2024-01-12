/* eslint-disable @typescript-eslint/no-explicit-any */
import { productService } from "..";
import { useMutation } from "react-query";
import { IMutOpts } from "../../../interfacers/common/optionsMutate";
import { IDeleteResponse, IDeleteRequest } from "../../../interfacers/product";

export const useDeleteProduct = (options?: IMutOpts<IDeleteResponse>) => {
	return useMutation(
		(payload: IDeleteRequest) => productService.delete(payload),
		options as any,
	);
};
