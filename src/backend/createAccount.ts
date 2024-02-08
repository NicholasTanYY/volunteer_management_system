import axios from 'axios';
import * as dotenv from 'dotenv';
import promptSync from 'prompt-sync';
const prompt = promptSync();
dotenv.config();

// Adds in an admin
export const createAccount = async (firstName: string, lastName: string, phoneNumber: string, username: string, password: string, isAdmin: boolean) => {

    const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/admin/createAccount`, {firstName, lastName, phoneNumber, username, password, isAdmin});
    console.log(JSON.stringify(response.data));
}

const firstName = String(prompt("First Name"));
const lastName = String(prompt("Last Name"));
const phoneNumber = String(prompt("Phone Number"));
const username = String(prompt("Username"));
const password = String(prompt("Password"));
const isAdmin = true
createAccount(firstName, lastName, phoneNumber, username, password, isAdmin);