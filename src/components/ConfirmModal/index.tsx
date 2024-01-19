import {
	useDisclosure,
	Button,
	Modal,
	ModalBody,
	ModalProps,
	ModalHeader,
	ModalFooter,
	ModalContent,
	InternalForwardRefRenderFunction,
} from "@nextui-org/react";
import {
	ReactNode,
	forwardRef,
	PropsWithChildren,
	useImperativeHandle,
} from "react";
import { useTheme } from "../../hooks";

interface IConfirmModal {
	submitFn: (values?: any) => void;
	title: string;
	content: ReactNode;
	submitText: string;
	submitColor:
		| "danger"
		| "default"
		| "primary"
		| "warning"
		| "success"
		| "secondary"
		| undefined;
}

export const ConfirmModal = forwardRef<
	InternalForwardRefRenderFunction<"div", ModalProps, never>,
	PropsWithChildren<IConfirmModal>
>(function (
	{ content, submitFn, title, submitText, submitColor }: IConfirmModal,
	_ref: any,
) {
	const { theme } = useTheme();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const onSubmit = () => {
		onClose();
		submitFn();
	};

	useImperativeHandle(
		_ref,
		() => {
			return {
				onOpen,
				onClose,
			};
		},
		[],
	);

	return (
		<Modal
			size={"md"}
			isOpen={isOpen}
			onClose={onClose}
			className="bg-content1"
		>
			<ModalContent className={theme === "dark" ? "bg-[#313131]" : ""}>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
						<ModalBody>{content}</ModalBody>
						<ModalFooter>
							<Button
								size="sm"
								variant="shadow"
								onPress={onClose}
								className={theme === "dark" ? "text-white" : ""}
							>
								Cancelar
							</Button>
							<Button size="sm" color={submitColor} onPress={onSubmit}>
								{submitText}
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
});
//
