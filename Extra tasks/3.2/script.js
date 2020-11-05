function maxValue(arr){
    let flag = false;
    let current;
    let next;
    let prise;
    let maxSum = 0;
    for(let i = 0; i < arr.length; i++){
        current = arr[i];
        if(i === arr.length - 1){
            next = 0;
        } else{
            next = arr[i + 1];
        }
        if(current < next && flag === false){
            prise = current;
            flag = true;
        }
        if(current > next && flag === true){
            maxSum += current - prise;
            flag = false;
        }
        
    }
    return maxSum;
}

maxValue([7,6,4,3,1]);