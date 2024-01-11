import api from "..";
import { StorageService } from "./service";
import { ApiRepository } from "./repository";

export * from "./hooks";

export const storageService = new StorageService(new ApiRepository(api));
