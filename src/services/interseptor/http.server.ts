import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is missing");
}
const serverApiClient = axios.create({
  baseURL:apiUrl,
});

export default serverApiClient;