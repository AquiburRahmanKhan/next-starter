import { post } from "../helpers/api-helper";

export const login = async (data: object, config?: object) => await post("/login", data, config, {"Authorization": "EXCLUDE"});
