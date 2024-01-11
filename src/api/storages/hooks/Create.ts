/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";

import { storageService } from "..";
import { IMutOpts } from "../../../interfacers/common/optionsMutate";
import { ICreateResponse, ICreateRequest } from "../../../interfacers/storage";

export const useCreateStorage = (options?: IMutOpts<ICreateResponse>) => {
	return useMutation(
		(payload: ICreateRequest) => storageService.create(payload),
		options as any,
	);
};
