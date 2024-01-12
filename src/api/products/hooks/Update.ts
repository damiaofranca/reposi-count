/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";

import { productService } from "..";
import { IMutOpts } from "../../../interfacers/common/optionsMutate";
import { IUpdateResponse, IUpdateRequest } from "../../../interfacers/product";

export const useUpdateProduct = (options?: IMutOpts<IUpdateResponse>) => {
	return useMutation(
		(payload: IUpdateRequest) => productService.update(payload),
		options as any,
	);
};
