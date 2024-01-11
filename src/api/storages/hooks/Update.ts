/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";

import { storageService } from "..";
import { IMutOpts } from "../../../interfacers/common/optionsMutate";
import { IUpdateResponse, IUpdateRequest } from "../../../interfacers/storage";

export const useUpdateStorage = (options?: IMutOpts<IUpdateResponse>) => {
	return useMutation(
		(payload: IUpdateRequest) => storageService.update(payload),
		options as any,
	);
};
