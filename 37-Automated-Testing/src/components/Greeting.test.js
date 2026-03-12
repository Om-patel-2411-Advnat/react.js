// you can write this test in a app.text.js file but it's more convenient to write a test for separate component in a separate file

import { render , screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event' ;
import Greeting from "./Greeting";

// we might have thousands of test cases and to organize and group those different tests , you often organize them into different testing suites 
// for example all the test belong into one feature or one component of your application could be grouped into one testing suite and you create such a testing suite by using one more global " describe function " .
// you give it two arguments where the first argument is a description and this is a description if this category to which your different tests will then belong  
// the second argument is anonymous function but didn't write your testing code itself but instead you put you different tests in there 
// that's how you can group your tests 
describe('Greeting component' , ()=>{
    // this is a global function you can directly usee it you don't have to import or anything
    // the second argument to this test function is an anonymous function , which will contain the actual testing code 
    test('renders Hello world as a text' ,()=>{
        // Arrange
        // this is a render function which set up the which part should be tested and in this function we write the JSX code 
        render(<Greeting />);
    
        // Act
        // .....Here we have no functionality so we can check the logic or something like that 
    
        // Assert
        // this screen gives us access to the virtual dom of the react
        // now for finding the element you have various functions available like " find functions " , " query functions " etc...
        // the main difference is when these functions throw errors and if they return a promise or not 
        // for example get function will throw an error if an element is not found , but query function won't do that , and find function will return a promise.
        // if you set exact as true than it will check for the exact string or data also casing but when you set it false it will just find this data but not go for the casing 
        const HelloWorldElement = screen.getByText('Hello world', { exact : false });
        // now we will add the assertion and check whether this element is exist or not 
        // for doing that we are going to use expect function and into that we can pass our testing result value and that can be anything string , number etc... 
        // and on result of this expect function we got various matrix like this and by adding not in front of it the result will be reversed ( like true to false )
        expect(HelloWorldElement).toBeInTheDocument();
    
    } );

    test('render a paragraph if the changed state is false' , ()=>{
        render(<Greeting />);

        const ChangedParagraph = screen.getByText('It is good to see you' , {exact : false});
        expect(ChangedParagraph).toBeInTheDocument();
    });

    test('render "Changed!!!" if the button is clicked' , async ()=>{
        // Arrange
        render(<Greeting />);

        // Act
        const ButtonElement = screen.getByRole('button');
        // when using userEvent you should " await " userEvent.click(). hence , the test function must be async
        await userEvent.click(ButtonElement);

        // Assert
        const outputElement = screen.getByText('changed' , {exact : false});
        expect(outputElement).toBeInTheDocument();
    });

    test('render "It is good to see you" is visible or not' ,async ()=>{
        render(<Greeting />);

        const ButtonElement  = screen.getByRole('button');
        await userEvent.click(ButtonElement);

        const outputElement = screen.queryByText('It is good to see you', { exact: false });
        expect(outputElement).toBeNull();
    });

    
});
