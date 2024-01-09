/* eslint-disable @typescript-eslint/no-explicit-any */
import { brandService } from "..";
import { useMutation } from "react-query";
import { IMutOpts } from "../../../interfacers/common/optionsMutate";
import {
	IDeleteGuestRequest,
	IDeleteGuestResponse,
} from "../../../interfacers/brand";

export const useDeleteGuest = (options?: IMutOpts<IDeleteGuestResponse>) => {
	return useMutation(
		(payload: IDeleteGuestRequest) => brandService.deleteGuest(payload),
		options as any,
	);
};
