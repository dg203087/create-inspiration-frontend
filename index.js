const baseURL = 'http://localhost:3000/api/v1'
const templatesURL = `${baseURL}/templates`
// const nounsURL = `${baseURL}/nouns`
// const verbsURL = `${baseURL}/verbs`
// const adjectivesURL = `${baseURL}/adjectives`
const quotesURL = `${baseURL}/quotes`
let indexBtn 
let refreshBtn
let postBtn
// let indexContainer

document.addEventListener('DOMContentLoaded', () => {
    fetchRandomTemplate()
    const addWordsForm = document.querySelector('#add-words-form')
    addWordsForm.addEventListener('submit', (e) => createFormHandler(e)) //create event handler to make sure page doesn't refresh

    indexBtn = document.querySelector("#index-button")
    indexBtn.addEventListener("click", fetchQuotes)
      // console.log("this button works")

    refreshBtn = document.querySelector("#refresh-button")
    refreshBtn.addEventListener("click", function() {
      console.log("this button works")
      // document.querySelector("#w3-container").innerHTML = "Hello World"
      // fetch(quotesURL) 
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log(data)
      // });
      //   })
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

function fetchQuotes(){
  let indexContainer = document.querySelector("#w3-container")
  indexContainer.innerHTML = "Hello World"
}


function createFormHandler(e) { //grabbing all input values 
  e.preventDefault()
  const nounInput = document.querySelector('#input-noun').value
  const verbInput = document.querySelector('#input-verb').value
  const adjectiveInput = document.querySelector('#input-adjective').value

  createQuote(nounInput, verbInput, adjectiveInput) 
}

function createQuote(noun, verb, adjective) {
  const nounData = {noun_word: noun}  //build noun object
  const verbData = {verb: verb}
  const adjData = {adjective: adjective}
  
  // const testSent = "Here lies a NOUN. It was super ADJECTIVE, but VERBed away."
  // this is posting to a new quote, not UPDATING the existing one. PATCH? 
  fetch(quotesURL, {
    method: "POST",
    headers: {"Content-Type": "application/json"}, 
    body: JSON.stringify({
      noun: nounData.noun_word,
      verb: verbData.verb_word,
      adjective: adjData.adjective_word
    })
  })
  .then(response => response.json())
  .then(quote => {
    console.log(quote);
  })
  
}

// FETCH RANDOM TEMPLATE 
function fetchRandomTemplate() {
    fetch(templatesURL)
    .then(resp => resp.json())
    .then(templates => {
        let randomTemplateId = templates[Math.floor(Math.random() * templates.length)]
        let randomTemplateContent = randomTemplateId.content
        let templateImage = randomTemplateId.image_url
    
        const currentTemplate = `
        <div data-id=${randomTemplateId.id}> 
          <img src=${templateImage} height="350", width="100%">
          <div class="centered"><h3>${randomTemplateContent}</h3></div>
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
    body: JSON.stringify(templateData) // send data to API
  })
  .then(response => response.json())
  .then(quote => {
    console.log(quote);
  })
}