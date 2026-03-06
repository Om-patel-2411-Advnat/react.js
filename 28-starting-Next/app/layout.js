// this is our root layout component 
// every page can have there own layout component but that is mandatory to have one root layout component into the nex project 

import './globals.css'

// this is also a reserved name if you export a variable or constant with that name , it should contain an object where you can than set title of the objet and a description and also some other metadata fields which than will be applied to the all pages that are covered by that layout 
export const metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
}


// here we can use children prop like this to inject some content into the body tag 
// here you can see we are rendering the html and body tag which we didn't use into the react files and this is compulsory to add this in next project into the root layout to setup the general HTML skeleton of the website
// as you can see we haven't define the head here who controls the metadata and titles and this is not renders inside the component because that can be populated in a different way in NextJs by exporting special variable called " metadata " 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* here this children is the content of the page that's currently active */}
      <body>{children}</body>
    </html>
  );
}
