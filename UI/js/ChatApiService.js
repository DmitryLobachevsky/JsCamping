export default class ChatApiService {
    constructor(url) {
        this.url = url;
    }

    getMessages(messagesView, user) {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

        console.log(myHeaders);
        
        fetch(`${this.url}messages?skip=0&top=10`, {
            method: 'GET',
            headers: myHeaders 
        }).then((data)=> {
            return data.json();
        }).then((msgs) => {
            messagesView.display(msgs, user);
            localStorage.setItem('messages', JSON.stringify(msgs));
        });
    }

    getUsers(showUsers) { 
        fetch(`${this.url}users`, {
            method: 'GET', 

        }).then((data)=> {
            return data.json();
        }).then((users) => {
            let online = [];
            let offline = [];
            users.forEach(item => {
                if(item.name) {
                    let temp = item.name;
                    if(item.isActive) {
                        online.push(temp);
                    } 
                    else {
                        offline.push(temp);
                    }
                }
            });
            showUsers.display(offline, online);
            localStorage.setItem('activeUsers', JSON.stringify(online));
        });
    }

    register() {

    }

    login() {
        const name = document.getElementById('name').value;
        const pass = document.getElementById('pass').value;

        let formdata = new FormData();
        formdata.append("name", name);
        formdata.append("pass", pass);

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://jslabdb.datamola.com/auth/login", requestOptions)
            .then(response => {
                if(response.status === 200){
                    return response.json();
                }
                
            })
            .then(result => {
                localStorage.setItem('user', name);
                localStorage.setItem('token', result.token);
            })
            .catch(error => console.log('error', error));

            
        }

    logout() {

    }

    addMessage() {
        const msg = document.getElementById('input-send');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({"text": msg.value,"isPersonal":false,"author":localStorage.getItem('user')});

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://jslabdb.datamola.com/messages", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        msg.innerHTML = '';
    }

    editMessage() {

    }

    deleleMessage() {

    }
}