import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/axiosConfig";

const postQuery = async (contactData) => {
    console.log(contactData)
    const response = await axios.post(`${base_url}enquiry`, contactData);
    if (response.data) {
        return response.data;
    }
};

export const contactService = {
    postQuery
};
