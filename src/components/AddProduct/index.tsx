import React, { Key, memo, useMemo } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import {
	Modal,
	Button,
	Spinner,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalContent,
	Select,
	SelectItem,
} from "@nextui-org/react";

import { useTheme } from "../../hooks";
import { InputNew } from "../InputNew";
import { queryClient } from "../../api";
import { Form, FormItem } from "./styles";
import RegisterProductSchema from "./schema";
import { useCreateProduct } from "../../api/products";
import { useDelayQuery } from "../../hooks/useDelayQuery";
import { ICreateRequest } from "../../interfacers/product";
import { SelectBrandAutoComplete } from "../SelectBrandAutoComplete";

interface IAddProduct {
	storage: string;
	onClose: () => void;
	onSubmitFn: () => void;
}

const optsQuantity = ["KG", "UNI", "LTS", "LOTES"];

const initial_values: Omit<ICreateRequest, "storage"> = {
	name: "",
	brand: "",
	quantity: "",
	type_of_product: "",
	type_of_quantity: "LOTES",
};

export const AddProduct: React.FC<IAddProduct> = ({
	storage,
	onSubmitFn,
	onClose,
}) => {
	const { theme } = useTheme();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [brandInputText, setBrandInputText] = React.useState<string>("");
	const debouncedBrands = useDelayQuery({ delay: 600, query: brandInputText });

	const { mutateAsync } = useCreateProduct({
		onSuccess: () => {
			toast.success("Produtos cadastrados com sucesso.", {
				autoClose: 2000,
				position: "top-right",
			});
			onSubmitFn();
			setIsLoading(false);
			onClose();
			resetForm();
		},
		onError: () => {
			toast.error("Erro ao cadastrar produtos.Por favor, tente mais tarde!", {
				autoClose: 3000,
				position: "top-right",
			});
			setIsLoading(false);
			onClose();
		},
	});

	const {
		errors,
		values,
		touched,
		isValid,
		setValues,
		resetForm,
		setErrors,
		handleBlur,
		handleSubmit,
		handleChange,
		validateForm,
		setFieldValue,
		setFieldError,
		setFieldTouched,
	} = useFormik({
		validateOnBlur: true,
		validateOnChange: true,
		enableReinitialize: true,
		initialValues: initial_values,
		onSubmit: () => {
			onSubmit();
		},
		validationSchema: RegisterProductSchema,
	});

	const clearData = () => {
		setValues(initial_values, true);
	};

	const onSubmit = async () => {
		setIsLoading(true);
		try {
			await mutateAsync({ ...values, storage });
		} catch (error) {}
	};

	const onSetBrand = async (text: Key) => {
		setFieldValue("brand", text, false);
		setFieldTouched("brand", true, false);
		setFieldError("brand", undefined);
		setErrors({});
	};

	const onSetBrandText = async (text: string) => {
		setBrandInputText(text);
	};

	React.useEffect(() => {
		validateForm();
	}, []);

	const SelectBrandMemo = useMemo(
		() =>
			memo(() => (
				<SelectBrandAutoComplete
					variant="bordered"
					onBlur={handleBlur}
					label="Marca do produto"
					valueSearch={debouncedBrands}
					onInputChange={onSetBrandText}
					onSelectionChange={onSetBrand}
					placeholder="Selecionar marca do produto"
				/>
			)),
		[debouncedBrands],
	);

	return (
		<Modal isOpen={true} placement={"center"} onOpenChange={onClose}>
			<ModalContent className={theme === "dark" ? "bg-[#313131]" : ""}>
				{() => (
					<>
						<ModalHeader
							className={`flex flex-col gap-1 ${
								theme === "dark" ? "text-[#fff]" : "text-[#4f4f4f]"
							}`}
						>
							Cadastrar produtos
						</ModalHeader>
						<ModalBody>
							<Form onSubmit={handleSubmit}>
								<FormItem>
									<InputNew
										name="name"
										label="Nome"
										variant="bordered"
										onBlur={handleBlur}
										value={values.name}
										onChange={handleChange}
										placeholder="Digite o nome do produto"
										isInvalid={errors.name && touched.name ? true : false}
										errorMessage={
											errors.name && touched.name ? errors.name : ""
										}
									/>
								</FormItem>
								<FormItem>
									<SelectBrandMemo />
								</FormItem>
								<FormItem>
									<InputNew
										variant="bordered"
										onBlur={handleBlur}
										name="type_of_product"
										label="Tipo de produto"
										onChange={handleChange}
										value={values.type_of_product}
										placeholder="Digite o tipo do produto"
										isInvalid={
											errors.type_of_product && touched.type_of_product
												? true
												: false
										}
										errorMessage={
											errors.type_of_product && touched.type_of_product
												? errors.type_of_product
												: ""
										}
									/>
								</FormItem>
								<FormItem>
									<InputNew
										type="number"
										name="quantity"
										label="Quantidade"
										variant="bordered"
										onBlur={handleBlur}
										value={values.quantity}
										onChange={handleChange}
										placeholder="Digite o quantidade do produto"
										isInvalid={
											errors.quantity && touched.quantity ? true : false
										}
										errorMessage={
											errors.quantity && touched.quantity ? errors.quantity : ""
										}
									/>
								</FormItem>
								<FormItem>
									<Select
										variant="bordered"
										onBlur={handleBlur}
										name="type_of_quantity"
										onChange={handleChange}
										label="Selecione o tipo de quantidade"
										defaultSelectedKeys={[initial_values.type_of_quantity]}
									>
										{optsQuantity.map((type) => (
											<SelectItem key={type} value={type}>
												{type}
											</SelectItem>
										))}
									</Select>
								</FormItem>

								<ModalFooter style={{ paddingRight: 0 }}>
									<Button color="danger" variant="shadow" onPress={clearData}>
										Limpar campos
									</Button>
									<Button
										type="submit"
										color="primary"
										variant="shadow"
										isDisabled={!isValid}
										isLoading={isLoading}
										spinner={<Spinner size="sm" color="danger" />}
									>
										Cadastrar
									</Button>
								</ModalFooter>
							</Form>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
