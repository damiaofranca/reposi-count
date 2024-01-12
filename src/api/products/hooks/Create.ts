/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";

import { productService } from "..";
import { IMutOpts } from "../../../interfacers/common/optionsMutate";
import { ICreateResponse, ICreateRequest } from "../../../interfacers/product";

export const useCreateProduct = (options?: IMutOpts<ICreateResponse>) => {
	return useMutation(
		(payload: ICreateRequest) => productService.create(payload),
		options as any,
	);
};
