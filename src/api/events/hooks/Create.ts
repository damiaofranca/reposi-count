/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";

import { eventService } from "..";
import { IMutOpts } from "../../../interfacers/common/optionsMutate";
import { ICreateResponse, ICreateRequest } from "../../../interfacers/event";

export const useCreateEvent = (options?: IMutOpts<ICreateResponse>) => {
	return useMutation(
		(payload: ICreateRequest) => eventService.create(payload),
		options as any,
	);
};
