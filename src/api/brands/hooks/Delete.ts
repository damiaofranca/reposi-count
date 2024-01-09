/* eslint-disable @typescript-eslint/no-explicit-any */
import { brandService } from "..";
import { useMutation } from "react-query";
import { IMutOpts } from "../../../interfacers/common/optionsMutate";
import { IDeleteResponse, IDeleteRequest } from "../../../interfacers/brand";

export const useDeleteBrand = (options?: IMutOpts<IDeleteResponse>) => {
	return useMutation(
		(payload: IDeleteRequest) => brandService.delete(payload),
		options as any,
	);
};
