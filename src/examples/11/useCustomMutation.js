import { instance } from 'api'
import { useMutation } from 'react-query'

export const useCustomMutation = (options = {}) =>
  useMutation(async () => await instance.post('/unprocessable-entity'), {
    ...options,
  })
