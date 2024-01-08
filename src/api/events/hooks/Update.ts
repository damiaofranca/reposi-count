/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";

import { eventService } from "..";
import { IMutOpts } from "../../../interfacers/common/optionsMutate";
import { IUpdateResponse, IUpdateRequest } from "../../../interfacers/event";

export const useUpdateEvent = (options?: IMutOpts<IUpdateResponse>) => {
	return useMutation(
		(payload: IUpdateRequest) => eventService.update(payload),
		options as any,
	);
};
