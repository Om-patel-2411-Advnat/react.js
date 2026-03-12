import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe('Async component' ,()=>{
    test('renders posts' ,async ()=>{

        // here we don't want to send http request too fetch the data because sometimes we just don't fetch the data but we update it via put and post request and we don't want to test it because those are handled by browser 
        // this test function will send request to the server every time we run the test
        // for avoiding that we have to use mock function this function will be the copy of the function who is sending request and here in mock function we will not send request at all
        // this will create a dummy function here 
        window.fetch = jest.fn();
        // this function allows us to set a value , this fetch function should resolve to when it's being call, and it should resolve to something that is then used here by our code 
        // here we are setting the object value as a resolve value in the actual function so here we will set mockResolvedValueOnce to an object
        window.fetch.mockResolvedValueOnce({
            // we set the value to the array because we are getting data in an array form 
            // for checking the one case we ae setting one value
            json : async ()=>[{id : 'p1' , title : 'First post'}]
        });

        render(<Async />);

        const ListItemElements = await screen.findAllByRole('listitem');
        expect(ListItemElements).not.toHaveLength(0);
    });
});