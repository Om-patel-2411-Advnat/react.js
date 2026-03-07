// here we are going to fetch the data from out dummy database tha we created using " npm install better-sqlite3 "
import fs from 'node:fs';
import sql from 'better-sqlite3';
// this is used to create UNIQUE slug for our meal 
import slugify from 'slugify';
// XSS (Cross-Site Scripting) is a security vulnerability where an attacker injects malicious JavaScript into a website so that it runs in other users' browsers.
// xss is a library that cleans user-input HTML to remove malicious scripts and prevent XSS attacks.
// It filters unsafe HTML so attackers cannot inject JavaScript into your website.
import xss from 'xss';

const db = sql('meals.db');

// we want to return a promise here so we will use async await here 
// we can use async and await on the component function in NextJS like we did here 
export async  function getMeals(){

    // await new Promise((resolve)=>setTimeout(resolve , 2000));

    // throw new Error('Loading meals Failed');

    // here .run() will be used if you are inserting the data or if you are changing data 
    // db.prepare('SELECT * FROM meals').run(); 

    // if you want just single row 
    // db.prepare('SELECT * FROM meals').get(); 

    // here we are going to use .all() because it's used for fetching the data 
    return db.prepare('SELECT * FROM meals').all(); 
}

export async function getMeal(slug){
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function SaveMeal(meal){
    // this lower will convert every character into lower case 
    meal.slug = slugify(meal.title , {lower : true});
    // here we are cleaning the instructions as we are passing it in direct HTML formate    
    meal.instructions = xss(meal.instructions); 

    // now all the data is been converted only image is left because the image should be stored into the image folder and the url should be stored into the database 
    // here first we will split the the image in ' .' and pop the last element , which will be our extension 
    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    // here this function wants image into chunks so first we have to convert the image into chunks 
    // it takes second argument is a function and it takes error if any occurre 
    stream.write(Buffer.from(bufferedImage) , (error)=>{
        if(error){
            throw new Error('Saving image failed');
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
            INSERT INTO meals
                (title , summary , instructions , creator , creator_email , image , slug)
            VALUES (
                @title,
                @summary,
                @instructions,
                @creator,
                @creator_email,
                @image,
                @slug
            )            
        `).run(meal);
}