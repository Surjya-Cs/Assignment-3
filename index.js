import puppeteer from 'puppeteer'


(async()=>{
    const browser = await puppeteer.launch({headless:false});
    const page =await browser.newPage();
    await page.goto("https://www.1mg.com/all-diseases");

    const searching = async (page) => {
        const diseases = await page.evaluate(() => {
            const dname= document.querySelectorAll(".style__font-bold___1k9Dl.style__font-14px___YZZrf.style__flex-row___2AKyf.style__space-between___2mbvn.style__padding-bottom-5px___2NrDR div");
            const details = document.querySelectorAll(".style__font-12px___2ru_e span");

            let newDname = [];
            let newDetails = [];
            dname.forEach((elem)=>{
                newDname.push(elem.innerHTML)
            });
            details.forEach((elem)=>{
                newDetails.push(elem.innerHTML)
            });

            if (newDname.length !== newDetails.length) {
                return 'both Arrays length is not same';
            }
            return {
                newDname,
                newDetails
            }
        });

        if(diseases && diseases.newDname && diseases.newDetails){
            for(let i =0; i<diseases.newDname.length;i++){
                console.log(diseases.newDname[i]);
                console.log(diseases.newDetails[i]);
            }
        }else{
            console.log("error in data printing");
        }
    };

   
     await searching(page);
    
    await browser.close();
})();



