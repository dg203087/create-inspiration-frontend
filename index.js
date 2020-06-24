const baseURL = 'http://localhost:3000/api/v1'
const quotesURL = `${baseURL}/quotes`
const templatesURL = `${baseURL}/templates`
let indexBtn 
let clearBtn
let postBtn
let randomTemplateId
let quoteID
let quoteArray
let adjData
let nounData
let verbData
let newQuote

//load form and random template 
document.addEventListener('DOMContentLoaded', () => {
    fetchRandomTemplate()
    const addWordsForm = document.querySelector('#add-words-form')
    addWordsForm.addEventListener('submit', (e) => createFormHandler(e)) //create event handler to make sure page doesn't refresh

//clear button
    clearBtn = document.querySelector("#clear-button")
    clearBtn.addEventListener("click", function(){
      document.getElementById('add-words-form').reset()
      const container = document.querySelector(".template-container")
      container.innerHTML = ''
      fetchRandomTemplate()
    })

//post quote button
    postBtn = document.querySelector("#post-button")
    postBtn.addEventListener("click", function() {
      let newAdj = adjData
      let newNoun = nounData
      let newVerb = verbData
        
      postQuote(quoteID, newQuote, newAdj, newNoun, newVerb)
      })
})

// fetch random template
function fetchRandomTemplate() {
  fetch(templatesURL)
  .then(resp => resp.json())
  .then(templates => {
      randomTemplateId = templates[Math.floor(Math.random() * templates.length)]
      let randomTemplateContent = randomTemplateId.content
      let templateImage = randomTemplateId.image_url
  
      const currentTemplate = `
      <div data-id=${randomTemplateId.id}> 
        <img src=${templateImage} height="350", width="100%">
        <div class="centered"><h3></h3></div>
      </div>
      `
      document.querySelector('.template-container').innerHTML += currentTemplate
      postTemplate(randomTemplateId)
  })
}

// posts template to quote
function postTemplate(tempID) {
  const templateData = {template_id: tempID.id}
  fetch(quotesURL, {
    method: "POST",
    headers: {"Content-Type": "application/json"}, 
    body: JSON.stringify(templateData)
  })
  .then(response => response.json())
  .then(quote => {
    console.log(quote)
    quoteID = quote.id
    quoteArray = quote
  })
}

//receive form input values
function createFormHandler(e) {
  e.preventDefault()
  const nounInput = document.querySelector('#input-noun').value
  const verbInput = document.querySelector('#input-verb').value
  const adjectiveInput = document.querySelector('#input-adjective').value

  quoteID = quoteID
  updateQuote(quoteID, nounInput, verbInput, adjectiveInput) 
}

//creates quote with submitted words
function updateQuote(quoteID, noun, verb, adjective) {
   // const quoteData = {quoteID} //{id: quoteID}
  const adjData = adjective //{adj_word: adjective}
  const nounData = noun//{noun_word: noun}  //build noun object
  const verbData = verb //{verb_word: verb}
  quoteArray = quoteArray.template.content
  
  const verbFind = (quoteArray.match(new RegExp("VERB", 'g')))
  const nounFind = (quoteArray.match(new RegExp("NOUN", 'g')))
  const adjectiveFind = (quoteArray.match(new RegExp("ADJECTIVE", 'g')))

  newQuote = quoteArray

  newQuote = newQuote.replace(nounFind, nounData)
  newQuote = newQuote.replace(adjectiveFind, adjData);
  newQuote = newQuote.replace(verbFind, verbData);
  console.log(newQuote)
  
  const newTemplate = `
    <div class="centered"><h3>${newQuote}</h3></div>
  </div>
  `
  document.querySelector('.centered').innerHTML += newTemplate

}

function postQuote(quoteID, newQuote, new_adj, new_noun, new_verb) {

  let newContent = newQuote
  fetch(`${quotesURL}/${quoteID}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      adjective: new_adj,
      noun: new_noun,
      verb: new_verb
    })
  })
    .then(response => response.json())
    .then(updatedQuote => {
      let newQuote = new Quote(updatedQuote)
      document.querySelector('.index-container').innerHTML += newQuote.renderQuote()
    })
}


