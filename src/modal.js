const btnOpenModal = document.getElementById("btn-side-bar");
const btnCloseModal =document.querySelector(".close-modal")
const modal = document.querySelector(".modal_create_project");
export function openModal(){
    modal.showModal();
}
export function closeModal(){
    modal.close();
}

btnOpenModal.addEventListener("click",openModal);
btnCloseModal.addEventListener("click", closeModal)