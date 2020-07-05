import axios from "axios";

const baseDomain = "https://test.quadim.ai";
const baseURL = `${baseDomain}`;

export default axios.create({
    baseURL,
    headers: {
        // "Authorization": "Bearer xxxxx"
    }
});