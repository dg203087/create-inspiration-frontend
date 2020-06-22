class Quote {
    constructor(quoteAttributes) {
        this.id = quoteAttributes.id
        this.adjective = quoteAttributes.adjective
        this.verb = quoteAttributes.verb
        this.noun = quoteAttributes.noun
        this.image_url = quoteAttributes.template.image_url
        this.content = quoteAttributes.template.content
        this.newQuote = newQuote
        Quote.all.push(this);
    }
        
     renderQuote() {
        return `
        <div data-id=${this.id}> 
          <img src=${this.image_url} height="350", width="100%">
          <div class="bottom-centered"><h3>${this.newQuote}</h3></div>
        </div>
        <br><br>
        `
     }
}

//array of all quote objects
Quote.all = []
