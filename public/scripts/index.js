const botaoSearch = document.querySelector('#page-home main a')
const modal = document.getElementById('modal')
botaoSearch.addEventListener('click', () => {
        modal.classList.remove('hide')
})

const fechar = document.querySelector('#modal .header a')
fechar.addEventListener('click', () => {
        modal.setAttribute('class', 'hide')
})