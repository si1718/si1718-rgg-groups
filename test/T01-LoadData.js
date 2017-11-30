var fs = require('fs');

function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
}

describe('Data is loaded',function  (){
   it('Should show a list of more than two contacts', function (){
       browser.get("http://localhost:8080");
       var contacts = element.all(by.repeater('contact in contacts'));
       browser.driver.sleep(2000);
       
       browser.takeScreenshot().then(function (png) {
    			writeScreenShot(png, 'ng-test.png');
    	});
    	
       expect(contacts.count()).toBeGreaterThan(2);
   });
});

/*describe('Data is loaded',function  (){
   it('Should show a list of more than two contacts', function (){
       browser.get("http://localhost:8080");
       var contacts = element.all(by.repeater('contact in contacts'));
       expect(contacts.count()).toBeGreaterThan(2);
   });
});*/