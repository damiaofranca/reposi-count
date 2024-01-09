/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";

import { brandService } from "..";
import { IMutOpts } from "../../../interfacers/common/optionsMutate";
import { IUpdateResponse, IUpdateRequest } from "../../../interfacers/brand";

export const useUpdateBrand = (options?: IMutOpts<IUpdateResponse>) => {
	return useMutation(
		(payload: IUpdateRequest) => brandService.update(payload),
		options as any,
	);
};
