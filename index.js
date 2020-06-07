const baseURL = 'http://localhost:3000/api/v1/'
const templatesURL = `${baseURL}/templates`
const verbsURL = `${baseURL}/verbs`
const nounsURL = `${baseURL}/nouns`
const adjectivesURL = `${baseURL}/adjectives`

document.addEventListener('DOMContentLoaded', () => {
    fetchTemplates()
    // getQuoteInfo()
})

function fetchTemplates() {
    fetch(templatesURL)
    .then(resp => resp.json())
    .then(templates => {
        for (const template of templates){
            renderRandomTemplate(template)
        }
    })
}

// RENDERS RANDOM TEMPLATE 
function renderRandomTemplate(template) {
    //make quote box
    // const quoteBox = document.createElement('div')
    // quoteBox.classList += "quoteBox" 
    // quoteBox.dataset["id"] = template.id 

    let randomTemplate = selectRandom(template)
    console.log(randomTemplate)
    // let quote = data.content
    // let templateId = template.id
    // console.log(quote)

    // form.innerHTML = replaceText(quote, data)
    // formHandler(quote, templateId)
}

// RANDOMIZER
function selectRandom(data) {
    return data[Math.floor(Math.random() * data.length)];
}



