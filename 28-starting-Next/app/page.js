// this is server component which executes on the server side and it's not executed on the client side and when you print any console.log statement it will be printed on the server side not on the client side and the jsx code is than sended to the client side and then it is executed on the client side and you will see the result on the client side
// in nextjs filename is very important because those filename that tells Nextjs that we wanna have this as a page 
// if you want to create a new page you can add new paths , which you wanna handle as a routes by adding new folders 
// example :- if you want to support a '/about' route , we have to ass an about folder inside of the folder yo have add a page.js file if you want to render a page 

import Link from "next/link";

// we can import the components and can use them in file and those component files will be not treated as a page 
// here we can get the component by referring to the root folder (here root folder is app) so when we add " @ " we start from the root folder and than navigate to the desired file from there 
import Header from "@/app/components/header";


export default function Home() {
  console.log('Home component rendered');
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      {/* here this will reload the page when you go to the about us page and this will no longer keep the functionality of the Single Page Application */}
      {/* <p><a href="/about">About Us</a></p> */}

      {/* now for keeping the SPA functionality we can import the Link tag from the next js as we do here and we can also pass the href to that component and also className and every other properties  */}
      <p><Link href="/about">About Us</Link></p>
    </main>
  );
}
