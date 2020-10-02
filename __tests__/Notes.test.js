const Notes = require('../lib/Notes');

test('creates a note object', () => {
    const note = new Notes('Story Title', 'All text notes here.');

    expect(note.title).toBe('Story Title');
    expect(note.text).toBe('All text notes here.');
});

test('get note title value', () => {
    const note = new Notes('Story Title');

    expect(note.getTitle()).toBe('Story Title');
});

test('get note text value', () => {
    const note = new Notes('Story Title', 'All text notes here.');

    expect(note.getText()).toBe('All text notes here.');
});

