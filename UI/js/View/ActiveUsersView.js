export default class ActiveUsersView {
    constructor(containerId) {
        this.activeUsers = document.querySelector('#' + containerId);
    }

    display(users, activeUsers) {
        while(this.activeUsers.firstChild){
            this.activeUsers.removeChild(this.activeUsers.firstChild);
        }

        let flag = true;
        for(let i = 0; i < activeUsers.length; i++) {
            for(let j = 0; j < users.length; j++) {
                if(users[j] === activeUsers[i]) {
                    users.splice(j, 1);
                }
            }
        }
        activeUsers.sort();
        users.sort();
        let temp = [activeUsers, users];
        temp.forEach(users => {
            users.forEach(item => {
                const hero = document.createElement('div');
                const icon = document.createElement('div');
                const letter = document.createElement('span');
                const status = document.createElement('div');
                const name = document.createElement('div');
    
                hero.classList.add('chat-hero');
    
                icon.classList.add('chat-hero__icon');
                icon.classList.add('hero__icon');
                icon.classList.add('blue');
    
                letter.classList.add('hero__letter');
                letter.textContent = item[0];
    
                status.classList.add('status');
                if(flag) {
                    status.classList.add('online');
                }
                else {
                    status.classList.add('offline')
                }
                
    
                name.classList.add('chat-hero__name');
                name.textContent = item;
    
                icon.appendChild(letter);
                icon.appendChild(status);
    
                hero.appendChild(icon);
                hero.appendChild(name);
    
                this.activeUsers.appendChild(hero);
                
            })
            flag = false;
        });
    }
}