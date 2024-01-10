import axios from "axios";
import { redirect } from "react-router-dom";
import { decodeTokenAsync, removeToken } from "../utils/script";
import { QueryClient } from "react-query";

const baseURL = process.env.REACT_APP_API_URL;

export const queryClient = new QueryClient();

const api = axios.create({
	baseURL,
});

api.interceptors.request.use(
	async function (config) {
		if (config.url !== "/auth/signin") {
			const token_local = await decodeTokenAsync();

			if (typeof token_local === "string" && !config.headers["authorization"]) {
				config.headers["authorization"] = `Bearer ${token_local}`;
			} else {
				redirect("/login");
			}
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

axios.interceptors.response.use(
	function (response) {
		const token_local = process.env.REACT_APP_LOCAL_TOKEN;
		if (
			response.status === 401 &&
			response.data.message &&
			response.data.message === "EXPIRED_TOKEN"
		) {
			if (typeof token_local === "string") {
				removeToken();
				redirect("/login");
			}
		}
		return response;
	},
	function (error) {
		return Promise.reject(error);
	},
);

export default api;
