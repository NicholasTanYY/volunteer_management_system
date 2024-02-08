import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

// Resets the DB (remove all users)
export const clearFunction = async () => {
    const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/user/clear`);
    console.log(JSON.stringify(response.data));
}

clearFunction();