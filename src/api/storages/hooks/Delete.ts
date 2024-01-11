/* eslint-disable @typescript-eslint/no-explicit-any */
import { storageService } from "..";
import { useMutation } from "react-query";
import { IMutOpts } from "../../../interfacers/common/optionsMutate";
import { IDeleteResponse, IDeleteRequest } from "../../../interfacers/storage";

export const useDeleteStorage = (options?: IMutOpts<IDeleteResponse>) => {
	return useMutation(
		(payload: IDeleteRequest) => storageService.delete(payload),
		options as any,
	);
};
