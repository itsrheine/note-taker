const $noteForm = document.querySelector('#note-form');

const handleNoteFormSubmit = event => {
    event.preventDefault();

    // get zookeeper data and organize it
    const title = $noteForm.querySelector('[name="note-title"]').value;
    const note = $noteForm.querySelector('[name="note-text"]').value;

    const noteObj = { title, note };
    console.log(noteObj);

    fetch('api/notes', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteObj)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            alert('Error: ' + response.statusText);
        })
        .then(postResponse => {
            console.log(postResponse);
            alert('Thank you for adding your note!');
        });
};

$noteForm.addEventListener('submit', handleNoteFormSubmit);