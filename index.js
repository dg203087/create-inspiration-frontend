const baseURL = 'http://localhost:3000/api/v1/'
const templatesURL = `${baseURL}/templates`

document.addEventListener('DOMContentLoaded', () => {
    fetchRandomTemplate()
    // getQuoteInfo()
    const addWordsForm = document.querySelector('#add-words-form')
    addWordsForm.addEventListener('submit', (e) => createFormHandler(e)) //create event handler to make sure page doesn't refresh
})

// FETCH RANDOM TEMPLATE 
function fetchRandomTemplate() {
    fetch(templatesURL)
    .then(resp => resp.json())
    .then(templates => {
        let randomTemplateId = templates[Math.floor(Math.random() * templates.length)]
        let randomTemplateContent = randomTemplateId.content
        let templateImage = randomTemplateId.image_url
        // renderTemplate(randomTemplateContent) 
        const currentTemplate = `
        <div data-id=${randomTemplateId.id}> 
          <img src=${templateImage} height="350", width="400">
          <div class="centered"><h3>${randomTemplateContent}</h3></div>
        </div>
        `
        document.querySelector('.template-container').innerHTML += currentTemplate
    })
}

function createFormHandler(e) { //grabbing all input values 
    e.preventDefault()
    const nounInput = document.querySelector('#input-noun').value
    const verbInput = document.querySelector('#input-verb').value
    const adjectiveInput = document.querySelector('#input-adjective').value
    postFetch(nounInput, verbInput, adjectiveInput) 
}

// POST 
function postFetch(noun, verb, adjective){
    // const quoteData = {noun, verb, adjective}
    // const noun = noun
    // const verb = verb
    // const adjective = adjective

  fetch(endPoint, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(quoteData)
  })
  .then(response => response.json())
  // .catch(err => console.log(err))
  .then(quote => {
    console.log(quote);
   
  })
}


// RENDER TEMPLATE REFACTOR 
// function renderTemplate(template) {
//     const currentTemplate = document.createElement('div')
//     currentTemplate.classList += "template" 
//     currentTemplate.dataset["id"] = template.id 

//     document.querySelector('#template-container').innerHTML += currentTemplate

//     form.innerHTML = replaceText(quote, data)
//     formHandler(quote, templateId)
// }




