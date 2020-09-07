
function calcularTela(event){
let tamanhodatela = window.innerWidth
let span = document.querySelector('header a p')
if (tamanhodatela < 1020){
    span.innerHTML = 'Voltar'
} else {
    span.innerHTML = 'Voltar para home'
}
}
calcularTela()