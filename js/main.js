import { supabase } from "./conectionDB.js";

document.addEventListener('DOMContentLoaded', () => {

    const token = localStorage.getItem("sb-nwgcsdldnmihfullqlbs-auth-token")
    const btnLogin = document.getElementById("login")
    const pegarId = JSON.parse(localStorage.getItem("userData"));
    const userId = pegarId.id;
    const modal = document.getElementById("novo-projeto");
    const bootstrapModal = new bootstrap.Modal(modal);

    verificarAdmin();
    carregarPagina();

    async function verificarAdmin() {
        const navAdmin = document.getElementById("admin");

        const { data, error } = await supabase
            .from("Roles")
            .select("isAdmin")
            .eq("user_id", userId)

        if (error) {
            showToast("error", error.message);
            return;
        }

        if (data.length > 0 && data[0].isAdmin === true) {
            navAdmin.classList.add("d-flex");
            navAdmin.classList.remove("d-none");
        } else {
            navAdmin.classList.add("d-none");
            navAdmin.classList.remove("d-flex");
        }
    }

    if (!token) {
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

    async function criarProjeto() {

        const titulo = document.getElementById("tituloProjeto");
        const descricao = document.getElementById("descricaoProjeto");
        const link = document.getElementById("linkRedirecionamento");

        try {
            const { data, error } = await supabase.from("Projects").insert({
                title: titulo.value,
                description: descricao.value,
                link: link.value
            })

            if (error) {
                showToast("error", error.message);
                return;
            }

            carregarPagina();
            showToast("success", "Projeto criado com sucesso");

            titulo.value = '';
            descricao.value = '';
            link.value = '';
            bootstrapModal.hide();

        } catch (e) {
            showToast("error", e.message);
        }
    }

    async function carregarPagina() {
    const cardsContainer = document.getElementById("adicionar-projetos"); 

    try {
        const { data: projetos, error } = await supabase.from("Projects").select("*");
        console.log("Projetos do Supabase:", projetos);
        if (error) {
            showToast("error", error.message);
            return;
        }

        if (projetos && projetos.length > 0) {
            const htmlProjetos = projetos.map(projeto => {
                return `
                    <div class="col-lg-4 col-md-6"> 
                        <div class="card-custom">
                            <div class="card-body">
                                <div class="d-flex align-items-center mb-3">
                                    <div class="icon-box bg-dark text-white rounded-circle p-2 me-3">
                                        <i class="bi bi-kanban-fill"></i> 
                                    </div>
                                    <h4 class="fw-bold m-0 text-primary">${projeto.title}</h4>
                                </div>
                                <hr class="opacity-25 my-3">
                                <p class="text-muted small mb-4">
                                    ${projeto.description}
                                </p>
                                <a href="${projeto.link.startsWith('http') ? projeto.link : 'http://' + projeto.link}" target="_blank" class="btn btn-link text-decoration-none p-0 fw-bold text-dark small">
                                    Saiba Mais <i class="bi bi-arrow-right ms-1"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            cardsContainer.innerHTML += htmlProjetos; 
            
        } 
        
    } catch (e) {
        showToast("error", e.message);
    }
}

    const btnCriarProjeto = document.getElementById("criar-projeto");

    btnCriarProjeto.addEventListener('click', (e) => {
        e.preventDefault();
        criarProjeto();
    })

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