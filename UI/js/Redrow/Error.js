export default function drowError() {
const mainPage = document.getElementById('wrapper');
    mainPage.style.display = 'none';
    const last = document.getElementById('second_page');
    last.innerHTML = "";

    const error = `
    <div class="error-container">
        <h1>Error"(("</h1>
        <button class="error" id="button-error" onclike="controller.drowJoin()>Перейти на страницу входа</button>
    </div>`;
    
    last.innerHTML = error;
}