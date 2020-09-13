import { post } from "../helpers/api-helper";

export const login = async (data: object, config?: object) => await post("/abcb7232", data, config, {"Authorization": "EXCLUDE"});
