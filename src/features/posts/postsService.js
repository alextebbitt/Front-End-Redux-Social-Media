import axios from "axios";

const API_URL = "http://localhost:8787"

const getAll = async () => {
    const res = await axios.get(API_URL + "/posts");
    return res.data;
};

const getById = async (_id) => {
    const res = await axios.get(API_URL + "/posts/id/" + _id);
    return res.data;
}

const postsService = {
    getAll,
    getById
};

export default postsService