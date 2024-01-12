import React, { useState } from "react";
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

import RegisterStorageSchema, { isValidCep } from "./schema";

import { useTheme } from "../../hooks";
import { InputNew } from "../InputNew";

import { Form, FormItem } from "./styles";
import { useCreateStorage } from "../../api/storages";
import { apiViaCEP, queryClient } from "../../api";
import { useDelayQuery } from "../../hooks/useDelayQuery";

interface IAddStorage {
	onClose: () => void;
}

const initial_values = {
	uf: "",
	cep: "",
	city: "",
	street: "",
	district: "",
	identifier: "",
	local_number: "",
};

export const AddStorage: React.FC<IAddStorage> = ({ onClose }) => {
	const { theme } = useTheme();
	const [fieldCEP, setFieldCEP] = useState<string>(``);
	const debouncedCEP = useDelayQuery({ delay: 400, query: fieldCEP });
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutateAsync } = useCreateStorage({
		onSuccess: () => {
			toast.success("Estoque cadastrado com sucesso.", {
				autoClose: 2000,
				position: "top-right",
			});
			queryClient.invalidateQueries(`storages`);
			setIsLoading(false);
			onClose();
			resetForm();
		},
		onError: (error: any) => {
			toast.error(
				error.response.data.statusCode === 401
					? "Somente administradores podem adicionar estoques."
					: "Erro ao cadastrar estoque.",
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
		setFieldValue,
		setFieldError,
		setFieldTouched,
		setErrors,
	} = useFormik({
		enableReinitialize: true,
		initialValues: initial_values,
		validateOnBlur: true,
		validateOnChange: true,
		onSubmit: () => {
			onSubmit();
		},
		validationSchema: RegisterStorageSchema,
	});

	const clearData = () => {
		setValues(initial_values, true);
	};

	const onUpdateCEPField = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newCEP = e.target.value;

		setFieldCEP(newCEP);
		setFieldValue("cep", newCEP, false);

		if (isValidCep(newCEP)) {
			setFieldTouched("cep", true, false);
			setFieldError("cep", undefined);
			setErrors({});
		} else {
			setFieldTouched("cep", true);
			setFieldError("cep", "CEP inválido.Ex: 99999-999");
		}
	};

	const validCEPField = async () => {
		try {
			const { data } = await apiViaCEP.get(`/${debouncedCEP}/json`);
			setValues(
				{
					...values,
					cep: values.cep,
					uf: data.bairro,
					city: data.localidade,
					district: data.bairro,
					street: data.logradouro,
				},
				true,
			);
		} catch (error) {
			console.log(error);
		}
	};

	const onSubmit = async () => {
		setIsLoading(true);
		try {
			await mutateAsync(values);
		} catch (error) {}
	};

	React.useEffect(() => {
		if (isValidCep(debouncedCEP)) {
			validCEPField();
		}
	}, [debouncedCEP]);

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
							Cadastrar estoque
						</ModalHeader>
						<ModalBody>
							<Form onSubmit={handleSubmit}>
								<FormItem>
									<InputNew
										name="identifier"
										variant="bordered"
										onBlur={handleBlur}
										label="Identificador"
										value={values.identifier}
										onChange={handleChange}
										placeholder="Digite o identificador do estoque"
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
										value={fieldCEP}
										variant="bordered"
										onBlur={handleBlur}
										onChange={onUpdateCEPField}
										placeholder="Digite o cep do estoque"
										isInvalid={errors.cep && touched.cep ? true : false}
										errorMessage={errors.cep && touched.cep ? errors.cep : ""}
									/>
								</FormItem>
								<FormItem>
									<InputNew
										name="city"
										label="Cidade"
										variant="bordered"
										onBlur={handleBlur}
										value={values.city}
										onChange={handleChange}
										placeholder="Digite o nome da cidade"
										isInvalid={errors.city && touched.city ? true : false}
										errorMessage={
											errors.city && touched.city ? errors.city : ""
										}
									/>
								</FormItem>
								<FormItem>
									<InputNew
										name="district"
										label="Bairro"
										variant="bordered"
										onBlur={handleBlur}
										value={values.district}
										onChange={handleChange}
										placeholder="Digite o Bairro"
										isInvalid={
											errors.district && touched.district ? true : false
										}
										errorMessage={
											errors.district && touched.district ? errors.district : ""
										}
									/>
								</FormItem>
								<FormItem>
									<InputNew
										name="street"
										label="Rua"
										variant="bordered"
										onBlur={handleBlur}
										value={values.street}
										onChange={handleChange}
										placeholder="Digite o nome da rua"
										isInvalid={errors.street && touched.street ? true : false}
										errorMessage={
											errors.street && touched.street ? errors.street : ""
										}
									/>
								</FormItem>
								<FormItem>
									<InputNew
										variant="bordered"
										onBlur={handleBlur}
										name="local_number"
										onChange={handleChange}
										label="Numéro do estoque"
										value={values.local_number}
										placeholder="Digite o nome da rua"
										isInvalid={
											errors.local_number && touched.local_number ? true : false
										}
										errorMessage={
											errors.local_number && touched.local_number
												? errors.local_number
												: ""
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
