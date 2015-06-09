var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = null;

var hundredThousandairs = dataset.bankBalances.filter(function(element){
  return element.amount > 100000.00;
})

/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = dataset.bankBalances.map(function(element){
  var roundedValue = Math.round(Number(element.amount));
  return {"amount": element.amount,
          "state": element.state,
          'rounded': roundedValue
        };
})

/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = dataset.bankBalances.map(function(element){

   return {"amount": Number(Number(element.amount).toFixed(1)),
          "state": element.state
        };
});

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = Number(dataset.bankBalances.reduce(function(previous,current){
  return previous + Number(current.amount);
},0).toFixed(2));



/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfInterests = dataset.bankBalances.filter(function(element){
  return element.state === 'WI' ||
        element.state === 'IL' ||
        element.state === 'WY' ||
        element.state === 'OH' ||
        element.state === 'GA' ||
        element.state === 'DE';
  }).reduce(function(previous,current){

    return Math.round((previous + current.amount * 0.189)*100)/100
  },0);

/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var addInterestProperty = function(element){
  return {
    tax : element.amount*0.189,
    state : element.state
  };
};

var reduceToStates  = function(previous,current,index,array){
  var theState = current.state;
  if(theState in previous){
    previous[theState] += current.tax;
  } else {
   previous[theState] = current.tax;
  }
  return previous;
};





var reduceOnlyHigh = function(previous,current,index,array){
  if (stateObject[current]>50000){
    previous += stateObject[current]
  }
  return previous;
};


var stateObject = dataset.bankBalances.filter(function(element){
  return element.state !== 'WI' &&
        element.state !== 'IL' &&
        element.state !== 'WY' &&
        element.state !== 'OH' &&
        element.state !== 'GA' &&
        element.state !== 'DE';
  }).map(addInterestProperty).reduce(reduceToStates,{});


var sumOfHighInterests = Object.keys(stateObject).reduce(reduceOnlyHigh,0);

//console.log(sumOfHighInterests);

// .filter(function(element1,index,array){
//       return array.filter(function(element2,index,array){
//           return element2.state === element1.state;
//       }).reduce(function(prev,current){return Number(prev + current.amount)},0) >50000;
//   })

//   .reduce(function(previous,current){
//   return previous + Number(current.amount);
// },0)



/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */

 var reduceToStates2  = function(previous,current,index,array){
  var theState = current.state;
  console.log('the state',theState);
  if(theState in previous){
    previous[theState] =  Math.round((Number(previous[theState]) + Number(current.amount))*100)/100;
  } else {
   previous[theState] =  Math.round(Number(current.amount)*100)/100;
  }
  return previous;
};


var stateSums = dataset.bankBalances.reduce(reduceToStates2,{});;

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = Object.keys(stateSums).filter(function(element){
  return  stateSums[element] < 1000000;
});

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = Object.keys(stateSums).filter(function(element){
  return  stateSums[element] > 1000000;
}).reduce(function(prev,current){
  return prev + stateSums[current];
},0);

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = Object.keys(stateSums).every(function(element,index,array){

    if(element === 'WI'||element ==='IL'||element ==='WY'||element ==='OH'||element ==='GA'||element ==='DE'){

      return stateSums[element] > 2550000;
    }

});

/*
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohiog
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = Object.keys(stateSums).some(function(element,index,array){

    if(element === 'WI'||element ==='IL'||element ==='WY'||element ==='OH'||element ==='GA'||element ==='DE'){

      return stateSums[element] > 2550000;
    }

});


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};