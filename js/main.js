document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('form-contato');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            alert("Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.");
            
            form.reset();
        });
    }
 
    const sections = document.querySelectorAll("section, header");
    const navLinks = document.querySelectorAll(".nav-link");

    window.onscroll = () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    };
});