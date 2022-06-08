const os = require("os"); // inbuilt nodejs
const of = require("of"); // file system
console.log("Hello Nigga!!!");

const marks = [40, 50, 60, 60, 70];
console.log(Math.max(...marks));

// few objects are not applicable ex- document, window
// console.log(global);

// create package.json - npm init

function multiply(num){
    return num * 2;
}
console.log(process.argv);
const num = process.argv[2];
console.log("The multiply is:",multiply(num));

console.log("Free Memory:" + os.freemem());
console.log("Toal Memory:" + os.totalmem());
console.log(os.arch()); // gives system's bit (ex-64bit, 32bit)


//sync - call stack -> webapi (complete reading) -> callback Queue -> event loop -> call stack

//async operation
fs.readFile("./nice.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data, "Jana");

    fs.writeFile("./good.txt", data,  () => 
    console.log("Completed writing in good.txt")
    )
});

// Call stack - blocking operation
const data = fs.readFileSync("./nice.txt", "utf8");
console.log(data);

fs.copyFile("./nice.txt", "good1.txt", () => {console.log("Copied Nice!!!");
fs.rename("./good1.txt", "awesome.txt", () => {
    console.log("Rename is completed!!!");
})
});

fs.appendFile("./nice.txt", "\nAloha Niggas!!!", () => {
    console.log("Added to file");
});