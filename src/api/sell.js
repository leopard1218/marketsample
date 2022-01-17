import axios from 'axios'
import { API_URL } from '../constants'

const sellApi = {
  addSell: sell => axios.post(`${API_URL}/sells`, sell)
}

export default sellApi