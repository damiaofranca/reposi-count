import api from "..";
import { BrandService } from "./service";
import { ApiRepository } from "./repository";

export * from "./hooks";

export const brandService = new BrandService(new ApiRepository(api));
