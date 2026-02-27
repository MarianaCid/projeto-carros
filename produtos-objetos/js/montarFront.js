import { objetos } from "./objetos.js";
import { formatarMoeda } from "./formatarMoeda.js";

const gridCards = document.querySelector('#gridCards');
const botoesFiltro = document.querySelectorAll('.filtro');
const buscasRealizadas = document.querySelector('#buscasRealizadas');

const arrayBuscas = [];

const formBusca = document.querySelector('#busca');
const txtBusca = document.querySelector('#txtBusca');

formBusca.addEventListener('submit', (e) => {
    e.preventDefault();

    const termo = txtBusca.value.trim().toLocaleLowerCase();

    if(termo.length < 3){
        alert('Digite no mínimo 3 caracteres');
        return;
    }

    const resultadoBusca = objetos.filter(objeto =>
       objeto.nome.toLocaleLowerCase().includes(termo) || objeto.categoria.toLocaleLowerCase().includes(termo) 
    );

    arrayBuscas.push(termo);

    buscasRealizadas.textContent = arrayBuscas.join(' | ');

    mostrarCards(resultadoBusca);

    txtBusca.value = "";
})

function mostrarCards(lista){

    gridCards.innerHTML='';

    lista.forEach(objeto => {
        gridCards.innerHTML += `
        <div class="col-md-6 col-lg-4 my-3">
        <a href="" class="text-decoration-none">
        <div class="card">
        <img src="${objeto.imagem}" class="card-img-top img-fluid"  style="height: 270px; object-fit: cover  alt="${objeto.nome} - ${objeto.categoria}">
        <div class="card-body">
        <h5 class="card-title">${objeto.nome}</h5>
        <div class="d-flex justify-content-end m-0 mb-2">
        <p>${objeto.categoria}</p>
        </div>
        <h4 class="text-center text-danger">${formatarMoeda(objeto.preco)}</h4>
        </div>
        </div>
        </a>
        </div>
        `
    });

    document.querySelector('#totalProdutos').textContent = lista.length;

}

mostrarCards(objetos);

function aplicarFiltro(tipo){

    let filtrados = [];
    switch (tipo) {
        case 'celular':
            filtrados = objetos.filter(objeto => objeto.categoria.toLocaleLowerCase() === 'celular')
            break;
        
        case 'televisao':
            filtrados = objetos.filter(objeto => objeto.categoria.toLocaleLowerCase() === 'televisão')
            break;

        case 'notebook':
            filtrados = objetos.filter(objeto => objeto.categoria.toLocaleLowerCase() === 'notebook')
            break;

        case 'perifericos':
            filtrados = objetos.filter(objeto => objeto.categoria.toLocaleLowerCase() === 'periféricos')
            break;

        case 'audio':
            filtrados = objetos.filter(objeto => objeto.categoria.toLocaleLowerCase() === 'áudio')
            break;

        case 'games':
            filtrados = objetos.filter(objeto => objeto.categoria.toLocaleLowerCase() === 'games')
            break;

        default:
            filtrados = objetos;
    }

    
    mostrarCards(filtrados);
}

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const tipo = e.target.dataset.filtro;
        aplicarFiltro(tipo);
    })
})
