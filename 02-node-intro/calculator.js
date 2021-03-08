//create a calculator object with add, subtract, multiply, divide methods
//execute the calculator methods for 100,200 and print the result
var calculator = {
    add(x,y){
        return x + y;
    },
    subtract(x,y){
        return x - y;
    },
    multiply(x,y){
        return x * y;
    },
    divide(x,y){
        return x / y;
    }
}

console.log(calculator.add(100,200))
console.log(calculator.subtract(100,200))
console.log(calculator.multiply(100,200))
console.log(calculator.divide(100,200))