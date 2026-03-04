document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.size-dropdown-custom');
    const header = dropdown.querySelector('.dropdown-header');
    const listItems = dropdown.querySelectorAll('.dropdown-list li');
    const currentSizeText = document.getElementById('current-size');

    header.addEventListener('click', () => {
        dropdown.classList.toggle('active');
    });

    listItems.forEach(item => {
        item.addEventListener('click', function() {
            currentSizeText.innerText = this.innerText;
            dropdown.classList.remove('active');
        });
    });

    window.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});