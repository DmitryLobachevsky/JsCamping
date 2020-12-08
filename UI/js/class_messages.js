import { messages } from "./script.js";
import UserList from "./userList.js";
import HeaderView from "./View/HeaderView.js";
import ActiveUsersView from "./View/ActiveUsersView.js";
import MessagesView from "./View/MessagesView.js";

import drowRegistration from "./Redrow/registration.js";
import drowJoin from "./Redrow/join.js";
import mainPage from "./Redrow/mainPage.js";
import drowError from './Redrow/Error.js';

import ChatApiService from "./ChatApiService.js";


class Controller {
  constructor() {
    this.chatApi = new ChatApiService("https://jslabdb.datamola.com/");
    this.User = new HeaderView("header-hero");
    this.showUsers = new ActiveUsersView("chat-heroes");
    this.messagesView = new MessagesView("messages");
    this.user = localStorage.getItem("user") ?? "[]";
    this.User.display(this.user);
    this.showActiveUsers();
    this.showMessages();
    localStorage.setItem('isPersonal', false);
  }

  setCurrentUser() {
    mainPage();
    this.user = localStorage.getItem("user");
    this.User = new HeaderView("header-hero");
    this.User.display(this.user);
    this.showActiveUsers();
    this.showMessages();
  }

  showActiveUsers() {
    this.chatApi.getUsers(this.showUsers);
  }

  showMessages() {
    this.chatApi.getMessages(this.messagesView, this.user);
  }

  addMessage() {
    this.chatApi.addMessage().then(() => {
        this.showMessages();
    });
  }

  removeMessage(id) {
    this.chatApi.deleleMessage(id).then(() => this.showMessages());
  }

  editMessage(id, msg) {
    this.chatApi.editMessage(id, msg).then(() => this.showMessages());
  }

  drowJoin() {
    drowJoin();
  }

  drowRegistration() {
    drowRegistration();
  }

  drowError() {
    drowError();
  }

  registration() {
    this.chatApi.register();
    this.drowJoin();
  }

  join() {
    this.chatApi.login().then(() => this.setCurrentUser());
    const send = document.getElementById('send-cont');
    send.style.display = 'flex';
  }

  guest() {
    localStorage.setItem('user', ' ');
    this.join();

  }
}

mainPage();
let flag_edit = false;
let id;
window.controller = new Controller();

document.addEventListener("click", (event) => {
  if (event.target.id === "exit") {
    controller.chatApi.logout();
    controller.drowJoin();
  }
  if(event.target.id === "guest") {
    controller.guest();
    const send = document.getElementById('send-cont');
    send.style.display = 'none';
  }
  if (event.target.id === "registration") {
    controller.drowRegistration();
  }
  if (event.target.id.slice(0, 6) === "delete") {
    controller.removeMessage(event.target.id.slice(7));
  }
  if (
    event.target.id === "send" &&
    document.querySelector("#input-send").value !== "" &&
    flag_edit === false
  ) {
    controller.addMessage();
    document.querySelector("#input-send").value = "";
  }
  if (event.target.id === "send" && flag_edit === true) {
    controller.editMessage(id, document.getElementById("input-send").value);
    document.querySelector("#input-send").value = "";
    flag_edit = false;
  }
  if (event.target.id.slice(0, 4) === "edit") {
    flag_edit = true;
    id = event.target.id.slice(5);
    const msg = document.getElementById(id).textContent;
    const input = document.getElementById("input-send");
    input.value = msg;
  }
});

// controller.messagesView.collection.addEventListener('scroll', event => {
//     if(controller.messagesView.collection.scrollTop === 0) {
//         top += 10;
//         controller.showMessages();
//     }
// });

controller.showUsers.activeUsers.addEventListener("click", (event) => {
    const user = event.target.childNodes[1].textContent;
    localStorage.setItem('to', user);

    if(event.target.id === localStorage.getItem('last')) {
        document.getElementById(`${localStorage.getItem('last')}`).style.backgroundColor = "#FFF";
        localStorage.setItem('isPersonal', false);
    } else {
        if(localStorage.getItem('last')) {
            document.getElementById(`${localStorage.getItem('last')}`).style.backgroundColor = "#FFF";
        } 
        event.target.style.backgroundColor = "green";
        localStorage.setItem('last', event.target.id);
        localStorage.setItem('isPersonal', true);

    }

    
    

});