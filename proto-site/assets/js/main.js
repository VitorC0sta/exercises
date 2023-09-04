const navBar = document.querySelector('.pages-links'); 
const userOptions = document.querySelector('.sign-user');

//Captura o evento de click nas páginas.
navBar.addEventListener('click', e => {
    const event = e.target;
    const pageTag = event.tagName.toLowerCase();

    if(pageTag === 'a') {
        e.preventDefault();
        loadPage(event);
    }
});

//Captura o evento de click nas opções de usuário.
userOptions.addEventListener('click', e => {
    const event = e.target;
    const userOption = event.tagName.toLowerCase();
    if(userOption === 'a') {
        e.preventDefault(event);
        loadPage(event)
    }
});

//Captura o html das páginas e converte em texto.
async function loadPage(event) {
    const href = event.getAttribute('href');
    const response = await fetch(href);
    const html = await response.text();

    try {
        if(response.status !== 200) throw new Error(response.status);
        const insertHTML = loadHTML(html);

    } catch (err) {
        loadHTML(`<h1>${err}</h1>`);
    };
}

//Transforma o texto recebido em html e insere numa div da homepage.
function loadHTML(html) {
    const divForHTML = document.querySelector('.box-result');
    divForHTML.innerHTML = html;
}