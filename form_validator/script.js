// Seleciona os elementos do DOM que vamos manipular
const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2'); // Confirmar Senha

// Função para mostrar mensagem de erro
function showError(input, message) {
    const formControl = input.parentElement; // Pega o div 'form-control' pai
    formControl.className = 'form-control error'; // Adiciona a classe 'error' para estilização
    const small = formControl.querySelector('small'); // Seleciona o elemento 'small' para a mensagem
    small.textContent = message; // Define o texto da mensagem de erro
}

// Função para mostrar sucesso (remover classes de erro)
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'; // Adiciona a classe 'success'
    const small = formControl.querySelector('small'); // Limpa a mensagem de erro anterior, se houver
    small.textContent = ''; 
}

// Função para verificar se o email é válido usando Regex (Expressão Regular)
function isValidEmail(input) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validação de email
    if (re.test(input.value.trim())) { // Testa o valor do input contra a regex
        showSuccess(input);
        return true;
    } else {
        showError(input, 'Email não é válido');
        return false;
    }
}

// Função para verificar campos obrigatórios (vazios)
function checkRequired(inputArr) {
    let isFormValid = true;
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') { // .trim() remove espaços em branco antes/depois
            showError(input, `${getFieldName(input)} é obrigatório`);
            isFormValid = false;
        } else {
            showSuccess(input);
        }
    });
    return isFormValid;
}

// Função para verificar o comprimento do campo (mínimo e máximo)
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} deve ter pelo menos ${min} caracteres`);
        return false;
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} deve ter no máximo ${max} caracteres`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

// Função para verificar se as senhas coincidem
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'As senhas não coincidem');
        return false;
    } else {
        // Se as senhas coincidem, o sucesso será determinado pela validação de comprimento da senha1
        // showSuccess(input2); // Não chamar showSuccess aqui para evitar sobrescrever erro de comprimento na senha1
        return true;
    }
}

// Função auxiliar para obter o nome "amigável" do campo para as mensagens
function getFieldName(input) {
    // Pega o id do input e substitui '_' por ' ' e capitaliza a primeira letra
    return input.id.charAt(0).toUpperCase() + input.id.slice(1).replace('2', ''); 
}

// EVENT LISTENERS: Escuta o evento de 'submit' do formulário
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o envio padrão do formulário (que recarregaria a página)

    // Executa todas as validações quando o formulário é enviado
    const isRequiredValid = checkRequired([username, email, password, password2]); // Primeiro verifica se campos obrigatórios estão preenchidos

    if (isRequiredValid) { // Só continua com as validações de formato e comprimento se os campos não estiverem vazios
        const isEmailValid = isValidEmail(email);
        const isUsernameLengthValid = checkLength(username, 3, 15); // Nome de usuário entre 3 e 15 caracteres
        const isPasswordLengthValid = checkLength(password, 6, 25); // Senha entre 6 e 25 caracteres
        const doPasswordsMatch = checkPasswordsMatch(password, password2);

        // Se todas as validações passarem, o formulário é considerado válido
        if (isEmailValid && isUsernameLengthValid && isPasswordLengthValid && doPasswordsMatch) {
            alert('Formulário enviado com sucesso!'); // Mensagem de sucesso!
            form.reset(); // Limpa o formulário
            // Opcional: remover classes de sucesso após um tempo
            // [username, email, password, password2].forEach(input => {
            //     setTimeout(() => input.parentElement.className = 'form-control', 2000);
            // });
        }
    }
});