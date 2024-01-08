import CryptoJS from "crypto-js";
import {jwtDecode} from "jwt-decode";


const encryptToken = async (value: string) => {
	try {
		const encryptedValue = await encryptValue(value);

		localStorage.setItem(
			String(process.env.REACT_APP_LOCAL_TOKEN),
			encryptedValue.toString(),
		);
	} catch (error) {
		console.error("Erro ao criptografar o token:", error);
	}
};

const encryptValue = (value: string) => {
	return new Promise<string>((resolve, reject) => {
		try {
			const encrypted = CryptoJS.AES.encrypt(
				value,
				String(process.env.REACT_APP_ENCRYPT_TOKEN),
			).toString();
			resolve(encrypted);
		} catch (error) {
			reject(error);
		}
	});
};

const decodeToken = () => {
	const token_local = localStorage.getItem(String(process.env.REACT_APP_LOCAL_TOKEN));

	if (typeof token_local === "string") {
		const bytes = CryptoJS.AES.decrypt(
			token_local,
			String(process.env.REACT_APP_ENCRYPT_TOKEN),
		);
		return bytes.toString(CryptoJS.enc.Utf8);
	}
	return "";
};

const decodeTokenAsync = () => {
	return new Promise<string>((resolve) => {
		const token_local = localStorage.getItem(String(process.env.REACT_APP_LOCAL_TOKEN));
		console.log(String(process.env.REACT_APP_ENCRYPT_TOKEN))
		console.log(token_local)
		if (typeof token_local === "string" && typeof token_local === "string") {
			const bytes = CryptoJS.AES.decrypt(
				token_local,
				String(process.env.REACT_APP_ENCRYPT_TOKEN),
			);
		console.log(bytes)

			resolve(bytes.toString(CryptoJS.enc.Utf8));
		}
	});
};

const decodeHash = () => {
	if (!localStorage.getItem(String(process.env.REACT_APP_LOCAL_TOKEN))) {
		return false;
	}

	const data = jwtDecode(decodeToken()) as { email: string; exp: number };

	return { email: data.email, exp: data.exp };
};

const removeToken = () => {
	localStorage.removeItem(String(process.env.REACT_APP_LOCAL_TOKEN));
};

export { encryptToken, decodeToken, decodeTokenAsync, decodeHash, removeToken };
