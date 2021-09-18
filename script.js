let btn = document.querySelector('#app form button')
let input = document.querySelector('#app form input')
let content = document.querySelector('#app main')

btn.addEventListener('click', function(event) {
    event.preventDefault()

    let cep = input.value
    cep = cep.replaceAll(' ', '')
    cep = cep.replaceAll('.', '')
    cep = cep.replaceAll('-', '')

    axios
        .get('https://viacep.com.br/ws/' + cep + '/json/')
        .then(function(response) {
            if (response.data.erro) {
                throw new Error()
            }

            content.innerHTML = ''
            createLine(response.data.logradouro)
            createLine('Bairro ' + response.data.bairro)
            createLine(response.data.localidade)
            createLine(response.data.uf)
        })
        .catch(function(error) {
            content.innerHTML = ''
            createLine('Ops, algo deu errado!')
        })

    function createLine(text) {
        let line = document.createElement('p')
        let texto = document.createTextNode(text)

        line.appendChild(texto)
        content.appendChild(line)
    }


})