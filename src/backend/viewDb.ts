import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

// View DB state
export const viewDB = async (entity: string) => {
    const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/viewDB`, {entity: entity});
    console.log(JSON.stringify(response.data));
}

// User
// Event
// Blog
viewDB("User");