// // Followed `web dev simplified`'s tutorial video on modals: https://www.youtube.com/watch?v=MBaw_6cPmAw
// const openModalButtons = document.querySelectorAll(`[data-modal-target]`);
// const closeModalButtons = document.querySelectorAll(`[data-close-button]`);
// const overlay = document.getElementById(`overlay`);

// openModalButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const modal = document.querySelector(button.dataset.modalTarget);
//         openModal(modal);
//     });
// })

// overlay.addEventListener(`click`, () => {
//     const modals = document.querySelectorAll(`.modal.active`);
//     modals.forEach(modal => {
//         closeModal(modal);
//     })
// })

// closeModalButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const modal = button.closest(`.modal`);
//         closeModal(modal);
//     });
// })

function openModal (modal) {
    if (modal == null) {return}
    modal.classList.add(`active`);
    myOverlay.classList.add(`active`);
}

function closeModal (modal) {
    if (modal == null) {return}
    modal.classList.remove(`active`);
    myOverlay.classList.remove(`active`);
}
// Followed `web dev simplified`'s tutorial video on modals: https://www.youtube.com/watch?v=MBaw_6cPmAw

const myModalButton = document.getElementById(`my-modal`);
const myModal = document.getElementById(`modal`);
const myOverlay = document.getElementById(`overlay`);

myModalButton.addEventListener(`click`, () => {
    openModal(myModal);
    console.log(`button clicked`);
})

document.getElementById(`close-btn`).addEventListener(`click`, () => {
    closeModal(myModal);
})

myOverlay.addEventListener(`click`, () => {
    const modals = document.querySelectorAll(`.modal.active`);
    modals.forEach(modal => {
        closeModal(modal);
    })
})