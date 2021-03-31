import { instance } from 'api'
import { useMutation } from 'react-query'

export const useCustomMutation = (url, options = {}) =>
  useMutation(async () => await instance.post(url), options)
