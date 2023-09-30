const users = JSON.parse(localStorage.getItem('users')) ?? [
    {
        nome: 'Gabriel',
        sobrenome: 'Lima',
        email: 'gabriel@foa.com',
        pass: 'Admin1'
    },
    {
        nome: 'Luiza',
        sobrenome: 'Dias',
        email: 'luiza@foa.com',
        pass: 'Admin1'
    }
]
console.log(users)

// Funcao responsavel por validar o formulario de login
validaLogin = () => {
    var loginUser = document.getElementById('user').value;
    var loginPass = document.getElementById('pass').value;

    // Função para armazenar o usuario logado no navegador
    updateLoginLocalStorage = (nome,sobrenome) => { 
        localStorage.setItem('usuarioLogado', `${nome} ${sobrenome}`);
    }   

    if (loginUser == null || loginUser.indexOf("@") == -1 || loginUser.indexOf(".") == -1) {
        alert("E-mail inválido!");
        document.login.emailLogin.focus();
    }else{
        let notUser = true;
        users.map((user) => {
            // console.log(user)
            if (loginUser == user.email){
                if (loginPass != user.pass){
                    alert('Senha incorreta!');
                    document.login.passLogin.focus();
                    notUser = false;
                    return
                }
                notUser = false;                
                updateLoginLocalStorage(user.nome,user.sobrenome);
                window.location.replace('index.html');
                console.log('Login Efetuado');
                return
            }
        });
        if (notUser == true){
            console.log(`${loginUser} | ${loginPass}`);
            alert("Usuário não encontrado.");
            document.login.emailLogin.focus();
        }
        return false;      
    }
}

// Função para armazenar a lista no navegador
updateUsersLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users));
}

// Funcao para validar o cadastro
validaCadastro = () => {
    // fazer validacao aqui
    var cadUser = document.getElementById('user1').value;
    var cadSen = document.getElementById('pass1').value;
    var cadConf = document.getElementById('passConfirm').value;
    var cadNome = document.getElementById('nome1').value;
    var cadSob = document.getElementById('sob1').value;
    
    let valida = true;
    var senhaPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{6,10}$/;
    // /[a-zA-Z0-9]{6,10}/

    if(cadNome.length <= 2) {
        alert("Nome inválido!");
        document.cadastro.name.focus();
        valida = false;
    }
    else if (cadSob.length <= 2) {
        alert("Sobrenome inválido!");
        document.cadastro.lastname.focus();
        valida = false;
    }
    else if (cadUser == null || cadUser.indexOf("@") == -1 || cadUser.indexOf(".") == -1) {
        alert("E-mail inválido!");
        document.cadastro.email.focus();
        valida = false;
    }
    else if (cadSen.match(senhaPattern)) {
        if (cadConf != cadSen){
            alert("Os campos senha devem ser iguais.");
            document.cadastro.passConfirm.focus();
            valida = false;
        }
        else{
            for(i in users){
                console.log(users[i]);
                if (cadUser == users[i].email){
                    alert("Usuário já cadastrado!");
                    // window.location.replace('login.html');
                    return
                }
            } 
            if (valida == true){
                let user = this.cadastrar();
                users.push(user);
                updateUsersLocalStorage();
                console.log('Cadastro Efetuado');
                console.log(user);
                alert('Cadastro Efetuado');
                window.location.replace('login.html');
            }
            console.log(users);
        }
    }
    else {
        console.log(cadSen)
        alert("A senha deve conter entre 6 e 10 caracteres, uma letra minúscula, uma maiúscula e um número.");
        document.cadastro.pass.focus();
        valida = false;
    }
}

// Funcao que ira cadastrar o usuario inserido
cadastrar = () =>{
    let = user = {}
    user.nome = document.getElementById('nome1').value;
    user.sobrenome = document.getElementById('sob1').value;
    user.email = document.getElementById('user1').value;
    user.pass = document.getElementById('pass1').value;
    return user;
}