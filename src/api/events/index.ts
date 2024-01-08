import api from "..";
export * from "./hooks";
import { EventService } from "./service";
import { ApiRepository } from "./repository";

export const eventService = new EventService(new ApiRepository(api));
