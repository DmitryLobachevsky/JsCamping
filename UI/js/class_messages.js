import { messages } from './script.js';
import { true_and_false_messages } from './script.js';




class Message {
    constructor(message, user) {
        this.id = `${+new Date()}`;
        this.text = message.text;
        this.createdAt = new Date();
        this.author = user;
        this.isPersonal = message.isPersonal;
        if(message.isPersonal) {
            this.to = message.to;
        }
    }
}



class MessageList {

    constructor(messages, user = 'guest') {
        this.collection = messages.slice();
        this._user = user;

        this._validateObject = {
            id: (item) => item.id && typeof item.id === "string",
            text: (item) => item.text && item.text.length <= 200,
            author: (item) => item.author && typeof item.author === "string",
            createdAt: (item) => item.createdAt && item.createdAt.__proto__ === Date.prototype
        };
    }

    sort(messages){
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
    
   

    getPage(skip = 0, top = 10, filterConfig = {}) {
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
        return result.sort().slice(skip, top);
    }

    add(message){
        let mes = new Message(message, this.user);

            
        if(this._validateMessage(mes)){
            console.log(mes,'Метод работает, ищи ошибку');
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
        if(tempMsg.author !== this._user) {
            return false;
        }
        if(msg.text !== undefined){
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
    
let chat = new MessageList(messages, 'PetrPetrov1981');

console.log(chat.getAllMessages());
console.log(chat.get('1'));

console.log('Тестировка getMessages()\n \n  ');


console.log('Выведем первые 10 сообщений\n');
console.log(chat.getPage(0,10));

console.log('Выведем 10 сообщений начиная с 11-го\n');
console.log(chat.getPage(10,20));

console.log('Выведем первые 10 старосты\n');
console.log(chat.getPage(0,20, {author: "староста"}));

let mes = new Message({
    text: 'dasdkjnvsd',
    isPersonal: true,
    to: 'piu piy'
})

console.log(mes,'This is new message');
console.log(chat._validateMessage(mes));
console.log('Add new message', chat.add(mes));
console.log('Victory', chat.getAllMessages());




console.log('Тестировка revoveMessage()\n')
console.log(chat.getAllMessages());
console.log(chat.get('1'));
console.log(chat.remove('1'));
console.log(chat.getAllMessages());


console.log(chat.get('\n','7'));
console.log(chat.remove('7'));



console.log('Тестировка editMessage()\n');

console.log(chat.edit('1',{text: 'Проверка замены текста'}));
console.log(chat.get('1'));

console.log(chat.edit('1',
    {
        text: 'Проверка замены текста_new',
        isPersonal: true,
        to: 'проверка замены персональности письма'
    }));
console.log(chat.get('1'));


console.log('\n', chat.get('7'));
console.log(chat.edit('7',{text: 'Проверка замены текста 2'}));
console.log('\n', chat.get('7'));





console.log(true_and_false_messages);
console.log(chat.addAll(true_and_false_messages));

console.log('\n', 'ПРоверка метода clear()');
console.log(chat.getAllMessages());
chat.clear();
console.log(chat.getAllMessages());


