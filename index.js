const baseURL = 'http://localhost:3000/api/v1'
const quotesURL = `${baseURL}/quotes`
const nounsURL = `${baseURL}/nouns`
const templatesURL = `${baseURL}/templates`
let indexBtn 
let clearBtn
let postBtn
let randomTemplateId
let quoteID
let quoteArray
let newAdj
let newNoun
let newVerb
// let indexContainer

document.addEventListener('DOMContentLoaded', () => {
    fetchRandomTemplate()
    const addWordsForm = document.querySelector('#add-words-form')
    addWordsForm.addEventListener('submit', (e) => createFormHandler(e)) //create event handler to make sure page doesn't refresh

    clearBtn = document.querySelector("#clear-button")
    clearBtn.addEventListener("click", function(){
      document.getElementById('add-words-form').reset()
      const container = document.querySelector(".template-container")
      container.innerHTML = ''
      fetchRandomTemplate()
    })

    postBtn = document.querySelector("#post-button")
    postBtn.addEventListener("click", function() {
      console.log("this button works")
      // document.querySelector("#w3-container").innerHTML = "Hello World"
      // fetch(quotesURL) 
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log(data)
      // });
      //   })
    })
})

// function fetchQuotes(){
//   let indexContainer = document.querySelector("#w3-container")
//   indexContainer.innerHTML = "Hello World"
// }


function createFormHandler(e) { //grabbing all input values 
  e.preventDefault()
  const nounInput = document.querySelector('#input-noun').value
  const verbInput = document.querySelector('#input-verb').value
  const adjectiveInput = document.querySelector('#input-adjective').value

  // fetchRandomTemplate()
  quoteID = quoteID
  updateQuote(quoteID, nounInput, verbInput, adjectiveInput) 
}

function updateQuote(quoteID, noun, verb, adjective) {
   // const quoteData = {quoteID} //{id: quoteID}
  const adjData = adjective //{adj_word: adjective}
  const nounData = noun//{noun_word: noun}  //build noun object
  const verbData = verb //{verb_word: verb}
  quoteArray = quoteArray.template.content
  
  const verbFind = (quoteArray.match(new RegExp("VERB", 'g')))
  const nounFind = (quoteArray.match(new RegExp("NOUN", 'g')))
  const adjectiveFind = (quoteArray.match(new RegExp("ADJECTIVE", 'g')))

  let newQuote = quoteArray

  newQuote = newQuote.replace(nounFind, nounData)
  newQuote = newQuote.replace(adjectiveFind, adjData);
  newQuote = newQuote.replace(verbFind, verbData);
  console.log(newQuote)
  
  const newTemplate = `
    <div class="centered"><h3>${newQuote}</h3></div>
  </div>
  `
  document.querySelector('.centered').innerHTML += newTemplate
  // postTemplate(newQuote)
  // postQuote(newQuote, quoteID)
}

// function postQuote(newQuote, quoteID) {

  // let newContent = newQuote
  // fetch(`${quotesURL}/${quoteID}`, {
  //   method: "PATCH",
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     template: newContent
  //   })
  // })
  //   .then(response => response.json())
  //   .then(updatedQuote => {
  //     console.log(updatedQuote)
  //   })
// }


// FETCH RANDOM TEMPLATE 
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

// POSTS TEMPLATE TO QUOTE
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

