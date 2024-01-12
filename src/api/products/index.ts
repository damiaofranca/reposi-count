import api from "..";
import { ProductService } from "./service";
import { ApiRepository } from "./repository";

export * from "./hooks";

export const productService = new ProductService(new ApiRepository(api));
