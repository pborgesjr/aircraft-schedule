import axios from "axios";

const BASE_URL = "https://recruiting-assessment.alphasights.com/api";

export const axiosClient = axios.create({ baseURL: BASE_URL });
