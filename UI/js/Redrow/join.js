export default function drowJoin() {
    const mainPage = document.getElementById('wrapper');
    mainPage.style.display = 'none';
    const last = document.getElementById('second_page');
    last.innerHTML = "";

    const joinUser = `
    <div class="unit" id="unit">Данного пользователя не существует</div>
    <div class="container">
        <h1 class="head">Добро пожаловать</h1>
        <form action="" class="join-form">
            <input type="text" id="name" class="login form-string" placeholder="Логин" required >
            <input type="password" id="pass" class="password form-string" placeholder="Пароль" required>
            <a href="#" class="button" onclick="controller.join()" >Войти</a>
            <div class="buttons">
                <a href="#" class="button-join">Войти как гость</a>
                <a href="#" id="registration" class="button-join">Создать аккаунт</a>
            </div>
        </form>
    </div>
    `;
    last.innerHTML += joinUser;
}