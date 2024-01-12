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
import { apiViaCEP, queryClient } from "../../api";
import { useDelayQuery } from "../../hooks/useDelayQuery";
import { IStorage } from "../../interfacers/storage";
import { useUpdateStorage } from "../../api/storages/hooks/Update";

interface IEditStorage {
	storage: IStorage;
	onClose: () => void;
}

interface IDiff {
	[property: string]: string;
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

export const EditStorage: React.FC<IEditStorage> = ({ storage, onClose }) => {
	const { theme } = useTheme();
	const [fieldCEP, setFieldCEP] = useState<string>(``);
	const debouncedCEP = useDelayQuery({ delay: 400, query: fieldCEP });
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutateAsync } = useUpdateStorage({
		onSuccess: () => {
			toast.success("Marca cadastrada com sucesso.", {
				autoClose: 2000,
				position: "top-right",
			});
			queryClient.invalidateQueries(`storages`);
			setIsLoading(false);
			onClose();
			resetForm();
		},
		onError: (error: any) => {
			switch (error.response.data.statusCode) {
				case 401:
					toast.error("Somente administradores podem editar estoques.");
					break;
				case 409:
					toast.error(
						"Já existe um estoque com essa mesma rua e número cadastrado.",
					);
					break;
				default:
					toast.error("Erro ao cadastrar estoque.");
					break;
			}
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
		initialValues: {
			uf: storage.uf,
			cep: storage.cep,
			city: storage.city,
			street: storage.street,
			district: storage.district,
			identifier: storage.identifier,
			local_number: storage.local_number,
		},
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

	const returnDiff = (obj1: IDiff, obj2: IDiff) => {
		const diff: IDiff = {};

		for (const chave in obj1) {
			if (obj1.hasOwnProperty(chave) && obj2.hasOwnProperty(chave)) {
				if (obj1[chave] !== obj2[chave]) {
					diff[chave] = obj2[chave];
				}
			}
		}

		return diff;
	};

	const onSubmit = async () => {
		setIsLoading(true);
		try {
			await mutateAsync({
				data: returnDiff(storage as any, values),
				id: storage.id,
			});
		} catch (error) {}
	};

	React.useEffect(() => {
		if (isValidCep(debouncedCEP)) {
			validCEPField();
		}
	}, [debouncedCEP]);

	React.useEffect(() => {
		validateForm();
		setFieldCEP(storage.cep);
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
							Atualizar estoque
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
										Atualizar
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
