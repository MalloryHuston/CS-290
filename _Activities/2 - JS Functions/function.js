// Function called before declaration

palindrome("racecar");

function palindrome(string) {

    let length = Math.floor(string.length / 2); // Length is half of the string

    for ( let i = 0; i < length; i++) {

        if (string[i] !== string[string.length - i - 1]) { // Compare to second half of the string

            console.log(string + ' is not a palindrome.');
            return false;

        }
    }

    console.log(string + " is a palindrome.");
    return true;

}

// Function assigned to variable called before declaration

burrito(); // Calling burrito before it is assigned will result in TypeError: burrito is not a function

let burrito = function() {

    console.log("Burrito Test");

};


