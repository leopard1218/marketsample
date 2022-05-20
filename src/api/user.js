import axios from 'axios'
import { API_URL } from '../constants'

const userApi = {
  addUser: (user, wallet) => axios.post(`${API_URL}/auth`, {
    user,
    wallet
  }),
  getMe: wallet => axios.get(`${API_URL}/auth/${wallet}`)
}

export default userApi