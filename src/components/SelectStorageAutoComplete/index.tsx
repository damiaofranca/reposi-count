import {
	Autocomplete,
	AutocompleteItem,
	AutocompleteProps,
} from "@nextui-org/react";
import { FC } from "react";
import { useGetAllStorage } from "../../api/storages";

interface ISelectStorageAutoComplete
	extends Omit<AutocompleteProps, `children`> {
	error?: string;
	touched?: boolean;
	valueSearch: string;
	storage: string;
}

export const SelectStorageAutoComplete: FC<ISelectStorageAutoComplete> = ({
	error,
	touched,
	storage,
	valueSearch,
	...props
}) => {
	const { data, isLoading } = useGetAllStorage({
		filters: {
			...(valueSearch ? { identifier: valueSearch } : {}),
		},
	});

	return (
		<Autocomplete
			{...props}
			isLoading={isLoading}
			isInvalid={error && touched ? true : false}
			errorMessage={error && touched ? error : ""}
			onKeyDown={(e: any) => e.continuePropagation()}
			items={(data?.items || [])
				.filter((product) => product.id !== storage)
				.map((product) => ({
					label: product.identifier,
					value: product.id,
				}))}
		>
			{(item: any) => (
				<AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
			)}
		</Autocomplete>
	);
};
