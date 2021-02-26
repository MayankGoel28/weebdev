import axios from 'axios'
const baseUrl = '/api/loginApplicant'

const loginApplicant = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { loginApplicant }