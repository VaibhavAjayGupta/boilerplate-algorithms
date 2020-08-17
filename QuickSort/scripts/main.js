const form = document.getElementById('form');
const outputValueElement = document.getElementById('output');
const inputValueElement = document.querySelector('input[type="text"]');

form.addEventListener('submit', startProcessing);

function startProcessing(event) {
    event.preventDefault();
    let inputValue = inputValueElement.value;
    let valuesArray = inputValue.split(',');
    let sortedArray = [...valuesArray];
    
      for(let i=0;i<sortedArray.length;i++){
        sortedArray[i]=Number(sortedArray[i]);
      }
     
    
    let outputValue = `Input Values are ${valuesArray}` ;
    
    // Quick Sort logic starts here
    
    let counter1 = -1;
    let counter2 = 0;
    let pivot = sortedArray[sortedArray.length-1];
    

    for(counter2=0;counter2<sortedArray.length-1;counter2++){

       if(sortedArray[counter2]<pivot){
         counter1++;
         swap(sortedArray,counter2,counter1);
       }

       
    }
      swap(sortedArray,sortedArray.length-1,counter1+1);
   
    // logic ends here
    let iterationCount = 0;
    outputValue+=` and Sorted values are ${sortedArray}, Values after first itertion using last element as pivot .`;
    
    outputValueElement.textContent = outputValue;
   
  }

  // swap the values of array;
  function swap(sortedArray,counter2,counter1){
      let temp = sortedArray[counter2];
      sortedArray[counter2]=sortedArray[counter1];
      sortedArray[counter1]=temp;
  }