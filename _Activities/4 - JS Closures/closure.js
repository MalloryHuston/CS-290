

/*
I came up with version one initially but I did a bit of exploring and found a similar solution that doesn't alter the original function as much.
Source: https://stackoverflow.com/questions/19901597/javascript-closure-after-using-anonymous-function
The problem I have with version 2, however, is that it's a little difficult to read (and JSFiddle agrees if the warning about function declarations in for-loops is anything to go by).
My solution (version one) involved stripping out the alert call function into a new function (fixClosure), and passing in the item, list, and index so that it's slightly more clear.
After that I simply call the alert with the passed in variables, and within the buildList for-loop I call the fixClosure function (with the correct arguments) within the result.push function.
I personally find this to be a lot more clear and easier to understand. It takes slightly more lines of JS (3 - 4) to accomplish but I've always favored clarity over tersity - especially in programming.
*/

// Version One - using custom function

function fixClosure(item, list, index) {

    alert(item + ' ' + list[index]);

}

function buildListOne(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + list[i];
        result.push(fixClosure(item, list, i));
    }
    return result;
}

function testListOne() {
    var fnlist = buildListOne([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testListOne();



// Version Two - using var and passing in i as argument to anonymous function


function buildListTwo(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + list[i];
        result.push( function(index) {
            alert(item + ' ' + list[index])}(i) );
    }
    return result;
}

function testListTwo() {
    var fnlist = buildListTwo([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testListTwo();



// Version Three - using let
function buildListThree(list) {
    let result = [];
    for (let i = 0; i < list.length; i++) {
        let item = 'item' + list[i];
        result.push( function() {alert(item + ' ' + list[i])} );
    }
    return result;
}

function testListThree() {
    let fnlist = buildListThree([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (let j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}
testListThree();