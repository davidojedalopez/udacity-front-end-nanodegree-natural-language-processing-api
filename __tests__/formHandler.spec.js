import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import { handleSubmit } from "../src/client/js/formHandler"

describe('Form submit handler', () => {

  test("Should work without errors", () => {
    let input = { preventDefault: () => {}}
    document.body.innerHTML = `<input id="url" value="https://davidojeda.dev">`
    document.body.innerHTML += `<div id="sentiment-result"></div>`
    document.body.innerHTML += `<div id="article-result"></div>`
    document.body.innerHTML += `<div class="sk-cube-grid"></div>`

    global.Client = {}
    global.Client.formatResponse = () => { 
      return { sentiment: '', article: '' }
    }
    fetch.mockResponse(JSON.stringify({ data: '12345' }))

    expect(handleSubmit(input)).not.toBeDefined()
  })

  test("Should fail due to wrong API response", () => {
    let input = { preventDefault: () => {}}
    document.body.innerHTML = `<input id="url" value="https://davidojeda.dev">`
    document.body.innerHTML += `<div class="sk-cube-grid"></div>`

    fetch.mockResponse('Text instead of json')

    expect(handleSubmit(input)).not.toBeDefined()
  })
})