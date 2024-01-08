import { useQuery } from "react-query";

import { eventService } from "..";
import { IGetAllRequest } from "../../../interfacers/event";
import { isFunction } from "../../../utils/checker";

export const useGetAllEvent = (
	payload: IGetAllRequest | (() => IGetAllRequest),
) => {
	return useQuery(
		["events", isFunction(payload) ? payload() : payload],
		() => eventService.getAll(isFunction(payload) ? payload() : payload),
		{
			refetchOnWindowFocus: false,
		},
	);
};
