import axios from 'axios'
const baseUrl = '/api/loginRecruiter'

const loginRecruiter = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { loginRecruiter }