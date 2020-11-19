export default class MessagesView {
    constructor(containerId) {
        this.collection = document.querySelector('#' + containerId);
    }

    display(messagesList, user) {
        let list = messagesList.sort(function(a,b){
            return a.createdAt - b.createdAt;
        });

        list.forEach(mes => {
            if(mes.author !== user) {
                const message = document.createElement('div');

                const hero = document.createElement('div');
                const icon = document.createElement('div');
                const letter = document.createElement('span');

                const description = document.createElement('div');
                const descrContainer = document.createElement('div');
                const name = document.createElement('p');
                const text = document.createElement('div');
                const time = document.createElement('span'); 

                message.classList.add('message');

                hero.classList.add('chat-hero');
            
                icon.classList.add('hero__icon', 'chat-hero__icon', 'blue');

                letter.classList.add('hero__letter');
                letter.textContent = mes.author[0];


                description.classList.add('message__description');

                name.classList.add('message__hero-name');
                name.textContent = mes.author;

                text.classList.add('message__text');
                text.textContent = mes.text;

                time.classList.add('message__time');
                time.textContent = `${mes._createdAt.getHours()}:${mes._createdAt.getMinutes()}`;

                icon.appendChild(letter);
                hero.appendChild(icon);

                descrContainer.appendChild(name);
                descrContainer.appendChild(text);
                description.appendChild(descrContainer);
                description.appendChild(time);

                message.appendChild(hero);
                message.appendChild(description);

                this.collection.appendChild(message);
            }
            else {
                const message = document.createElement('div');

                const edit = document.createElement('img');
                const deleteMes = document.createElement('img');

                const description = document.createElement('div');
                const descrContainer = document.createElement('div');
                const text = document.createElement('div');
                const time = document.createElement('span'); 

                const hero = document.createElement('div');
                const icon = document.createElement('div');
                const letter = document.createElement('span');

                message.classList.add('message', 'my-message');

                hero.classList.add('chat-hero');
            
                icon.classList.add('hero__icon', 'chat-hero__icon', 'red');

                letter.classList.add('hero__letter');
                letter.textContent = mes.author[0];

                edit.classList.add('edit');
                edit.setAttribute('src','./img/edit.png');
                edit.setAttribute('id', `edit_${mes.id}`)
                edit.setAttribute('alt', 'edit')

                deleteMes.classList.add('edit');
                deleteMes.setAttribute('src','./img/delete.png');
                deleteMes.setAttribute('id', `delete_${mes.id}`);

                description.classList.add('message__description');

                text.classList.add('message__text');
                text.textContent = mes.text;

                time.classList.add('message__time');
                time.textContent = `${mes._createdAt.getHours()}:${mes._createdAt.getMinutes()}`;

                descrContainer.appendChild(text);
                description.appendChild(descrContainer);
                description.appendChild(time);

                icon.appendChild(letter);
                hero.appendChild(icon);

                message.appendChild(edit);
                message.appendChild(deleteMes);
                message.appendChild(description);
                message.appendChild(hero);

                this.collection.appendChild(message);
            }
        });
    }
};