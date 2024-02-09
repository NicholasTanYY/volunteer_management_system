import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

// Resets the DB (remove all users or events)
export const clearFunction = async (db: string) => {
    const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/${db}/clear`);
    console.log(JSON.stringify(response.data));
}

clearFunction("event");