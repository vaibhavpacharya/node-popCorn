const { describe, it, after, before } = require('mocha');
const request = require('supertest');
// const chaiAsPromised = require('chai-as-promised');
const app = require('../app');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');

// var driver = new webdriver.Builder()
//     .forBrowser("chrome")
//     .setFirefoxOptions( /* … */)
//     .setChromeOptions( /* … */)
//     .build();
// chai.use(chaiAsPromised);

const route = '/';

// it('Main page content', function(done) {
//   request(app)
//     .get(route)
//     .then(res => {
//       console.log('res', res);

//       // expect(res).to.have.status(200);
//       // expect(res).to.be.json();
//       // expect(res.body).to.be.eql(getDidYouKnowResponse);
//       done();
//     });
//   // request('http://localhost:8080' , function(error, response, body) {
//   //     expect(body).to.equal('Hello World');
//   //     done();
//   // });
// });

// let driver = new webdriver.Builder()
//     .withCapabilities(chromeCapabilities)
//     .usingServer('http://localhost:3000')
//     .forBrowser('chrome')
//     .build();




var driver = new webdriver.Builder()
    .withCapabilities( { "browserName" : chrome } )
    .forBrowser('chrome')
    .usingServer('http://127.0.01:3000/')
    .build();

    // var driver = new webdriver.Builder()
    // .build();

// (async function example() {
//   try {
//     describe('Home Page automated testing', async function() {
//       this.timeout(50000);
//       let driver;
//       let page;

//       beforeEach(async () => {
//         page = new Page();
//         driver = page.driver;
//         await page.visit('/');
//       });

//       afterEach(async () => {
//         await page.quit();
//       });

//       it('find the input box and google search button', async () => {
//         const result = await page.findInputAndButton();
//         expect(result.inputEnabled).to.equal(true);
//         expect(result.buttonText).to.include('Google');
//       });

//       it('put keyword in search box and click search button', async () => {
//         const result = await page.submitKeywordAndGetResult();
//         expect(result.length).to.be.above(10);
//       });
//     });
//   } catch (ex) {
//     console.log(new Error(ex.message));
//   } finally {
//   }
// })();
describe( 'Test Suite' , function(){

  // before(function(){
  //     driver.get("http://127.0.01:3000/");
  // });

  // after(function(){

  //     return driver.quit();

  // });

  it( 'Test Case', function(){
    // Run a test
      // var element =   driver.findElement(webdriver.By.className('btn-red'));
      // var  successMsg             = "Welcome to foo. You logged in successfully.";
    // Assert.assertEquals (message, successMsg);
     driver.get("http://127.0.01:3000/");

    const element = webdriver.By.className('btn-red');
    driver.wait(webdriver.until.elementLocated(element));
    const whatElement = driver.findElement(element);
    console.log('<<<<<whatElement>>>>>\n',whatElement);
    driver.wait(webdriver.until.elementIsVisible(whatElement), 5000).click();
          console.log('<<<<<element>>>>>>\n',element);
        if(whatElement === 'webdriver - Google Search') {
          console.log('Test passed');
        } else {
          console.log('Test failed');
        }    
          // expect(title).equals(my_title);
      });
    });

// driver.get("http://www.google.com");
// driver.getTitle().then(function( title ) {

//     // google page title should be printed 
//     console.log(title)

// });

// driver.quit();



//     driver.get("localhost:3000");

// driver.findElement(By.name('q')).sendKeys('webdriver');

// driver.sleep(1000).then(function() {
//   driver.findElement(By.name('q')).sendKeys(webdriver.Key.TAB);
// });

// driver.findElement(By.name('btnK')).click();

// driver.sleep(2000).then(function() {
//   driver.getTitle().then(function(title) {
//     if(title === 'webdriver - Google Search') {
//       console.log('Test passed');
//     } else {
//       console.log('Test failed');
//     }
//     driver.quit();
//   });
// });

// var driver = new webdriver.Builder()
// .forBrowser('chrome')
// .build();
// driver.get('http://www.google.com/ncr');
// driver.sleep(1000);
// driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
// driver.findElement(webdriver.By.className('btnG')).click();
// driver.wait(webdriver.until.titleIs('webdriver - Google Search'), 1000);
// driver.quit();