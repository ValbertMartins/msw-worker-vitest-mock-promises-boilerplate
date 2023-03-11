import axios from "axios"
export async function fetchData(url: string): Promise<any> {
  const response = await axios(url)
  const { data } = response
  return data
}

export async function returnError() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("error boundary"))
    }, 5000)
  })
}
