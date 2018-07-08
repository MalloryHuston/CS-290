// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
// Ref: https://stackoverflow.com/questions/8312459/iterate-through-object-properties

let obj = {

    here: {
        is: "an"
    },

    object: 2
};

// Deep Equal Function

function deepEqual(obj1, obj2) {

    if(obj1 === obj2) { // Direct object comparison

        return true;

    }

    if (Object.keys(obj1).length !== Object.keys(obj1).length) { // Object length comparison
        return false;
    }

    for (let i in obj1) { // Deep object property comparison

        if((obj1[i] !== null && typeof obj1[i] === 'object') && (obj2[i] !== null && typeof obj2[i] === 'object')) {

            return deepEqual(obj1[i], obj2[i]);

        } else if(((typeof obj1[i]) != 'object') && ((typeof obj2[i]) != 'object')) {

            if(obj1[i] === obj2[i]) {

                return true;

            }

        } else if (obj1[i] == null && obj2[i] == null) {

            return true;

        } else {

            return false;

        }
    }

}


console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
