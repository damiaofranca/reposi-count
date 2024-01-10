import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "react-query";
import { NextUIProvider } from "@nextui-org/react";

import { queryClient } from "./api";
import HandlerPages from "./screens/handlerPages";

const App = () => {
	return (
		<NextUIProvider>
			<QueryClientProvider client={queryClient}>
				<HandlerPages />
			</QueryClientProvider>
			<ToastContainer />
		</NextUIProvider>
	);
};

export default App;
