/*document.querySelector("select[name=state]")
          .addEventListener("change", () => {
              console.log('mudei')
          })  */
function estados(){
    let stateSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
    .then( (res) => {return res.json()})
    //    isso de cima é igual a isso também = ( res => res.json )
    .then((states) => {
        for(let state of states ){
            stateSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    })
}

estados()

document
    .querySelector("select[name=uf]")
    .addEventListener("change", cidades)

function cidades(event){
    let citySelect = document.querySelector('select[name=city]')
    let stateInput = document.querySelector('input[name=state]')

    let indexOf = event.target.selectedIndex
    stateInput.value = event.target.options[indexOf].text
    
    let stateValue = event.target.value
    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateValue}/municipios`
    citySelect.innerHTML = '<option value="0">Selecione a cidade</option>'
    citySelect.disabled = true

    fetch(url)
    .then((res)=> {return res.json()} )
    .then((cities)=> {
        for(let cidade of cities){
            citySelect.innerHTML += `<option value="${cidade.nome}">${cidade.nome}</option>`
        }
    citySelect.disabled = false
    })
}

//Itens de coleta
let itensColeta = document.getElementsByTagName('li')
for (let item of itensColeta){
    item.addEventListener('click', itemClicado)
}
// vai receber os itens selecionados:
let itensSelecionados = []
let inputSelecionados = document.querySelector('input[name=itens]')

function itemClicado(event){
    const itemLI = event.target
    itemLI.classList.toggle('selecionado')
    //pega o ID dos itens selecionados
    let IDitem = event.target.dataset.lista
    
    // procurar itens selecionados
    // se existirem itens selecionados, guardar
    const jaSelecionado = itensSelecionados.findIndex(function(item) {
        return item == IDitem
})
      
    // se já estiver selecionado tirar da seleção
    if (jaSelecionado != -1){
        let itensFiltrados = itensSelecionados.filter(item => {
            let itemDiferente = item != IDitem
            return itemDiferente
        })
        itensSelecionados = itensFiltrados
    } else {
        // se não, colocar
        itensSelecionados.push(IDitem)
    }
    
    //guardar no input hidden
    
    inputSelecionados.value = itensSelecionados
}