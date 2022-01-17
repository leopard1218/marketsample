import axios from 'axios'

const metadataApi = {
  create: apiUrl => axios.get(apiUrl),
}

export default metadataApi