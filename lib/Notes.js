class Notes {
    constructor (title, text) {
        this.title = title;
        this.text = text;
    }

    getTitle() {
        return this.title;
    }

    getText() {
        return this.text;
    }

    getData() {
        return{
            title: this.title,
            text: this.text
        }
    }
}

module.exports = Notes;