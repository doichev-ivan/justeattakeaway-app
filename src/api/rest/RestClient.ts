import { RestUrlsValues } from './restUrls'

class RestClient {
  private readonly baseUrl = process.env.REACT_APP_REST_API_URL ?? ''

  async get<T> (url: RestUrlsValues): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`)
    return await response.json()
  }
}

const restClient = new RestClient()
export default restClient
