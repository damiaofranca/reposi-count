import React from "react";
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
} from "@nextui-org/react";

import RegisterBrandSchema from "./schema";

import { useTheme } from "../../hooks";
import { InputNew } from "../InputNew";

import { Form, FormItem } from "./styles";
import { useCreateBrand } from "../../api/brands";
import { queryClient } from "../../api";

interface IAddBrand {
	onClose: () => void;
}

export const AddBrand: React.FC<IAddBrand> = ({ onClose }) => {
	const { theme } = useTheme();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutateAsync } = useCreateBrand({
		onSuccess: () => {
			toast.success("Marca cadastrada com sucesso.", {
				autoClose: 2000,
				position: "top-right",
			});
			queryClient.invalidateQueries(`brands`);
			setIsLoading(false);
			onClose();
			resetForm();
		},
		onError: (error: any) => {
			toast.error(
				error.response.data.statusCode === 401
					? "Somente administradores podem adicionar marcas."
					: "Erro ao cadastrar marca.",
				{
					autoClose: 3000,
					position: "top-right",
				},
			);
			setIsLoading(false);
			onClose();
		},
	});

	const initial_values = {
		name: "",
		cnpj: "",
	};

	const {
		errors,
		values,
		touched,
		isValid,
		setValues,
		resetForm,
		handleBlur,
		handleSubmit,
		handleChange,
		validateForm,
	} = useFormik({
		enableReinitialize: true,
		initialValues: initial_values,
		onSubmit: () => {
			onSubmit();
		},
		validationSchema: RegisterBrandSchema,
	});

	const clearData = () => {
		setValues(initial_values, true);
	};

	const onSubmit = async () => {
		setIsLoading(true);
		try {
			await mutateAsync({ cnpj: values.cnpj, name: values.name });
		} catch (error) {}
	};

	React.useEffect(() => {
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
							Cadastrar marca
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
										placeholder="Digite o nome da marca"
										isInvalid={errors.name && touched.name ? true : false}
										errorMessage={
											errors.name && touched.name ? errors.name : ""
										}
									/>
								</FormItem>
								<FormItem>
									<InputNew
										name="cnpj"
										label="CNPJ"
										variant="bordered"
										onBlur={handleBlur}
										value={values.cnpj}
										onChange={handleChange}
										placeholder="Digite o CNPJ da empresa"
										isInvalid={errors.cnpj && touched.cnpj ? true : false}
										errorMessage={
											errors.cnpj && touched.cnpj ? errors.cnpj : ""
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
