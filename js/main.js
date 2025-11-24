import { supabase } from "./conectionDB.js";

document.addEventListener('DOMContentLoaded', () => {

    const token = localStorage.getItem("sb-nwgcsdldnmihfullqlbs-auth-token")
    const btnLogin = document.getElementById("login")
    
    if(!token){
        btnLogin.classList.add("d-flex")
        btnLogin.classList.remove("d-none")
    } else {
        btnLogin.classList.add("d-none")
        btnLogin.classList.remove("d-flex")
    }

    if (window.toastr) {
        window.toastr.options = {
            closeButton: true,
            progressBar: true,
            positionClass: "toast-bottom-right",
            timeOut: "3000",
        };
    }

    function showToast(type, message) {
        if (window.toastr) {
            window.toastr[type](message);
        } else {
            console.warn(`Toastr indisponível. Mensagem: ${message}`);
        }
    }

    const form = document.getElementById('form-contato');

    const inputNome = document.getElementById("nome");
    const inputEmail = document.getElementById("email");
    const inputAssunto = document.getElementById("assunto");
    const inputDescricao = document.getElementById("descricao"); 

    function showToast(type, message) {
        if (window.toastr) {
            window.toastr[type](message);
        } else {
            console.warn(`Toastr indisponível. Mensagem: ${message}`);
        }
    }
    
    async function criarDuvida() {
        const nomeValor = inputNome.value;
        const emailValor = inputEmail.value;
        const assuntoValor = inputAssunto.value;
        const descricaoValor = inputDescricao.value;

        try {
            const { data, error } = await supabase.from("Questions").insert({
                name: nomeValor,
                email: emailValor,
                subject: assuntoValor,
                description: descricaoValor
            });

            if (error) {
                console.error("Erro do Supabase:", error);
                showToast("error", "Erro ao enviar a dúvida: " + error.message);
                return false; 
            }

            console.log("Dados Inseridos:", data);
            showToast("success", "Dúvida enviada com sucesso!");
            return true; 
            
        } catch (e) {
            console.error("Erro inesperado:", e);
            showToast("error", "Ocorreu um erro inesperado. Tente novamente.");
            return false;
        }
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const sucesso = await criarDuvida(); 

            if (sucesso) {
                form.reset();
            }
        });
    }
    
});