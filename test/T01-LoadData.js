var fs = require('fs');

// I create a file with a specific name
function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
}

describe('Data is loaded',function  (){
   it('Should show a list of more than two groups', function (){
       browser.get("http://localhost:8080"); // Load ghost navigator
       var groups = element.all(by.repeater('group in groups')); // List of contacts displayed on the virtual page
       browser.driver.sleep(2000);
       
       browser.takeScreenshot().then(function (png) {
    			writeScreenShot(png, 'ng-test.png');
    	});
    	
       expect(groups.count()).toBeGreaterThan(2); // Condition that must be given to succeed
   });
});



/*describe('Data is loaded',function  (){
   it('Should show a list of more than two groups', function (){
       browser.get("http://localhost:8080"); // Load ghost navigator
       var groups = element.all(by.repeater('group in groups')); // List of groups displayed on the virtual page
       expect(groups.count()).toBeGreaterThan(2); // Condition that must be given to succeed
   });
});*/