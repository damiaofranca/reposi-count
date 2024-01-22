import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { FC, Key, useEffect, useState } from "react";

import {
	Modal,
	Button,
	Spinner,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalContent,
} from "@nextui-org/react";

import { useTheme } from "../../hooks";
import { InputNew } from "../InputNew";
import { Form, FormItem } from "./styles";
import { useTransferProduct } from "../../api/products";
import { useDelayQuery } from "../../hooks/useDelayQuery";
import { SelectStorageAutoComplete } from "../SelectStorageAutoComplete";

interface ITransferProduct {
	storage: string;
	onClose: () => void;
	submitFn: () => void;
	product: { id: string; name: string; quantity: string };
}

const initial_values = { transfer_to: "", quantity: 0 };

export const TransferProduct: FC<ITransferProduct> = ({
	product,
	storage,
	onClose,
	submitFn,
}) => {
	const { theme } = useTheme();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [storageInputText, setBrandInputText] = useState<string>("");
	const debouncedStorages = useDelayQuery({
		delay: 800,
		query: storageInputText,
	});

	const { mutateAsync } = useTransferProduct({
		onSuccess: () => {
			toast.success("Produtos transferidos com sucesso.", {
				autoClose: 2000,
				position: "top-right",
			});
			submitFn();
			setIsLoading(false);
			_onClose();
		},
		onError: () => {
			toast.error("Erro ao tranferir produtos.Por favor, tente mais tarde!", {
				autoClose: 3000,
				position: "top-right",
			});
			setIsLoading(false);
			_onClose();
		},
	});

	const _onClose = () => {
		onClose();
	};

	const {
		errors,
		values,
		touched,
		isValid,
		setValues,
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
		initialValues: {
			...initial_values,
			quantity: product.quantity,
		},
		onSubmit: () => {
			onSubmit();
		},
		validationSchema: Yup.object().shape({
			transfer_to: Yup.string().required("Campo obrigatório."),
			quantity: Yup.number()
				.required("Campo obrigatório.")
				.max(Number(product.quantity), "Máximo limite excedido")
				.min(1, "Mínimo limite excedido"),
		}),
	});

	const clearData = () => {
		setValues({ ...initial_values, quantity: product.quantity }, true);
	};

	const onSubmit = async () => {
		setIsLoading(true);
		try {
			await mutateAsync({
				...values,
				id: product.id,
				quantity: String(values.quantity),
			});
		} catch (error) {}
	};

	const onSetProduct = async (text: Key) => {
		setFieldValue("transfer_to", text, false);
		setFieldTouched("transfer_to", true, false);
		setFieldError("transfer_to", undefined);
		setErrors({});
	};

	const onSetProductText = async (text: string) => {
		setBrandInputText(text);
	};

	useEffect(() => {
		validateForm();
	}, []);

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
									<SelectStorageAutoComplete
										label="Estoque"
										storage={storage}
										variant="bordered"
										onBlur={handleBlur}
										valueSearch={debouncedStorages}
										onInputChange={onSetProductText}
										onSelectionChange={onSetProduct}
										placeholder="Selecionar estoque"
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
										Transferir
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
