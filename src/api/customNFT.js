import axios from 'axios'

import { API_URL } from '../constants/'

const customNFTApi = {
  create: (address, name, description, data, type, banner) => axios.post(`${API_URL}/custom`, {
    address,
    name,
    description,
    data,
    type,
    banner
  }),
}

export default customNFTApi