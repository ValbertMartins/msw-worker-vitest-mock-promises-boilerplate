import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { fetchData } from "./fetchData"

import { rest } from "msw"
import { setupServer } from "msw/node"

const BASE_URL = "https://rickandmortyapi.com/api/character/1"

const worker = setupServer(
  rest.get("https://rickandmortyapi.com/api/character/1", (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: "Rick Sanchez",
      }),
      ctx.status(200)
    )
  })
  //other handle methods
  //rest.post()
)

//listen events before tests
beforeAll(() => worker.listen())
//clear the event listeners
afterAll(() => worker.close())

describe("fetch Data function", () => {
  it("should return a data fetch", async () => {
    const dataFetched = await fetchData(BASE_URL)
    expect(dataFetched).toMatchObject({
      name: "Rick Sanchez",
    })
  })
  it("should throw a new error with boundary error message", async () => {
    worker.use(
      rest.get("https://rickandmortyapi.com/api/character/1", (req, res, ctx) => {
        return res(ctx.status(404, "Request failed with status code 404"))
      })
    )
    await expect(fetchData(BASE_URL)).rejects.toThrow("Request failed with status code 404")
  })
})
