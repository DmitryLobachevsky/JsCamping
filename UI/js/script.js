  const chat =  (function(){
    let count = 21;
    let mes_id = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
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


    function getMessages(start, quantity, obj){
        if(start < 0 || quantity < 0 || (obj !== undefined && (obj === {} || obj.author === ''))){
            return 'Вы ввели не корректные значения!'
        }
        if(obj !== undefined){
            let a = messages.filter(item => item.author.indexOf(obj.author) + 1);
            let size;
            if(quantity > a.length){
                size = a.length;
            }else{
                size = quantity;
            }
            let temp = [];
            temp = sort(a); 
            let arr = [];
            for(let i = start; i < size; i++){
                arr.push(temp[i]);
            }
            return arr;
            

        } else {
            let temp = [];
            temp = sort(messages);  
            let arr = [];
            for(let i = start; i < (start + quantity); i++){
                arr.push(temp[i]);
            }
             return arr;
        }
    }

    function getMessage(id){
        let flag = false;
        let temp;
        for(let i = 0; i < messages.length; i++){
            if(messages[i].id === id){
                temp = messages[i];
                flag = true;
            }
        }
        if(flag){
            return temp;
        } else {
            return 'Сообщения с таким id нет';
        } 
    }

    function validateMessage(message){
        if(typeof(message.id) !== 'string' || message.id === undefined){
            console.log('id не валидно')
            return false;
        }
        if(typeof(message.id) !== 'string' || message.text === undefined){
            console.log('text не валидно')
            return false;
        }
        if(typeof(message.createdAt) !== 'object' || message.createdAt === undefined){
            console.log('date не валидно')
            return false;
        }
        if(typeof(message.author) !== 'string' || message.author === undefined){
            console.log('author не валидно')
            return false;
        }
        return true;
    }

    function addMessage(message){
        if(validateMessage(message)){
            for(let i = 0; i < mes_id.length; i++){
                if(mes_id[i] === +message.id)
                    return false;
            }
            mes_id.push(message.id);
            messages.push(message);
            return true;
        }
        return false;
    }

    function removeMessage(id){
        for(let i = 0; i < messages.length; i++){
            if(messages[i].id === id){
                messages.splice(i,1);
            }
        }
        return messages;
    }

    function editMessage(id, message){
        if(message.text !== undefined){
            messages.forEach(item => {
                if(item.id === id){
                    item.text = message.text;
                }
            })
            return true;
        }
        return false;
    }


    function getAllMessages(){
        return messages;
    }


    return {
        getMs:getMessages,
        getM: getMessage,
        validate:validateMessage,
        add:addMessage,
        edit:editMessage,
        remove:removeMessage,
        getAll: getAllMessages
        }

})();

console.log('Тестировка getMessages()\n \n  ');


console.log('Выведем первые 10 сообщений\n');
console.log(chat.getMs(0,10));

console.log('Выведем 10 сообщений начиная с 11-го\n');
console.log(chat.getMs(10,10));

console.log('Выведем первые 10 старосты\n');
console.log(chat.getMs(0,10, {author: 'староста'}));
console.log('Вывелось 5, т к в чате пока только 5 сообщений от старосты');

console.log('При подставлении некорректных данный будет выведено сообщение с ошибкой\n');
console.log(chat.getMs(0,-10));




console.log('тестировка getMessage()\n ');


console.log('Получение сообщения с id = 2');
console.log(chat.getM('2'));

console.log('Получение сообщения с id = 10000');
console.log(chat.getM('10000'));




console.log('Тестировка validateMessage');


console.log('Проверим валидное сообщение');
console.log(chat.getM('1'));
console.log(chat.validate(chat.getM('1')));

console.log('Проверим невалидное сообщение');
console.log(chat.getM('20'));
console.log(chat.validate(chat.getM('20')));








