const { describe, it, after, before } = require('mocha');
const request = require('supertest');
const chaiAsPromised = require('chai-as-promised');
const app = require('../app');

chai.use(chaiAsPromised);

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

(async function example() {
  try {
    describe('Home Page automated testing', async function() {
      this.timeout(50000);
      let driver;
      let page;

      beforeEach(async () => {
        page = new Page();
        driver = page.driver;
        await page.visit('/');
      });

      afterEach(async () => {
        await page.quit();
      });

      it('find the input box and google search button', async () => {
        const result = await page.findInputAndButton();
        expect(result.inputEnabled).to.equal(true);
        expect(result.buttonText).to.include('Google');
      });

      it('put keyword in search box and click search button', async () => {
        const result = await page.submitKeywordAndGetResult();
        expect(result.length).to.be.above(10);
      });
    });
  } catch (ex) {
    console.log(new Error(ex.message));
  } finally {
  }
})();
