function formatResponse(res) {  
  console.info({res})
  return { 
    sentiment: processSentiment(res),
    article: processArticle(res)
  }
}

function processSentiment(res) {  
  let { polarity, polarity_confidence } = res.results.find(it => it.endpoint === 'sentiment').result
  
  const formatter = new Intl.NumberFormat('en', {
    maximumFractionDigits: 3    
  })
  return `<p>Article's general feelings are <span class="${polarity} sentiment">${polarity}</span> with a confidence of ${formatter.format(polarity_confidence)}</p>`
}

function processArticle(res) {
  let { author, title, publishDate } = res.results.find(it => it.endpoint === 'extract').result

  let info =  `<p>The article is titled <span class="bold">'${title}'</span> and was written by <span class="bold">${author}</span> on <span class="bold">${new Date(publishDate).toDateString()}</span></p><br>`

  let { entities } = res.results.find(it => it.endpoint === 'entities').result

  let keywords = `<h3>Entities:</h3><ul>`
  for(let entity in entities) {
    keywords += `<li><span class="bold capitalized">${entity}</span>: ${entities[entity].join(', ')}</li>`
  }
  keywords += '</ul>'

  return info + keywords
}

export { formatResponse }