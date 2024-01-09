/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";

import { brandService } from "..";
import { IMutOpts } from "../../../interfacers/common/optionsMutate";
import { ICreateResponse, ICreateRequest } from "../../../interfacers/brand";

export const useCreateBrand = (options?: IMutOpts<ICreateResponse>) => {
	return useMutation(
		(payload: ICreateRequest) => brandService.create(payload),
		options as any,
	);
};
