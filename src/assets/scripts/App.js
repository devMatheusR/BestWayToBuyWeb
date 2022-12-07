const rua = document.getElementById('inputRua').value;
const bairro = document.getElementById('inputBairro').value;
const cidade = document.getElementById('inputCidade').value;
const estado = document.getElementById('inputEstado').value;
const mercado = document.getElementById('inputName').value;

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('inputRua').value=(conteudo.logradouro);
        document.getElementById('inputBairro').value=(conteudo.bairro);
        document.getElementById('inputCidade').value=(conteudo.localidade);
        document.getElementById('inputEstado').value=(conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        alert("CEP não encontrado.");
    }
}
    
function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('inputRua').value="...";
            document.getElementById('inputBairro').value="...";
            document.getElementById('inputCidade').value="...";
            document.getElementById('inputEstado').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            alert("Cep inválido")
            document.getElementById('formAddMercado').reset();
        }
    } //end if.
    else {
        alert("Cep inválido")
        document.getElementById('formAddMercado').reset();
        //cep sem valor, limpa formulário.

    }
};

const btnAdicionar = document.getElementById('btnSubmitForm');
btnAdicionar.addEventListener('click', formSubmit())

function formSubmit(){

const objMercado = {
    rua: rua,
    cidade: cidade,
    estado: estado,
    nome: mercado,
    bairro: bairro
}
console.log(objMercado);

var ajax = new XMLHttpRequest();

ajax.open("POST", "https://bestwaytobuy.ws/mercados/add", true);
ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

ajax.send({
    rua: rua,
    cidade: cidade,
    estado: estado,
    nome: mercado,
    bairro: bairro
});

ajax.onreadystatechange = function() {
  
	if (ajax.readyState == 4 && ajax.status == 200) {
    
		var data = ajax.responseText;

		
	}
}
}