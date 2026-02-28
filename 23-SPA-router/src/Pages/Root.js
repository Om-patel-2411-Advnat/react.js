import { Outlet } from 'react-router-dom'
import MainNavigation from "../components/MainNevigation";

export default function RootElemet(){
    return(
        <>
            <MainNavigation />
            <main>
                <Outlet /> 
            </main>
        </>
    )
}