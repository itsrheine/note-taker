class Notes {
    constructor(title, text) {
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
        this.title = title;
        this.text = text;

        notes.push(title, text);

        fs.writeFileSync(
            path.join(__dirname, "../data/notes.json")
        );
        return note;
    }
}

module.exports = Notes;