export default class MessagesView {
    constructor(containerId) {
        this.collection = document.querySelector('#' + containerId);
    }

    display(messagesList, user) {

        while(this.collection.firstChild){
            this.collection.removeChild(this.collection.firstChild);
        }

        let list = messagesList.sort(function(a,b){
            return a._createdAt - b._createdAt;
        });

        list.forEach(mes => {
            let hours = [];
                hours.push(mes._createdAt.getHours());
                hours.push(mes._createdAt.getMinutes());

                for(let i = 0; i < 2; i++){
                    if(hours[i] / 10 < 1) {
                        hours[i] = '0' + `${hours[i]}`;
                    }
                }

            if(mes.author !== user && mes.isPersonal === false) {
                const message = `
                    <div class="message">
                        <div class="chat-hero">
                            <div class="hero__icon chat-hero__icon orange"> 
                                <span class="hero__letter">${mes.author[0]}</span>
                            </div>
                        </div>
                        <div class="message__description">
                            <div>
                                <p class="message__hero-name">${mes.author}</p>
                            <div class="message__text">${mes.text}</div>
                            </div>
                            <span class="message__time">${hours[0]}:${hours[1]}</span>
                        </div>
                    </div>
                    `;                
                    this.collection.innerHTML += message;
                
            }
            else if(mes.author !== user && mes.isPersonal === true) {
                
                const message = `
                <div class="message">
                    <div class="chat-hero">
                        <div class="hero__icon chat-hero__icon blue"> 
                            <span class="hero__letter">${mes.author[0]}</span>
                        </div>
                    </div>
                    <div class="message__description">
                        <div>
                            <p class="message__hero-name delete">${mes.author}</p>
                            <span class="message__pesonal">To: ${mes.to}</span>
                            <pre class="message__text">${mes.text}</pre>
                            </div>
                            <span class="message__time">${hours[0]}:${hours[1]}</span>
                        </div>
                    </div>
                </div>
                `;
                this.collection.innerHTML += message;
            }
            else if(mes.author === user && mes.isPersonal === false) {
                const message = `
                    <div class="message my-message">
                        <img class="edit" src="./img/edit.png" alt="edit">
                        <img class="edit" src="./img/delete.png" alt="delete">
                        <div class="message__description">
                            <p class="message__text">${mes.text}</p>
                            <span class="message__time">${hours[0]}:${hours[1]}</span>
                        </div>

                        <div class="chat-hero">
                            <div class="hero__icon chat-hero__icon red"> 
                                <span class="hero__letter">${mes.author[0]}</span>
                            </div>
                        </div>
                    </div>
                `;
                this.collection.innerHTML += message;
            } else {
                const message = `
                <div class="message my-message">
                    <img class="edit" src="./img/edit.png" alt="edit">
                    <img class="edit" src="./img/delete.png" alt="delete">
                    <div class="message__description">
                        <span class="message__pesonal">To: ${mes.to}</span>
                        <p class="message__text">${mes.text}</p>
                        <span class="message__time">${hours[0]}:${hours[1]}</span>
                    </div>

                    <div class="chat-hero">
                        <div class="hero__icon chat-hero__icon red"> 
                            <span class="hero__letter">${mes.author[0]}</span>
                        </div>
                    </div>
                </div>
                `;
                this.collection.innerHTML += message;
            }
            
        });
    }
};