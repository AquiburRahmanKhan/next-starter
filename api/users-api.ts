import { get } from "../helpers/api-helper";

export const me = async () => await get("/users/me");
