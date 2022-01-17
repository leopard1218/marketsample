import axios from 'axios'
import { API_URL } from '../constants'

const contractApi = {
  getContracts: () => axios.get(`${API_URL}/contracts`),
}

export default contractApi