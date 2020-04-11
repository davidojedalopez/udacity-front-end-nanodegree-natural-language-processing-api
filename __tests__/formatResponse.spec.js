import { formatResponse } from "../src/client/js/formatResponse"

describe('Format response function', () => {

  test("should format Aylien external API response correctly", () => {
    const input = {
      "text": "Here goes the text of the actual article.",
      "results": [
        {
          "endpoint": "extract",
          "result": {
            "author": "David Ojeda",
            "image": "",
            "tags": [],
            "article": "Here goes the text of the actual article.",
            "videos": [],
            "title": "A really cool title",
            "publishDate": "2020-04-10T22:18:55+00:00",
            "feeds": [
              "https://davidojeda.dev"              
            ]
          }
        },
        {
          "endpoint": "entities",
          "result": {
            "language": "en",
            "entities": {
              "organization": [
                "DEV",
                "Twitter"
              ],
              "location": [
                "U.S",                
                "U.K",
                "UK"                
              ],
              "keyword": [                
                "mainstream",                              
                "online",
                "times",
                "towers",
                "company",
                "internet",
                "months"
              ],
              "date": [
                "years",
                "five months ago",
                "six to eight months",
                "three to 14 days",
                "months",
                "last year",
                "2018",
                "last May",
                "this week"
              ],
              "person": [
                "David Ojeda",
                "Woody Allen"
              ]
            }
          }
        },
        {
          "endpoint": "sentiment",
          "result": {
            "polarity": "negative",
            "subjectivity": "unknown",
            "polarity_confidence": 0.9980089068412781,
            "subjectivity_confidence": 0
          }
        },
        {
          "endpoint": "summarize",
          "result": {
            "sentences": [
              "First summary sentence.",
              "Second summary sentence"
            ]
          }
        }
      ]
    }

    const output = { 
      sentiment: `<p>Article's general feelings are <span class="negative sentiment">negative</span> with a confidence of 0.998</p>`, 
      article: '<p>The article is titled <span class="bold">"A really cool title"</span> and was written by <span class="bold">David Ojeda</span> on <span class="bold">Fri Apr 10 2020</span></p><br><h3>Entities:</h3><ul><li><span class="bold capitalized">organization</span>: DEV</li></ul>'
    }

    expect(formatResponse(input).sentiment).toMatch(output.sentiment)

    // Has title
    expect(formatResponse(input).article).toMatch(new RegExp('A really cool title'))

    // Has author
    expect(formatResponse(input).article).toMatch(new RegExp('David Ojeda'))

    // Has date
    expect(formatResponse(input).article).toMatch(new RegExp('Fri Apr 10 2020'))
  })

})