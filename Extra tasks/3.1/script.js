function maxSum(arr) {
    let maxSum = 0;
    let temp = 0;
    let a_temp = [];
    let a_max = [];

  
    for (let item of arr) { 
      temp += item;
      a_temp.push(item);
      if(temp > maxSum) //Я не понимаю, почему не проходит эта проверка, можете написать причину в коментарии к пулриквесту?
      a_max = a_temp;
      maxSum = Math.max(maxSum, temp);
      if (temp < 0) {
        temp = 0;
        a_temp = [];
      }
      
    }
  
    return 'Максимальныя сумма подмассива'+ '\n' + maxSum + '\n' + a_max;
  }



  console.log(maxSum([-2,1,-3,4,-1,2,1,-5,4]));