const express = require('express')
const path = require('path');
const axios = require('axios')
const app = express()
const puppeteer = require('puppeteer')
const { v4: uuid } = require('uuid');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set("view engine", "ejs");
app.set('views', __dirname + '/views')
app.set('pdfs', __dirname + '/pdfs')


app.listen(port = '3000', () => {

    console.log(`Listening on port ${port}...`)
})


app.get('/', (req, res) => {


    res.render('home.ejs')

})





app.post('/form', async (req, res) => {

    console.log(req.body)
    const { url } = req.body
    console.log(url)

    // Creates browser instance 
    const browser = await puppeteer.launch();

    // Creates page instance
    const page = await browser.newPage();

    // If Link is not valid, it will redirect to the form submission via the catch 
    try {

        // Goes to URL and establishes page
        await page.goto(url, { waitUntil: 'networkidle0' });

        // const selectors = { 
        
        // div: document.querySelectorAll('div'), 
        // img: document.querySelectorAll('img'), 
        // video: document.querySelectorAll('video'),
        // p:document.querySelectorAll('p'),
        // a:document.querySelectorAll('a'),
        // script:document.querySelectorAll('script'),
        // link:document.querySelectorAll('link')

        // }

        // for (let key of (Object.keys(selectors))){

        //     if(Boolean(selectors[key]) && selectors[key].length>0){
        //     console.log('Found'+ key)
                
        //     }
            
        // }

        // await page.waitForSelector('img', { timeout: 5_000 });
        // // await page.waitForSelector('video', { timeout: 5_000 });
        // await page.waitForSelector('p', { timeout: 5_000 });
        // await page.waitForSelector('a', { timeout: 5_000 });
        // await page.waitForSelector('script', { timeout: 5_000 });
        // await page.waitForSelector('link', { timeout: 5_000 });
        page.waitForNetworkIdle()    

        await page.emulateMediaType('screen');


        // Generates a unique ID for the PDF 
        const fileId = uuid()
        const fileName = `result-${fileId}.pdf`
        const screenShotName = `result-${fileId}.png`



        // Prints to PDF and saves under PATH
        const pdf = await page.pdf({
            path: `./pdfs/result-${fileId}.pdf`,
            margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
            printBackground: true,
            format: 'A4',
        });

        // Takes a Screenshot and saves under PATH
        await page.screenshot({
            "type": "png", // can also be "jpeg" or "webp" (recommended)
            "path": `./screenshots/result-${fileId}.png`,  // where to save it
            "fullPage": true,  // will scroll down to capture everything if true
        });



        // Closes the browser session

        await browser.close();



        res.render('result.ejs', { fileId, fileName, screenShotName })


    } catch (e) {

        res.redirect('/form')
        console.log(__dirname)
        console.log('There Seems To Be An Error: ' + e)




    }




})


app.get('/fetchPdf', (req, res) => {

    const { fileName } = req.query
    console.log(req.query)
    res.sendFile(path.join(__dirname, `/pdfs/${fileName}`));

})

app.get('/fetchScreenshot', (req, res) => {

    const { fileName } = req.query
    console.log(req.query)
    res.sendFile(path.join(__dirname, `/screenshots/${fileName}`));

})



app.get('*', (req, res) => {


    res.send("Page Not Found...")


})




