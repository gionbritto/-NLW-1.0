document.addEventListener("DOMContentLoaded", function () {
    populateUFs();
    document.querySelector("select[name=uf]").addEventListener("change", getCities);
    const itemsToCollect = document.querySelectorAll(".items-grid li");
    addEventsToLis(itemsToCollect);
    collectedItems = document.querySelector("input[name=items]");
});

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        });
}

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const ufValue = event.target.value;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value=''>Selecione a Cidade</option>";
    citySelect.disabled = true;
    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }
            citySelect.disabled = false;
        });
}

//Itens de coleta
//pegar todos os lis
function addEventsToLis(itemsToCollect) {
    for (const item of itemsToCollect) {
        item.addEventListener('click', handleSelectedItem);
    }
}

var collectedItems;
let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;
    console.log(itemId);
    //verificar se existem itens selecionados
    const alreadySelected = selectedItems.findIndex(function (item) {
        return item == itemId;
    });

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })
        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);
    }
    
    console.log(selectedItems);
    collectedItems.value = selectedItems;

}
