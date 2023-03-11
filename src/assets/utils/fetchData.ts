import axios from "axios"
export async function fetchData(url: string): Promise<any> {
  const response = await axios(url)
  const { data } = response
  return data
}
