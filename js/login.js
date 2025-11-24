import { supabase } from "../js/conectionDB.js";

if (window.toastr) {
    window.toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-bottom-right",
        timeOut: "3000",
    };
}

const select = id => document.getElementById(id);

const [
    emailLogin, passwordLogin, nameLogon, emailLogon, passwordLogon, cofirmPassword
] = [
    'email-login', 'password-login', 'name-logon', 'email-logon', 'password-logon', 'password-confirm-logon'
].map(select);

const formLogin = document.getElementById("form-login");
const formLogon = document.getElementById("form-logon")
const backWindow = document.getElementById("back-window");
const switchLogon = document.getElementById("switch-logon");
let isLoginMode = true;

function showToast(type, message) {
    if (window.toastr) {
        window.toastr[type](message);
    } else {
        console.warn(`Toastr indisponível. Mensagem: ${message}`);
    }
}

function alterForm() {

    if (isLoginMode) {
        formLogin.classList.add('d-flex');
        formLogin.classList.remove('d-none');

        formLogon.classList.remove('d-flex');
        formLogon.classList.add('d-none');

        document.title = 'Login'
    }
    else {
        formLogon.classList.add('d-flex');
        formLogon.classList.remove('d-none');

        formLogin.classList.remove('d-flex');
        formLogin.classList.add('d-none');

        document.title = 'Cadastro'
    }
}

async function login() {

    const email = emailLogin.value;
    const password = passwordLogin.value;

    if (!email || !password) {
        showToast("warning", "Por favor, preencha todos os campos.");
        return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error("Erro de autenticação do Supabase:", error);
        if (
            error.message.includes("Invalid login credentials") ||
            error.message.includes("Email not confirmed")
        ) {
            showToast("error", "Email ou senha inválidos. Por favor, tente novamente.");
        } else {
            showToast("error", "Ocorreu um erro. Tente novamente mais tarde.");
        }
        return;
    }


    const user = data.user;
    const userName = user.email.split("@")[0];

    localStorage.setItem("userName", userName);
    localStorage.setItem("userData", JSON.stringify(user));

    showToast("success", `Bem-vindo, ${userName}!`);
    setTimeout(() => (window.location.href = "../index.html"), 3000);
}

async function logon() {
    const name = nameLogon.value
    const email = emailLogon.value
    const password = passwordLogon.value
    const confirmPassword = cofirmPassword.value

    if (!email || !password || !name || !confirmPassword) {
        showToast("warning", "Por favor, preencha todos os campos.");
        return;
    }

    if (password.length < 8) return showToast("warning", "A senha deve ter pelo menos 8 caracteres");

    if (password != confirmPassword) {
        showToast('error', 'As senhas devem ser iguais!')
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { name: name },
            },
        });

        if (error) {
            showToast("error", `Erro ao criar conta: ${error.message}`);
            if (submitButton) submitButton.disabled = false;
            return;
        }

        showToast("success", "Conta criada com sucesso!")
        isLoginMode = true;
        setTimeout(() => alterForm(), 3000)
            ;
    } catch (err) {
        showToast("error", "Ocorreu um erro inesperado. Tente novamente.");
        console.error(err);
    }

}

formLogin.addEventListener('submit', (e) => {
    e.preventDefault()
    login()
})

formLogon.addEventListener('submit', (e) => {
    e.preventDefault()
    logon()
})

switchLogon.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = false
    alterForm();
})

backWindow.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = true
    alterForm();
})