import axios from 'axios';
import * as dotenv from 'dotenv';
import promptSync from 'prompt-sync';
const prompt = promptSync();
dotenv.config();

// Adds in an admin
export const createAccount = async (fullName: string, phoneNumber: string, username: string, password: string, isAdmin: boolean) => {

    const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/admin/createAccount`, {fullName, phoneNumber, username, password, isAdmin});
    console.log(JSON.stringify(response.data));
}

const fullName = String(prompt("Full Name"));
const phoneNumber = String(prompt("Phone Number"));
const username = String(prompt("Username"));
const password = String(prompt("Password"));
const isAdmin = true
createAccount(fullName, phoneNumber, username, password, isAdmin);