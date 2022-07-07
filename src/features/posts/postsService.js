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

const getPostByName = async (postTitle) => {
const res = await axios.get(API_URL + "/posts/search/" + postTitle);
console.log(res.data)
return res.data
}

const deletePost = async (id) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.delete(API_URL + "/posts/id/" + id, {
        headers: {
            authorization: user?.token,
        },
    });
    return res.data;
};

const like = async (_id) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.put(API_URL + "/posts/likes/" + _id, {}, {
        headers: {
            authorization: user?.token,
        },
    });
    return res.data;

};

const unLike = async (_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.put(API_URL + "/posts/unLike/" + _id, {}, {
        headers: {
            authorization: user?.token,
        },
    });
    return res.data
};

const createPost = async (postData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.post(API_URL + "/posts/", postData, {
        headers: {
            authorization: user?.token
        }
    });
    console.log(res.data)
    return res.data
};

const updatePost = async (post) => {
    console.log("hey", post)
    const user = JSON.parse(localStorage.getItem("user")); 
    const res = await axios.put(API_URL + "/posts/" + post.id, post, {
        headers: {
            authorization: user?.token
        }
    }) 
    
    console.log("hey", res.data)
    return res.data
};


const comment = async (_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.put(API_URL + "/posts/comments/", _id, {
        headers: {
            authorization: user?.token
        }
    });
    console.log(res.data)
    return res.data
};


const postsService = {
    getAll,
    getById,
    getPostByName,
    deletePost,
    like,
    unLike,
    createPost,
    updatePost,
    comment
};

export default postsService