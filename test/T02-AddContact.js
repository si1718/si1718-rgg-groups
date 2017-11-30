describe('Add contact', function () {
	it('should add a new contact', function (){
		browser.get('http://localhost:8080');

		element.all(by.repeater('contact in contacts')).then(function (initialContacts){
				browser.driver.sleep(2000);
	
				element(by.model('newContact.name')).sendKeys(Math.random());
				element(by.model('newContact.email')).sendKeys('pepe@pepe.com');
				element(by.model('newContact.phone')).sendKeys('ZZZZZZZZZZ');
				
				element(by.buttonText('Add')).click().then(function (){

					element.all(by.repeater('contact in contacts')).then(function (contacts){
						expect(contacts.length).toEqual(initialContacts.length+1);
					});
				
				});
			
		});
	});
});
//cd si1718-rgg-groups/

//npm install

//npm install protractor -g

//nvm ls

//npm install phantomjs -g

//mkdir test

//cd test/

//Create archives

//phantomjs --webdriver=9515

//Another bash: protractor test/protractor-conf.js

//npm install cors --save

// node.js: var cors = require('cors') y app.use(cors());

// Crear dentro de test los graph

// npm install rand-token --save