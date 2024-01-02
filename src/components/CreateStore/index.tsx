import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

import { Input } from "../Input";
import RegisterStoreSchema from "./schema";
import { dbFireStore } from "../../config/firebase";
import ArrowLeftIcon from "../../assets/icons/arrow-left.svg";
import { maskToCurrencyValue } from "../../utils/maskToCurrencyValue";
import { handleFirebaseRequestError } from "../../utils/requestError";

import { Form, FormItem } from "./styles";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Spinner,
} from "@nextui-org/react";
import { useTheme } from "../../hooks";
import { InputNew } from "../InputNew";

interface ICreateStore {
	onClose: () => void;
}

export const CreateStore: React.FC<ICreateStore> = ({ onClose }) => {
	const { theme } = useTheme();
	//IF WANT YOU CAN ADD VIACEP API TO GET THE CITIES...
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const removeVir = /,/g;
	const removeSimbol = /^R\$/;
	const only_number = /^-?\d*\.?\d*$/;
	const initial_values = {
		lng: "",
		lat: "",
		name: "",
		city: "",
		totalMount: "",
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
		setFieldValue,
	} = useFormik({
		enableReinitialize: true,
		initialValues: initial_values,
		onSubmit: () => {
			onSubmit();
		},
		validationSchema: RegisterStoreSchema,
	});

	const receiveOnlyNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (only_number.test(event.target.value)) {
			handleChange(event);
		} else {
			event.stopPropagation();
		}
	};

	const clearData = () => {
		setValues(initial_values, true);
	};

	function formatAndValidateMoney(event: React.ChangeEvent<HTMLInputElement>) {
		const input = event.target;
		const value = input.value.replace(/[^0-9.]/g, "");
		const formattedValue = maskToCurrencyValue(value.replace(removeSimbol, ""));
		setFieldValue("totalMount", formattedValue, true);
	}

	const onSubmit = async () => {
		setIsLoading(true);
		try {
			await setDoc(doc(dbFireStore, "stores", values.name), {
				...values,
				lat: Number(values.lat),
				lng: Number(values.lng),
				totalMount: values.totalMount
					.replace(removeSimbol, "")
					.replace(removeVir, "."),
			});

			toast.success("Loja cadastrada com sucesso.", {
				autoClose: 2000,
				position: "top-right",
			});
			setIsLoading(false);
			onClose();
			resetForm();
		} catch (error) {
			setIsLoading(false);
			handleFirebaseRequestError(error as any);
			onClose();
		}
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
							Cadastrar loja
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
										placeholder="Digite o nome da loja"
										isInvalid={errors.name && touched.name ? true : false}
										errorMessage={
											errors.name && touched.name ? errors.name : ""
										}
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
										name="lat"
										label="Latitude"
										variant="bordered"
										onBlur={handleBlur}
										value={values.lat}
										onChange={receiveOnlyNumber}
										placeholder="Digite a latitude da cidade"
										isInvalid={errors.lat && touched.lat ? true : false}
										errorMessage={errors.lat && touched.lat ? errors.lat : ""}
									/>
								</FormItem>
								<FormItem>
									<InputNew
										name="lng"
										label="Latitude"
										variant="bordered"
										onBlur={handleBlur}
										value={values.lng}
										onChange={receiveOnlyNumber}
										placeholder="Digite a longitude da cidade"
										isInvalid={errors.lng && touched.lng ? true : false}
										errorMessage={errors.lng && touched.lng ? errors.lng : ""}
									/>
								</FormItem>
								<FormItem>
									<InputNew
										name="totalMount"
										label="Montante"
										variant="bordered"
										onBlur={handleBlur}
										value={values.totalMount}
										onChange={formatAndValidateMoney}
										placeholder="Digite o montante da loja"
										isInvalid={
											errors.totalMount && touched.totalMount ? true : false
										}
										errorMessage={
											errors.totalMount && touched.totalMount
												? errors.totalMount
												: ""
										}
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
										spinner={<Spinner size="sm" />}
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
