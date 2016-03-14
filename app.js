module.exports = {};


var person ={
    firstName :'Abdul'
}
console.log(person);

var test = function(){
console.log('Abdul is Stupid!');
};
test();
//console.log(addNumber(7,4));

//setTimeout(test, 2000);


function placeAnEvent(eventNumber) {

    console.log('Event Number Received', eventNumber);

    serveEvent(function () {
        console.log("Event Served!", eventNumber);
    })
}

function serveEvent(callBack){
    setTimeout(callBack, 5000);
}

placeAnEvent(1000);
placeAnEvent(2000);
placeAnEvent(3000);


var abdul = {
    favTech : 'java',

    printTech: function(){
        console.log(this === abdul);
    }
}

var abdul2014 = abdul;
abdul2014.favTech = 'atg';
console.log(abdul.favTech);
abdul.printTech();


