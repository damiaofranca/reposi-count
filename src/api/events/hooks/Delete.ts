/* eslint-disable @typescript-eslint/no-explicit-any */
import { eventService } from "..";
import { useMutation } from "react-query";
import { IMutOpts } from "../../../interfacers/common/optionsMutate";
import { IDeleteResponse, IDeleteRequest } from "../../../interfacers/event";

export const useDeleteEvent = (options?: IMutOpts<IDeleteResponse>) => {
	return useMutation(
		(payload: IDeleteRequest) => eventService.delete(payload),
		options as any,
	);
};
