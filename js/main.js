import { supabase } from "./conectionDB.js";

document.addEventListener('DOMContentLoaded', () => {

    const token = localStorage.getItem("sb-nwgcsdldnmihfullqlbs-auth-token");
    const pegarId = JSON.parse(localStorage.getItem("userData"));
    const userId = pegarId.id;
    const modalProjeto = document.getElementById("novo-projeto");
    const bootstrapModalProjeto = new bootstrap.Modal(modalProjeto);
    const modalCurso = document.getElementById("novo-curso");
    const bootstrapModalCurso = new bootstrap.Modal(modalCurso);
    const btnSair = document.getElementById("sair");

    alternarBotoes(token);
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

        const adminDropdownLi = document.getElementById("admin-dropdown-li");
        const adminDropdownLink = document.getElementById("admin-dropdown");

        if (error) {
            showToast("error", error.message);
            return;
        }

        if (data.length > 0 && data[0].isAdmin === true) {
            adminDropdownLink.classList.remove("d-none");
            adminDropdownLink.classList.add("d-flex");
        } else {
            adminDropdownLink.classList.add("d-none");
            adminDropdownLink.classList.remove("d-flex");
        }
    }

    function alternarBotoes(token) {
        const btnLogin = document.getElementById("login");
        const btnSair = document.getElementById("sair");

        if (!btnLogin || !btnSair) {
            console.error("Um ou ambos os botões (btnLogin, btnSair) não foram encontrados no DOM.");
            return;
        }

        if (!token) {
            btnLogin.classList.add("d-flex");
            btnLogin.classList.remove("d-none");

            btnSair.classList.add("d-none");
            btnSair.classList.remove("d-flex");
        } else {
            btnSair.classList.add("d-flex");
            btnSair.classList.remove("d-none");

            btnLogin.classList.add("d-none");
            btnLogin.classList.remove("d-flex");
        }
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

    async function criarCurso() {

        const titulo = document.getElementById("tituloCurso");
        const descricao = document.getElementById("descricaoCurso");
        const link = document.getElementById("linkCurso");
        const tempo = document.getElementById("tempoCurso");
        const status = document.getElementById("statusCurso");

        try {
            const { data, error } = await supabase.from("Courses").insert({
                title: titulo.value,
                description: descricao.value,
                link: link.value,
                time: parseInt(tempo.value),
                visible: status.value === "true"
            })

            if (error) {
                showToast("error", error.message);
                return;
            }

            carregarPagina();
            showToast("success", "Curso criado com sucesso");

            titulo.value = '';
            descricao.value = '';
            link.value = '';
            tempo.value = '';
            status.value = 'true';
            bootstrapModalCurso.hide();

        } catch (e) {
            showToast("error", e.message);
        }
    }

    function sair() {
        alternarBotoes(null)
        localStorage.removeItem("userData");
        localStorage.removeItem("sb-nwgcsdldnmihfullqlbs-auth-token");
    }

    btnSair.addEventListener('click', (e) => {
        e.preventDefault();
        sair();
    })

    async function criarProjeto() {

        const titulo = document.getElementById("tituloProjeto");
        const descricao = document.getElementById("descricaoProjeto");
        const link = document.getElementById("linkRedirecionamento");
        const status = document.getElementById("statusProjeto");

        try {
            const { data, error } = await supabase.from("Projects").insert({
                title: titulo.value,
                description: descricao.value,
                link: link.value,
                visible: status.value === "true"
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
            status.value = 'true';
            bootstrapModalProjeto.hide();

        } catch (e) {
            showToast("error", e.message);
        }
    }

    async function carregarPagina() {
        const cardsContainer = document.getElementById("adicionar-projetos");
        const cursosContainer = document.getElementById("cursos").querySelector(".row.g-4");
        try {
            const { data: projetos, error } = await supabase.from("Projects").select("*").eq("visible", true);
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

            const { data: cursos, error: cursosError } = await supabase.from("Courses").select("*").eq("visible", true);

            if (cursosError) {
                showToast("error", cursosError.message);
                return;
            }

            if (cursos && cursos.length > 0) {
                const htmlCursos = cursos.map(curso => {
                    let iconClass = 'bi-book';
                    let badgeClass = 'bg-secondary';
                    let badgeText = 'N/A';
                    let link = '#';

                    switch (curso.title) {
                        case 'Engenharia de Software':
                            iconClass = 'bi-code-slash';
                            badgeClass = 'bg-primary';
                            badgeText = '4 Anos';
                            link = 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/cornelio-procopio/cp-engenharia-de-software';
                            break;
                        case 'Engenharia Elétrica':
                            iconClass = 'bi-lightning-charge';
                            badgeClass = 'bg-danger';
                            badgeText = '5 Anos';
                            link = 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/cornelio-procopio/cp-engenharia-eletrica';
                            break;
                        case 'Engenharia Mecânica':
                            iconClass = 'bi-gear';
                            badgeClass = 'bg-warning text-dark';
                            badgeText = '5 Anos';
                            link = 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/cornelio-procopio/cp-engenharia-mecanica';
                            break;
                        case 'Análise e Desenv. Sistemas':
                            iconClass = 'bi-laptop';
                            badgeClass = 'bg-success';
                            badgeText = '3 Anos';
                            link = 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/cornelio-procopio/cp-tecnologia-em-analise-e-desenvolvimento-de-sistemas';
                            break;
                        case 'Matemática':
                            iconClass = 'bi-calculator';
                            badgeClass = 'bg-info text-dark';
                            badgeText = '4 Anos';
                            link = 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/cornelio-procopio/cp-licenciatura-em-matematica';
                            break;
                        default:

                            link = curso.link || '#';
                            badgeText = curso.time ? `${curso.time} Anos` : 'N/A';
                            break;
                    }

                    return `
                    <div class="col-lg-4 col-md-6">
                        <div class="card-custom">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-4">
                                    <div class="icon-box text-primary fs-2">
                                        <i class="bi ${iconClass}"></i>
                                    </div>
                                    <span class="badge ${badgeClass} badge-custom">${badgeText}</span>
                                </div>
                                <h4 class="fw-bold mb-3">${curso.title}</h4>
                                <p class="text-muted mb-4">
                                    ${curso.description}
                                </p>
                                <a
                                    href="${link}"
                                    target="_blank"
                                    class="btn btn-outline-custom w-100 mt-auto btn-sm"
                                    >Saiba Mais</a
                                >
                            </div>
                        </div>
                    </div>
                `;
                }).join('');

                cursosContainer.innerHTML += htmlCursos;
            }

        } catch (e) {
            showToast("error", e.message);
        }
    }

    const btnCriarProjeto = document.getElementById("criar-projeto");
    const btnCriarCurso = document.getElementById("criar-curso");
    btnCriarProjeto.addEventListener('click', (e) => {
        e.preventDefault();
        criarProjeto();
    })

    btnCriarCurso.addEventListener('click', (e) => {
        e.preventDefault();
        criarCurso();
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