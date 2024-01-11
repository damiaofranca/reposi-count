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

import RegisterStorageSchema from "./schema";

import { useTheme } from "../../hooks";
import { InputNew } from "../InputNew";

import { Form, FormItem } from "./styles";
import { useCreateStorage } from "../../api/storages";

interface IAddStorage {
	onClose: () => void;
}

const initial_values = {
	cep: "",
	city: "",
	state: "",
	street: "",
	identifier: "",
	numberStorage: 0,
};

export const AddStorage: React.FC<IAddStorage> = ({ onClose }) => {
	const { theme } = useTheme();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutateAsync } = useCreateStorage({
		onSuccess: () => {
			toast.success("Marca cadastrada com sucesso.", {
				autoClose: 2000,
				position: "top-right",
			});
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
		validationSchema: RegisterStorageSchema,
	});

	const clearData = () => {
		setValues(initial_values, true);
	};

	const onSubmit = async () => {
		setIsLoading(true);
		try {
			await mutateAsync(values);
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
										name="identifier"
										label="Nome"
										variant="bordered"
										onBlur={handleBlur}
										value={values.identifier}
										onChange={handleChange}
										placeholder="Digite o nome da marca"
										isInvalid={
											errors.identifier && touched.identifier ? true : false
										}
										errorMessage={
											errors.identifier && touched.identifier
												? errors.identifier
												: ""
										}
									/>
								</FormItem>
								<FormItem>
									<InputNew
										name="cep"
										label="CEP"
										variant="bordered"
										onBlur={handleBlur}
										value={values.cep}
										onChange={handleChange}
										placeholder="Digite o cep do estoque"
										isInvalid={errors.cep && touched.cep ? true : false}
										errorMessage={errors.cep && touched.cep ? errors.cep : ""}
									/>
								</FormItem>
								<ModalFooter style={{ paddingRight: 0 }}>
									<Button color="danger" variant="solid" onPress={clearData}>
										Limpar campos
									</Button>
									<Button
										type="submit"
										color="primary"
										isDisabled={!isValid}
										isLoading={isLoading}
										spinner={<Spinner size="sm" color="primary" />}
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
