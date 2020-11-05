"use strict"
const chat =  (function(){    
    let currentAuthor = 'Dmitry Lobachevsky';

    const filterObject = {
        author: (item, author) => author && item.author.toLowerCase().includes(author),
        text: (item, text) => text && item.text.toLowerCase().includes(text),
        dateTo: (item, dateTo) => dateTo && item.createdAt < dateTo,
        dateFrom: (item, dateFrom) => dateFrom && item.createdAt < dateFrom
    };

    const validateObject = {
        id: (item) => item.id && typeof item.id === "string",
        text: (item) => item.text && item.text.length <= 200,
        author: (item) => item.author && typeof item.author === "string",
        createdAt: (item) => item.createdAt && item.createdAt.__proto__ === Date.prototype
    };

    const messages = [
        {
            id: '1',
            text: 'Да это же третья таска!!',
            createdAt: new Date('2020-10-02T09:09:09'),
            author: 'PetrPetrov1981',
            isPersonal: false
         },
         {
            id: '2',
            text: 'Ее скоро сдавать, а так и не сел(( ',
            createdAt: new Date('2020-10-10T09:10:34'),
            author: 'PetrPetrov1981',
            isPersonal: false
         },
         {
            id: '3',
            text: 'Может кто подсобить? Народ выручайте',
            createdAt: new Date('2020-10-10T09:11:01'),
            author: 'PetrPetrov1981',
            isPersonal: false
         },
         {
            id: '4',
            text: 'Я тебя предупреждал, теперь нечего ныть',
            createdAt: new Date('2020-10-12T09:43:11'),
            author: 'Работник года крысы',
            isPersonal: true,
            to: 'PetrPetrov1981'
         },
         {
            id: '5',
            text: 'Да не переживай, ты не один такой)), я двже еще условие не прочитал',
            createdAt: new Date('2020-10-11T09:10:05'),
            author: 'Van`ka-vstanka123',
            isPersonal: true,
            to: 'PetrPetrov1981'
         },
         {
            id: '6',
            text: 'Кх, кто еще такой молодец?',
            createdAt: new Date('2020-10-12T15:56:55'),
            author: 'Любимая староста',
            isPersonal: false
         },
         {
            id: '7',
            text: 'я(',
            createdAt: new Date('2020-10-12T15:57:00'),
            author: 'Qwerty12345678',
            isPersonal: true,
            to: 'Петров Петр'
         },
         {
            id: '8',
            text: '+',
            createdAt: new Date('2020-10-12T15:57:30'),
            author: 'Неопознанный жираф',
            isPersonal: false
         },
         {
            id: '9',
            text: 'эх(',
            createdAt: new Date('2020-10-12T15:57:44'),
            author: 'Котейка',
            isPersonal: false
         },
         {
            id: '10',
            text: 'Неужели так трудно делать все вовреме??? я же вам напоминала, и не один раз!!',
            createdAt: new Date('2020-10-12T23:00:00'),
            author: 'Любимая староста',
            isPersonal: false
         },
         {
            id: '11',
            text: 'ПОМНИТЕ БРАТЬЯ И СЕСТРЫ, ДЕДЛАЙН БЛИЗКО!!!',
            createdAt: new Date('2020-10-10T00:00:00'),
            author: 'Любимая староста',
            isPersonal: false
         },
         {
            id: '12',
            text: 'https://bogushtime.com/blog/pochemu-goryat-sroki-i-kak-etogo-izbezhat',
            createdAt: new Date('2020-10-12T23:00:00'),
            author: 'Любимая староста',
            isPersonal:false
         },
         {
            id: '13',
            text: 'Ловите, вдруг поможет',
            createdAt: new Date('2020-10-12T23:00:00'),
            author: 'Любимая староста',
            isPersonal: false
         },
         {
            id: '14',
            text: 'Я все сделала, можете в личку кидать вопросы',
            createdAt: new Date('2020-10-13T23:59:00'),
            author: 'Столп группы',
            isPersonal: false
         },
         {
            id: '15',
            text: 'Привет, а можешь просто скинуть решение',
            createdAt: new Date('2020-10-14T12:16:00'),
            author: 'Якорь группы',
            isPersonal: true,
            to: 'Столп группы'
         },
         {
            id: '16',
            text: 'Нет',
            createdAt: new Date('2020-10-12T23:00:00'),
            author: 'Столп группы',
            isPersonal: true,
            to: 'Якорь группы'
         },
         {
            id: '17',
            text: 'Дормамму, я пришёл договориться!',
            createdAt: new Date('2020-10-20T19:00:00'),
            author: 'доктор стрэндж',
            isPersonal: true,
            to: 'Столп группы'
         },
         {
            id: '18',
            text: 'Мне надоело придумывать',
            createdAt: new Date('2020-10-31T15:10:00'),
            author: 'Dmitry',
            isPersonal: false
         },
         {
            id: '19',
            text: 'дедлайн уже скоро',
            createdAt: new Date('2020-10-31T15:20:00'),
            author: 'Dmitry',
            isPersonal: false
         },
         {
            id: '20',
            // text: 'Просто знайте об этом',
            createdAt: new Date('2020-10-31T16:10:00'),
            author: 'Dmitry',
            isPersonal: false
         }
    
      ];
    
    function sort(messages){
        return messages.sort(function(a,b){
            return a.createdAt - b.createdAt;
        });
    }


    function getMessages(start = 0 , quantity = 10, filterConfig = {}){
        let result = messages.slice();
        
        Object.keys(filterConfig).forEach(key => {
            result = result.filter(item => filterObject[key](item, filterConfig[key]));
        })

        return result.sort().slice(start, quantity);
    }

    function getMessage(id){
        return messages.find(item => item.id === id);
    }

    function validateMessage(message){
        return Object.keys(validateObject).every(key => validateObject[key](message));
    }

    function addMessage(message){
        message.id = `${+new Date()}`;
        message.createdAt = new Date();
        message.author = currentAuthor;

            
        if(validateMessage(message)){
            messages.push(message);
            return true;
        }
        return false;
    }

    function removeMessage(id){
        let index = messages.findIndex(item => item.id === id);
        messages.splice(index, 1);
        return true;
    }

    function editMessage(id, msg){
        let tempMsg = messages.find(item => item.id === id);
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
        
        if(validateMessage(tempMsg)){
            return true;
        }
        return false;

    }


    function getAllMessages(){
        return messages;
    }


    return {
        getMessages:getMessages,
        getMessage: getMessage,
        validate:validateMessage,
        add:addMessage,
        edit:editMessage,
        remove:removeMessage,
        getAll: getAllMessages
        }

})();

console.log('Тестировка getMessages()\n \n  ');


console.log('Выведем первые 10 сообщений\n');
console.log(chat.getMessages(0,10));

console.log('Выведем 10 сообщений начиная с 11-го\n');
console.log(chat.getMessages(10,20));

console.log('Выведем первые 10 старосты\n');
console.log(chat.getMessages(0,20, {author: "староста"}));

console.log(chat.getMessages(0,20, {author: "староста"}));



console.log('тестировка getMessage()\n ');


console.log('Получение сообщения с id = 2');
console.log(chat.getMessage('2'));



console.log('Тестировка validateMessage');


console.log('Проверим валидное сообщение');
console.log(chat.getMessage('1'));
console.log(chat.validate(chat.getMessage('1')));

console.log('Проверим невалидное сообщение');
console.log(chat.getMessage('20'));
console.log(chat.validate(chat.getMessage('20')));




console.log('Тестировка addMessage')


let  m1 = {
    text: 'Проверка на добавление сообщения',
    isPersonal: false
}

let  m2 = {
    text: 'Проверка на добавление сообщения',
    isPersonal: true,
    to: 'PetrPetrov1981'
}



console.log(m1);
console.log(chat.add(m1));
console.log(chat.getAll());
console.log('///////////////////////////////////////////////////////////////////////////////\n');

console.log(m2);
console.log(chat.add(m2));
console.log(chat.getAll());
console.log('///////////////////////////////////////////////////////////////////////////////\n');





console.log('Тестировка revoveMessage()\n')
console.log(chat.getAll());
console.log(chat.getMessage('4'));
console.log(chat.remove('4'));
console.log(chat.getAll());




console.log('Тестировка editMessage()\n');

console.log(chat.edit('1',{text: 'Проверка замены текста'}));
console.log(chat.getMessage('1'));

console.log(chat.edit('1',
    {
        text: 'Проверка замены текста_new',
        isPersonal: true,
        to: 'проверка замены персональности письма'
    }));
console.log(chat.getMessage('1'));


console.log(chat.edit('1',
    {
        text: 'Возвращаем isPerdonal = false',
        isPersonal: false
    }));
console.log(chat.getMessage('1'));






