/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";

import { productService } from "..";
import { IMutOpts } from "../../../interfacers/common/optionsMutate";
import {
	ITransferRequest,
	ITransferResponse,
} from "../../../interfacers/product";

export const useTransferProduct = (options?: IMutOpts<ITransferResponse>) => {
	return useMutation(
		(payload: ITransferRequest) => productService.transfer(payload),
		options as any,
	);
};
