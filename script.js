// Modal functions
function openModal(category) {
    const modal = document.getElementById('downloadModal');
    modal.style.display = 'flex'; // Use flex to keep alignment
}

function closeModal() {
    const modal = document.getElementById('downloadModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('downloadModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Form toggles for "Khác" options
function toggleOtherTopic(show) {
    const input = document.getElementById('other-topic-input');
    if (show) {
        input.style.display = 'block';
        input.setAttribute('required', 'true');
        input.focus();
    } else {
        input.style.display = 'none';
        input.removeAttribute('required');
        input.value = ''; // clear when hidden
    }
}
