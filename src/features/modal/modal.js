// <button data-open-modal="modalId">

const openButtons = document.querySelectorAll('[data-open-modal]');
const closeButtons = document.querySelectorAll('[data-close-modal]');

const openModal = (element) => {
    document.getElementById('backdrop').style.display = 'block'
    element.style.display = 'block'
    element.classList.add('show')
};

const closeModal = (element) => {
    document.getElementById('backdrop').style.display = 'none'
    element.style.display = 'none'
    element.classList.remove('show')
};

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalID = button.getAttribute('data-open-modal');
        const modalElement = document.getElementById(modalID);
        openModal(modalElement);
    })
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalID = button.getAttribute('data-close-modal');
        const modalElement = document.getElementById(modalID);
        closeModal(modalElement);
    })
})

