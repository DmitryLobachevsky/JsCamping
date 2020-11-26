export default class HeaderView {
    constructor(containerId) {
        this.header = document.querySelector('#' + containerId);
    }

    display(user) {
        this.header.innerHTML = ""; 

        const description = document.createElement('div');
        const heroName = document.createElement('p');
        const exit = document.createElement('a');
        const heroIcon = document.createElement('div');
        const letter = document.createElement('span');

        description.classList.add('hero__description');

        heroName.classList.add('hero__name');
        heroName.textContent = user;

        exit.classList.add('hero__exit');
        exit.textContent = 'Выйти';
        exit.setAttribute('href', '#');
        exit.setAttribute('id', 'exit');

        heroIcon.classList.add('hero__icon');
        heroIcon.classList.add('red');

        letter.classList.add('hero__letter');
        letter.textContent = user[0];

        description.appendChild(heroName);
        description.appendChild(exit);

        heroIcon.appendChild(letter);

        this.header.appendChild(description);
        this.header.appendChild(heroIcon);
    }
}