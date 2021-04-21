const puppeteer = require("puppeteer");
// let { answers } = require("./codes");
const {email,password}= require('./files/secret');
// const input = ["Arsenal","Pepcoding","Javascript.tips","monicabellucciofficiel"];
const input = ["Arsenal","Pepcoding","javascript.tips","penelopecruzoficial"];
const str = "I have used puppeteer to implement this script. Thanks to Pepcoding and jasbeer sir for making promises and async/await easy to understand "
let cTab1;
// let cTab2;

(async function fn(){
    try{
        let browserOpenPromise = puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let browser = await browserOpenPromise;
        cTab1 = await browser.newPage();
        await cTab1.goto("https://www.instagram.com");
        
        //waiting for input fields.
        await cTab1.waitForSelector("input[type='text']", { visible: true });
        await cTab1.waitForSelector("input[name='password']", { visible: true });

        await cTab1.type("input[type='text']",email,{delay:250});
        await cTab1.type("input[name='password']",password,{delay:200});
        
        //waiting for login button 
        await cTab1.waitForSelector("button[type='submit']", { visible: true });
        await cTab1.click("button[type='submit']");

        
        await cTab1.waitForSelector(".piCib", { visible: true });
        await cTab1.waitForSelector(".mt3GC>:nth-child(2)", { visible: true });
        //.mt3GC>:nth-child(2)
        await cTab1.click(".mt3GC>:nth-child(2)");
        //waiting to simulate one job is done and next is going to start.
        await cTab1.waitForSelector(".zGtbP.IPQK5.VideM",{visible:true});
        
        await changeProfilePic();
        await cTab1.waitForTimeout(4000);

        await cTab1.goto("https://www.instagram.com");
        await cTab1.waitForSelector(".zGtbP.IPQK5.VideM",{visible:true});
       
        for(let i=0;i<input.length;i++){
            await searchInput(input[i]);

        }

        await cTab1.waitForTimeout(4000);
        await logOut();

        await changeTab(browser);
    } 
    catch(err){
        console.log(err)
    }
})();
async function searchInput(newInput){
    try{
        // waiting for search input
        await cTab1.waitForSelector(".XTCLo.x3qfX",{ visible: true });
        await cTab1.type(".XTCLo.x3qfX",newInput,{delay:200});
        
        //waiting for dropdown list 

        await cTab1.waitForSelector(".fuqBx",{ visible: true });
        await cTab1.waitForSelector(".fuqBx>:nth-child(1)>a",{ visible: true });

        await cTab1.evaluate(consoleFn,".fuqBx>:nth-child(1)>a");

        //wait for selector on next page 
        await cTab1.waitForSelector(".v9tJq.AAaSh.VfzDr");
        let links = await cTab1.evaluate(consolefn1);
        for(let i=0;i<4;i++){
            
            await  likeAndComment(links[i])

        }
        
        await cTab1.goto("https://www.instagram.com");
        
        return await cTab1.waitForSelector(".zGtbP.IPQK5.VideM");
        
    }
    catch(err){
      console.log(err);
    }
}
async function likeAndComment(url){
    try{
        let fullLink = `https://www.instagram.com${url}`;

        await cTab1.goto(fullLink);
         await cTab1.waitForSelector(".eo2As",{visible:true});
       
       //waiting for like  button 
     
       await cTab1.waitForSelector(".ltpMr.Slqrh>:nth-child(1) button",{visible:true});
        await cTab1.click(".ltpMr.Slqrh>:nth-child(1) button");

        //waitng for comment input
        await cTab1.waitForSelector(".Ypffh");
        await cTab1.type(".Ypffh","Such a great Post",{duration:250});

        //click on post button;
        await cTab1.waitForSelector(".X7cDz>[type='submit']");
        await cTab1.click(".X7cDz>[type='submit']");

        return await cTab1.waitForSelector(".XQXOT");
    }
    catch(err){
        console.log(err);
    }
   
}
async function waitAndClick(selector) {
    try {
        await cTab.waitForSelector(selector, { visible: true });
        await cTab.click(selector);
        console.log("done");
    }
    catch (err) {
        return new Error(err);
    }
}

async function changeProfilePic(){
    try{
        await cTab1.waitForSelector(".MWDvN.nfCOa",{visible:true});
    await cTab1.waitForSelector("._47KiJ>:nth-child(5)>span",{visible:true});

    await cTab1.click("._47KiJ>:nth-child(5)>span");
    
    //waiting drop down after clicking on profile icon
    await cTab1.waitForSelector("._01UL2",{visible:true});
    await cTab1.waitForSelector("._01UL2>:nth-child(1)",{visible:true});
    await cTab1.click("._01UL2>:nth-child(1)");

    //waiting for selector on next page 
    await cTab1.waitForSelector(".v9tJq.AAaSh.VfzDr",{visible:true});
    await cTab1.waitForSelector("._4dMfM",{visible:true});
    await cTab1.waitForSelector("._4dMfM>div>button",{visible:true});

    const [fileChooser] = await Promise.all([
        cTab1.waitForFileChooser(),
        cTab1.click("._4dMfM>div>button")
    ]);

    await fileChooser.accept(['/home/rohan/Desktop/download.jpeg']);
    }
    catch(err){
      console.log(err);
    }

}

async function logOut(){
    try{
        await cTab1.waitForSelector(".MWDvN.nfCOa",{visible:true});
        await cTab1.waitForSelector("._47KiJ>:nth-child(5)>span",{visible:true});
    
        await cTab1.click("._47KiJ>:nth-child(5)>span");
        await cTab1.waitForSelector("._01UL2",{visible:true});
    
        await cTab1.waitForSelector("._01UL2>:nth-child(6)",{visible:true});
        await cTab1.click("._01UL2>:nth-child(6)");
    
        await cTab1.waitForTimeout(3000);
    }
    catch(err){
       console.log(err);
    }

}

async function changeTab(browser){
     try{
        cTab2 =  await browser.newPage(); 
        await cTab2.goto("https://www.rapidtables.com/tools/notepad.html");
   
        await cTab2.waitForSelector("div#toolbar");
        await cTab2.waitForSelector("div#toolbar>:nth-child(9)");
        for(let i=0;i<10;i++){
            await cTab2.click("div#toolbar>:nth-child(9)");
        }
   
        await cTab2.waitForSelector("textarea#area");
        await cTab2.type("textarea#area",str,{delay:200});
   
        await browser.close();
     }
     catch(err){
         console.log(err);
     }
    
}

function consoleFn(selector){
    let elem = document.querySelectorAll(selector);
    return  elem[0].click();
}

function consolefn1(){
    let aTags = document.querySelectorAll(".v1Nh3.kIKUG._bz0w>a");
    let linkArr = [];
    for(let i=0;i<aTags.length;i++){
        linkArr.push(aTags[i].getAttribute("href"));
    }
    return linkArr;
}