import { eventService } from "..";
import { useQuery } from "react-query";
import { isFunction } from "../../../utils/checker";
import { IGetOneRequest } from "../../../interfacers/event";

export const useGetOneEvent = (
	payload: IGetOneRequest | (() => IGetOneRequest),
) => {
	return useQuery(
		["events-unique", isFunction(payload) ? payload() : payload],
		() => eventService.getOne(isFunction(payload) ? payload() : payload),
		{
			refetchOnWindowFocus: false,
		},
	);
};
