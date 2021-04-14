
const puppeteer= require('puppeteer');

const data= require("./credentials.json");

(async function(){
    const browser=await puppeteer.launch({headless:false,defaultViewport:false});
    const page=await browser.newPage()
   // let page=await pages[0];
   
    await page.goto('https://www.instagram.com/',{waitUntil:"networkidle2"});
    await page.type("input[name='username']",data.user,{delay:30});
    await page.type("input[name='password']",data.password,{delay:30});
    
    await Promise.all([
        page.waitForNavigation({waitUntil:"networkidle2"}),
        page.click("button[type='submit']"),
    ]);

    await page.type("input[placeholder='Search']","pranshu_katyal");
    await page.waitForSelector("._01UL2 .fuqBx a",{visible:true});

    await Promise.all([
        page.waitForNavigation({waitUntil:"networkidle2"}),
        await page.click("._01UL2 .fuqBx a"),
    ]);
   await page.waitForSelector(".g47SY",{visible:true});
    let posts=await page.$$(".g47SY");
    let details={};

   for(let i=0;i<posts.length;i++){
    let arr= await page.evaluate(function(ele){
       return ele.textContent;

   },posts[i])
   if(i==0){
   details["posts"]=arr;
}else if(i==1){
    details["followers"]=arr;
}else{
    details["following"]=arr;
}

}
console.log(details);
   
 //console.log(data);
    await page.screenshot({ path: 'example.png' });

  await browser.close();

})();
