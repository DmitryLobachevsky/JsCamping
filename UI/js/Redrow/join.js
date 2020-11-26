export default function drowJoin() {
    document.body.innerHTML = "";

    const joinUser = `
    <div class="container">
        <h1 class="head">Добро пожаловать</h1>
        <form action="" class="join-form">
            <input type="text" class="login form-string" placeholder="Логин" required >
            <input type="password" class="password form-string" placeholder="Пароль" required >
            <a href="#" class="button">Войти</a>
            <div class="buttons">
                <a href="#" class="button-join">Войти как гость</a>
                <a href="#" id="registration" class="button-join">Создать аккаунт</a>
            </div>
        </form>
    </div>
    `;
    document.body.innerHTML += joinUser;
}