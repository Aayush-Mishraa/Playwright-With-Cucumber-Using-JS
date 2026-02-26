const base= require('@playwright/test');

//we are using baseTest instead of test, because we have to use the fixtures defined in the baseTest
//what is fixture 
//fixture is a function that is used to set up the test environment, it can be used to set up the browser, page, and other resources that are needed for the test
//we aslo make custom fixtures in the baseTest, which can be used in the test files, for example we have created a custom fixture called "poManager" in the baseTest,
//  which is an instance of the POMManager class, and we can use it in the test files to access the page objects and their methods

exports.customTest = base.test.extend({
testDataForOrder : {
            "username": "ayush.am77@gmail.com",
            "password": "Aashu072",
            "productName": "ADIDAS ORIGINALl"
      }

})