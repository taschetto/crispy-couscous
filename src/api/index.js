import axios from 'axios'

const defaultHeaders = {
  'Content-Type': 'application/json',
}

export const instance = axios.create({
  headers: defaultHeaders,
  baseURL: '',
})
