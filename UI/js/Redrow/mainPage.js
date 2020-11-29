export default window.mainPage = function() {
    const mainPage = document.getElementById('wrapper');
    mainPage.style.display = 'flex';

    const last = document.getElementById('second_page');
    last.innerHTML = "";
    // document.body.innerHTML = '';

    // const mainPage = `
    // <div class="wrapper">
    //     <header class="header">
    //         <div class="main-logo">
    //             <img src="/UI/img/logo/Logo.png" alt="main logo">
    //         </div>
    //         <div class="hero" id="header-hero">
    //         </div>
    //     </header>
    //     <main class="main">
    //         <section class="chat-heroes" id="chat-heroes">
    //         </section>
    //         <section class="chat">
    //             <div class="chat__search">
    //                 <div class="search search__by-text">
    //                     <img src="./img/discover.png" alt="search">

    //                     <form action="#">
    //                         <input type="text" placeholder="Текст сообщения...">
    //                     </form>
    //                 </div>
    //                 <div class="search search__by-autor">
    //                     <img src="./img/discover.png" alt="search">
    //                     <form action="#">
    //                         <input type="text" placeholder="Автор...">
    //                     </form>
    //                 </div>
    //                 <div class="search search__by-date">
    //                     <img src="./img/Календарь.png" alt="search">
    //                 </div>
    //             </div>
    //             <div class="messages" id='messages'>
    //             </div>


    //             <div class="send">
    //                 <form class="send__create">
    //                     <input class="send__create-input" id="input-send" placeholder="Напишите сообщение"></input>
    //                 </form>
    //                 <img src="./img/Отправить.png" id="send" alt="send" onclick="controller.addMessage({text: })">
    //             </div>
    //         </section>
    //     </main>
    //     <footer class="footer">

    //         <div class="footer__description">
    //             <div class="footer__logo">
    //                 <img src="./img/logo/Logo_sm.png" alt="logo sm">
    //             </div>

    //             <div class="footer__chat">
    //                 <p class="footer__chat-version">ChaChat v 1.0</p>
    //                 <p class="footer__chat-date">11.10 2020</p>
    //             </div>
    //         </div>

    //         <div class="footer__developer">
    //             <p class="footer__developer-name">Dmitry Lobachevsky</p>
    //             <p class="footer__developer-email">lobachevskiydmitro@gmail.com</p>
    //         </div>

    //     </footer>
    // </div>
    // `;

    // document.body.innerHTML = mainPage;
}