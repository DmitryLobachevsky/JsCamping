export default function drowRegistration() {
    const mainPage = document.getElementById('wrapper');
    mainPage.style.display = 'none';
    const last = document.getElementById('second_page');
    last.innerHTML = "";
    

    const joinUser = `
    <div class="container">
        <h1 class="head">Регистрация</h1>
        <form action="" class="join-form" >
            <input type="text" id="name" name="name" class="login form-string" placeholder="Логин" autocomplete="off" required >
            <input type="password" class="password form-string" placeholder="Пароль"  >
            <input type="password" class="password form-string" placeholder="Повторите пароль"  >
            <button href="#"  id="create" class="button" onclick="controller.registration()"  type="submit">Создать аккаунт</button>
            <div class="links">
                <a href="#" id="exit" class="link link-have">Уже есть аккаунт?</a>
                <a href="#" class="link">Войти как гость</a>
            </div>
        </form>
    </div>
    ` 
    last.innerHTML += joinUser;
}