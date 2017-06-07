
import { toCamelcase, reverseCamelcase } from 'object-keys-mapping'
import { request } from './base'

export interface ILoginParam {
  username: string
  password: string
}

export const login = (param: ILoginParam) => {
  return request
    .post('/login')
    .send(reverseCamelcase(param))
    .json()
}
