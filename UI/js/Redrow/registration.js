export default function drowRegistration() {
    document.body.innerHTML = "";
    

    const joinUser = `
    <div class="container">
        <h1 class="head">Регистрация</h1>
        <form action="" class="join-form" onsubmit="controller.registration(this.name.value)">
            <input type="text" id="name" name="name" class="login form-string" placeholder="Логин" required >
            <input type="password" class="password form-string" placeholder="Пароль" required >
            <input type="password" class="password form-string" placeholder="Повторите пароль" required >
            <button href="#"  id="create" class="button"  type="submit">Создать аккаунт</button>
            <div class="links">
                <a href="#" id="exit" class="link link-have">Уже есть аккаунт?</a>
                <a href="#" class="link">Войти как гость</a>
            </div>
        </form>
    </div>
    ` 
    document.body.innerHTML += joinUser;
}