import { Component } from "react";

class ErrorBoundary extends Component{

    constructor(){
        super();
        this.state = {
            hasError : false ,
        }
    }

    // this lifecycle method can be added to any class based component 
    // when ever you add this into any class based component it makes that component an error boundary
    // if you want to create an error boundary it should be class based component 
    // this method will be triggered whenever one of the child component throws an error or generates an error 
    // there for in error boundary we a dd a render method like all components and we return this.props.children 
    // here we return this.props.children because we want to wrap my error  boundary component around components which should be protected by that component 
    componentDidCatch(error){
        this.setState({hasError : true});
    }
    render(){
        if(this.state.hasError){ 
            return <h2>Something Went Wrong!!</h2> ;
        }
        return this.props.children ;
    }
}

export default ErrorBoundary  ;