function handleSubmit(event) {
  event.preventDefault()

  document.querySelector('.sk-cube-grid').style.visibility = 'visible';
  
  let formText = document.getElementById('url').value
  
  fetch('http://localhost:8081/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({url: formText})
  }).then(res => {
    return res.json()
  }).then(res => { 
      res = Client.formatResponse(res)

      document.getElementById('sentiment-result').innerHTML = res.sentiment

      document.getElementById('article-result').innerHTML = res.article

      document.querySelector('.sk-cube-grid').style.visibility = 'hidden';
  }).catch(err => {
    document.querySelector('.sk-cube-grid').style.visibility = 'hidden';

    console.error(err)
    alert('There was an error getting your information...')
  })
}

export { handleSubmit }