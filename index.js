const baseURL = 'http://localhost:3000/api/v1/'
const templatesURL = `${baseURL}/templates`
const verbsURL = `${baseURL}/verbs`
const nounsURL = `${baseURL}/nouns`
const adjectivesURL = `${baseURL}/adjectives`

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
        // renderTemplate(randomTemplateContent) 
        const currentTemplate = `
        <div data-id=${randomTemplateId.id}> 
        <h3>${randomTemplateContent}</h3>
        <button>Submit</button>
        `
        document.querySelector('.template-container').innerHTML += currentTemplate
    })
}

function createFormHandler(e) { //grabbing all input values
    e.preventDefault()
    
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




