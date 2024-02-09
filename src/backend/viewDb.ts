import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

// View DB state
export const viewDB = async () => {
    const response = await axios.get(`${process.env.REACT_APP_REQUEST_LINK}/viewDB`);
    console.log(JSON.stringify(response.data));
}

viewDB();