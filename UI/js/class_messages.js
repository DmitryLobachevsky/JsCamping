import { messages } from './script.js';
import UserList from './userList.js';
import HeaderView from './View/HeaderView.js';
import ActiveUsersView from './View/ActiveUsersView.js';
import MessagesView from './View/MessagesView.js';

import drowRegistration from './Redrow/registration.js'
import drowJoin from './Redrow/join.js';
import mainPage from './Redrow/mainPage.js';

import ChatApiService from './ChatApiService.js';


class Message {
    constructor(message, user) {
        this.id = `${+new Date()}`;
        this.text = message.text;
        this._createdAt = new Date();
        this.author = user;
        this.isPersonal = message.isPersonal;
        if(message.isPersonal) {
            this.to = message.to;
        }
    }
}



class MessageList {

    constructor(messages = [], user) {
        this.collection = messages.slice();
        this.user = user;
        this.top = 10;
        

        this._validateObject = {
            id: (item) => item.id && typeof item.id === "string",
            text: (item) => item.text && item.text.length <= 200,
            author: (item) => item.author && typeof item.author === "string",
            _createdAt: (item) => item._createdAt && item._createdAt.__proto__ === Date.prototype
        };
    };

    sort(){
        return messages.sort(function(a,b){
            return a.createdAt - b.createdAt;
        });
    }

    _validateMessage(message){
        return Object.keys(this._validateObject).every(key => this._validateObject[key](message));
    }



    getAllMessages() {
        return this.collection;
    }

    
    get(id) {
        return this.collection.find(item => item.id === id);
    }
    
   

    getPage(skip = 0, filterConfig = {}) {
        this._filterObject = {
            author: (item, author) => author && item.author.toLowerCase().includes(author),
            text: (item, text) => text && item.text.toLowerCase().includes(text),
            dateTo: (item, dateTo) => dateTo && item.createdAt < dateTo,
            dateFrom: (item, dateFrom) => dateFrom && item.createdAt < dateFrom
        };

        let result = [];

        this.collection.forEach(msg => {
            if(msg.isPersonal === false || msg.author === this._user || (msg.isPersonal === true && msg.to === this.user)) {
                result.push(msg);
            }
        })
        
        Object.keys(filterConfig).forEach(key => {
            result = result.filter(item => this._filterObject[key](item, filterConfig[key]));
        });
        delete this._filterObject;
        return result.sort((a, b) => b._createdAt - a._createdAt).slice(skip, skip + this.top); 
    }

    add(message){
        let mes = new Message(message, this.user);

            
        if(this._validateMessage(mes)){
            this.collection.push(mes);
            return true;
        }
        return false;
    }

    addAll(msgs) {
        let failed_messages = [];
        msgs.map(item => {
            let msg = new Message(item, this._user);
            if(this._validateMessage(msg)) {
                this.collection.push(msg);
            }
            else {
                failed_messages.push(msg);
            }
        })
        return failed_messages;
    }

    remove(id){
        let index = this.collection.findIndex(item => item.id === id);
        if(this.collection[index].author !== this.user) {
            return false;
        }
        this.collection.splice(index, 1);
        return true;
    }

    clear() {
        this.collection = [];
    }
    

    edit(id, msg){
        let tempMsg = this.collection.find(item => item.id === id);
        if(tempMsg.author !== this.user) {
            return false;
        }
        if(msg.text){ // приведение типов
            tempMsg.text = msg.text;
        }
        if(msg.isPersonal !== tempMsg.isPersonal && msg.isPersonal === true){
            tempMsg.isPersonal = msg.isPersonal;
            tempMsg.to = msg.to;
            console.log('Udalos');
        } else 
        if(msg.isPersonal !== tempMsg.isPersonal && msg.isPersonal === false){
            tempMsg.isPersonal = msg.isPersonal;
            delete tempMsg.to; 
        }
        
        if(this._validateMessage(tempMsg)){
            return true;
        }
        return false;
    }    
}

class Controller {

    constructor() {
        this.chatApi = new ChatApiService('https://jslabdb.datamola.com/');
        this.User = new HeaderView('header-hero');
        this.showUsers = new ActiveUsersView('chat-heroes');
        this.messagesView = new MessagesView('messages');
        this.user = localStorage.getItem('user') ?? '[]';
        this.User.display(this.user);
        this.showActiveUsers();
        this.showMessages();
    }

    setCurrentUser() {
        mainPage();
        this.user = localStorage.getItem('user');
        this.User = new HeaderView('header-hero');
        this.User.display(this.user);
        
    }

    showActiveUsers() {
        this.chatApi.getUsers(this.showUsers);
    }

    showMessages() {
        this.chatApi.getMessages(this.messagesView, this.user); 
    }

    addMessage() {
        this.chatApi.addMessage();
        setTimeout(this.chatApi.getMessages(this.messagesView, this.user), 2000)
    }

    removeMessage(id) {
        if(this.chat.remove(id)){
            this.messagesView.display(this.chat.getPage(), this.chat.user);
            localStorage.setItem('messages', JSON.stringify(this.chat.collection));
        }
    }

    editMessage(id, msg) {
        if(this.chat.edit(id, msg)){
            this.messagesView.display(this.chat.getPage(), this.chat.user);
            localStorage.setItem('messages', JSON.stringify(this.chat.collection));
        }
    }

    drowJoin() {
        drowJoin();
    }

    drowRegistration() {
        drowRegistration();
    }

    registration() {
        const name = document.getElementById('name').value;
        this.userList.activeUsers.push(name);
        mainPage();
        this.setCurrentUser(name);
        this.showActiveUsers();
        localStorage.setItem('users', JSON.stringify(this.userList.users));
        localStorage.setItem('activeUsers', JSON.stringify(this.userList.activeUsers));

    }

    join() {
        this.chatApi.login();
        setTimeout(this.setCurrentUser, 1000);
        setTimeout(this.showMessages(), 1100);
        
        
    }

    


}

mainPage();
let flag_edit = false;
let id;
window.controller = new Controller();



document.addEventListener('click', event => {
    if(event.target.id === "exit") {
        controller.drowJoin();
    }
    if(event.target.id === "registration") {
        controller.drowRegistration();
    }
    if(event.target.id.slice(0,6) === 'delete') {
        controller.removeMessage(event.target.id.slice(7));
    }
    if(event.target.id === "send" && document.querySelector("#input-send").value !== "" && flag_edit === false) {
        controller.addMessage();
        document.querySelector("#input-send").value = '';
    }
    if(event.target.id === "send"  && flag_edit === true) {
        controller.editMessage(id, {text: document.getElementById('input-send').value});
        document.querySelector("#input-send").value = '';
        flag_edit = false;
    }
    if(event.target.id.slice(0,4) === 'edit') {
        flag_edit = true;
        id = event.target.id.slice(5);
        const msg = controller.chat.get(id);
        const input = document.getElementById('input-send');
        input.value = msg.text;
        
    }
})

// controller.messagesView.collection.addEventListener('scroll', event => {
//     if(controller.messagesView.collection.scrollTop === 0) {
//         top += 10;
//         controller.showMessages();
//     }
// });

