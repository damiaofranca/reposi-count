/* eslint-disable @typescript-eslint/no-explicit-any */
import { eventService } from "..";
import { useMutation } from "react-query";
import { IMutOpts } from "../../../interfacers/common/optionsMutate";
import { IDeleteGuestRequest, IDeleteGuestResponse } from "../../../interfacers/event";

export const useDeleteGuest = (options?: IMutOpts<IDeleteGuestResponse>) => {
	return useMutation(
		(payload: IDeleteGuestRequest) => eventService.deleteGuest(payload),
		options as any,
	);
};
