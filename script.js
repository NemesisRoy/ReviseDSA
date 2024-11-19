const notes = {}; // Object to store notes

function loadTopic(topic) {
    const editor = document.getElementById('note-editor');
    editor.value = notes[topic] || ''; // Load saved notes or empty
    editor.dataset.topic = topic;
}

function saveNotes() {
    const editor = document.getElementById('note-editor');
    const topic = editor.dataset.topic;

    if (topic) {
        notes[topic] = editor.value; // Save notes to the object
        alert(`Notes for ${topic} saved!`);
    } else {
        alert("No topic selected.");
    }
}

function searchTopics() {
    const query = document.getElementById('search').value.toLowerCase();
    const topics = document.querySelectorAll('#topics-list li');

    topics.forEach(topic => {
        const text = topic.textContent.toLowerCase();
        topic.style.display = text.includes(query) ? 'block' : 'none';
    });
}
