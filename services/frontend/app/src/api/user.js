import axios from "axios";
import { USER_ENDPOINT, COMPLEX_SCRAPER_ENDPOINT, authenticate } from "./config";

export const signIn = async(username, password) => {
    try { 
        const res = await axios.post(`${USER_ENDPOINT}/signin`, {
            "username": username,
            "password": password
        }, {
            withCredentials: true
        });
        if (res) {
            return res.data;
        }
        throw new Error("No data returned from backend");
    } catch (error) {
        return error.response.data;
    }
}

export const signOut = async() => {
    try {
        const res = await axios.post(`${USER_ENDPOINT}/signout`,{
            withCredentials: true
        });
        if (res) {
            return res.data;
        }
        throw new Error("No data returned from backend");
    } catch (error) {
        return error.response.data;
    }
}

// original
// email: <str:email>, name: <str:name>, password: <str:password> , phone: <int:phone>, company: <str:company>
export const signUp = async(username, email, password, phone, company) => {
    try {
            const res = await axios.post(`${USER_ENDPOINT}/signup`, {
            "email": email,
            "password": password,
            "phone": phone,
            "company": company
        });
        if (res) {
            return res.data;
        }
        throw new Error("No data returned from backend");
    } catch (error) {
        return error.response.data;
    }
}

export const blStatus = async(shippingLine, identifier, identifierType, direction) => {
    try {
        const authRes = await authenticate()

        if (authRes.status === 200) {
            const res = await axios.post(`${COMPLEX_SCRAPER_ENDPOINT}/scrape`, {
                "shipping_line": shippingLine,
                "identifier": identifier,
                "identifier_type": identifierType,
                "direction": direction
            });
            if (res) {
                return res.data;
            }
            throw new Error("No data returned from backend");
        }       
        throw new Error("Request Unauthorised") 
    } catch (error) {
        return error.response.data;
    }
}