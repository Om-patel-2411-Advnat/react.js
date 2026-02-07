
// you can use props like this because children is th inbuild property of props with that it can access the content ot it's parent 
// export default function TabButton (props){
//     return (
//         <li>
//             <button>
//                 {props.children}
//             </button>
//         </li>
//     )
// }

// you can directly use children properties also
// export default function TabButton({children}){

//     function Handleclick(){
//         console.log("hello")
//     }

//     return (
//         <li>
//             {/* here if we use Handleclick() then the function will be executed when ever this line will be executed that's why we use it as a value 'Handleclick' */}
//             <button onClick={Handleclick}>
//                 {children}
//             </button>
//         </li>
//     )
// }


// now if we want to change some text on click event than we will be not able to handle the content in this file so for that we have to pass this event to the main app.js file so we can handle it there but keep in mind that onclick event will be perform by the react into this file only
export default function TabButton({children , isSelected , ...props}){

    return (
        <li>
            {/* here if we use Handleclick() then the function will be executed when ever this line will be executed that's why we use it as a value 'Handleclick' */}
            <button className ={isSelected ? 'active' : undefined} {...props}>
                {children}
            </button>
        </li>
    )
}