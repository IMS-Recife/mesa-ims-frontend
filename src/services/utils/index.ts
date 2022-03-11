import { fetch } from '@services/index'
import { AxiosResponse } from 'axios'

export function getAddress(zipcode: string): Promise<AxiosResponse> {
  return fetch({ baseURL: `https://ws.apicep.com/cep/${zipcode}.json` })
}
