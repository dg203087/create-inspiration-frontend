class Quote {
    constructor(id, quoteAttributes) {
        this.id = id
        this.adjective = quoteAttributes.adjective
        this.verb = quoteAttributes.verb
        this.noun = quoteAttributes.noun
        this.image_url = quoteAttributes.template.image_url
        this.content = syllabusAttributes.template.content
        Quote.all.push(this);
}
