// export default function Tabs({Children , button}){
//     return(
//         <>
//             <menu>
//                 {button}
//             </menu>
//             {Children}
//         </>
//     )
// }

// now this is not much flexible as we want so let's make it 

// now here this menu act as a default value we can chage if we want to
export default function Tabs({Children , button ,ButtonComponent = 'menu'}){
    // we use this Buttoncomponent because it gives us flexibility about the any html tag that we want to use 
    return(
        <>
            <ButtonComponent>
                {button}
            </ButtonComponent>
            {Children}
        </>
    )
}