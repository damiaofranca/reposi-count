import { UseMutationOptions } from "react-query";

export interface IRequestCatchData<_T = string> {
	message: _T;
}

export type IMutOpts<T, E = IRequestCatchData> = Omit<
	UseMutationOptions<T, E, void, unknown>,
	"mutationFn" | "mutationKey"
>;
