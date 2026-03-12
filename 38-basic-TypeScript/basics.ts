// data type in typeScript 

// primitive : number , string , boolean , null , undefine , symbol
// non-primitive : array , objects
// function types , parameters 


// by setting it to any we can any type of data to that variable and if we not assign any type than it becomes any by default
// let person : any ;


// Primitive

// let's say we want this to be number we can do this in TS by adding : and than type 
// always remember assign the type in lowercase like ( number & string   not like that  Number & String)
let age: number = 24;
// now you can not assign anything instead of number if you try it will give error 
age = 21; 

let userName: string = 'Om';

let isInstruct : boolean = true ;

// if you set the type to null you can not assign any value to it 
// let hobbies : null ;
// this will give error 
// hobbies = "cricket";



// non-primitive

// if you want array of strings like this we can also create an array for numbers and boolean and so on 
let hobbies: string[] ;
// now you can not add any number or any other data type into this array only strings are allowed 
hobbies = ['sports' , 'number'];

// for object
// keep in mind this {} is just for telling the type it will not create an empty object
// now after doing that we are telling TS that only this structure object is valid and stored 
let person : {
    name : string ,
    age : number
} ;

// i wanna allow this structure in the object but not anything other than that
person = {
    name : 'Om',
    age : 21
}
// i don't want to allow that structure this will give error 
// person = {
//     isEmployee : false 
// }

// this is also not allowed 
// person = {
//     name : 'aditi',
// }
    

// we can also combine the object and array like that
// now here i am telling TS that in people i wan to don't wanna store a single object of that structure , but in array of such objects
let people : {
    name : 'Om',
    age : 21
}[] ;


// type inference 
// that means we have to create a variable and assign the value to that variable in one step
// when you don't set the type of a variable TS assign the type by it's own like here it's assign string to the course due to inference 
// you have to use this style of creating variable TS will take care to assign them a type and take the advantage of inference and you have to write less code
let course = 'React the complete guide';
// this will give an error
// course = 1234;


// union types
// you can assign as many type as you want to a variable like that
let data : string | number | boolean ;
let store : string | string[] ;


// type Aliases 
// you can create the once aliases and than use it to create same types like given below
// you can do this by type keyword this is not available in js but it's used in TS
// you can set any name of your choice which will be your new type name 
// on the right side of the =  we provide a type definition not a JS value 
// now you just have to use this aliases to define this type and you can use it anywhere as you need it 
type Person = {
    name : 'Patel',
    age : 21 
}
// now we can use this Aliases to set the data type to the variable
let om : Person;



// functions & types
// when we are using functions there are different places where types can be assigned 
// we can assign types to the parameters 
// function add(a: number, b: number): number
function add (a : number , b : number){
    // here we are using inference while we return the answer we are setting it to the number 
    return a + b ;
}
// here this function never returns a value therefore it has the special return type called void 
// void is basically comparable to null and undefine , but it only used in conjunction with functions and it means this function never returns 
function printOutput(value : any){
    console.log(value);
}


// Generics 
// right now here we are defining the types to any but when we get the array of numbers or array of strings the type of this variable will be any but this will be not any meaning full because we re not using any feature of js because at the end we are using split method which is only applicable on strings so it will not give any error right now but it will give error on runtime so what the advantage of using TS here 
// so now we are going to invoke the TS functionality so it will detect the type of array while returning the value 
// here we are defining <T> for generic type you can use any other latter here instead of T 
// by adding generic we are telling TS that here those values are not any type of value instead , we tell it that the type of this array and value should be the same just array is an Array , but it's the array full of same type of values 
function insertAtBeginning<T>(array : T[] , value : T ){
    const newArr = [ value , ...array];
    return newArr ;
}

const demoArr = [1,2,3];
const updatedArr = insertAtBeginning(demoArr , -1 ); // TS can detect that the answer will be a number array

// if we are not using generic than we will not get any error now but we will have an error while runtime 
// but when you use generic like we use here it will not let you use this split method on a numbers array or string array because it's only allowed on the single String value 
// updatedArr.split('');
