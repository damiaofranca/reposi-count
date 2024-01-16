import {
	Autocomplete,
	AutocompleteItem,
	AutocompleteProps,
} from "@nextui-org/react";
import { FC } from "react";
import { useGetAllNoPaginationBrand } from "../../api/brands";

interface ISelectBrandAutoComplete extends Omit<AutocompleteProps, `children`> {
	error?: string;
	touched?: boolean;
	valueSearch: string;
}

export const SelectBrandAutoComplete: FC<ISelectBrandAutoComplete> = ({
	error,
	touched,
	valueSearch,
	...props
}) => {
	const { data, isLoading } = useGetAllNoPaginationBrand({
		filters: {
			no_pagination: true,
			...(valueSearch ? { name: valueSearch } : {}),
		},
	});

	return (
		<Autocomplete
			{...props}
			isLoading={isLoading}
			isInvalid={error && touched ? true : false}
			errorMessage={error && touched ? error : ""}
			onKeyDown={(e: any) => e.continuePropagation()}
			items={(data || []).map((brand) => ({
				label: brand.name,
				value: brand.id,
			}))}
		>
			{(item: any) => (
				<AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
			)}
		</Autocomplete>
	);
};
