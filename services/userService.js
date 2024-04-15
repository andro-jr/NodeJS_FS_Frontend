const axios = require('axios')
require('dotenv').config();

exports.postRegister = async (body) => {
    const result = await axios.post(`${process.env.API_URL}/users/register`, body);
    return result
}