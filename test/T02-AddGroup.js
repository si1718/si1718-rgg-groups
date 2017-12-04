describe('Add group', function () {
	it('Should add a new group', function (){
		browser.get('http://localhost:8080'); // Load ghost navigator (list.html)
		
		var GroupsNumberBefore, GroupsNumberAfter;
		
		// I put the group elements in the initialGroups variable
		var groups = element.all(by.repeater('group in groups')).then(function (initialGroups){
			GroupsNumberBefore = initialGroups.length;
			browser.driver.sleep(2000);
			
			browser.get('http://localhost:8080/#!/create'); // Load ghost navigator (create.html)
			// The element of the inputs is taken. In create.html there are inputs with ng-model, those values are taken.
			// With sendKeys I put values
			element(by.model('newGroup.scientificTechnicalArea')).sendKeys('area a AAA');
			element(by.model('newGroup.name')).sendKeys('name of the research group');
			//var num = Math.floor(Math.random() * (9999 - 100)) + 100;
			element(by.model('newGroup.idGroup')).sendKeys('aaa1923');// + num);
			element(by.model('newGroup.leader')).sendKeys('leader`s name');
			element(by.model('newGroup.phone')).sendKeys('111111111');
			element(by.model('newComponent')).sendKeys('component1');
			// Click on the Add component button on the web
			element(by.buttonText('Add component')).click().then(function (){
				element(by.model('newLine')).sendKeys('lineOfInvetifgation1');
				// Click on the Add line button on the web
				element(by.buttonText('Add line')).click().then(function (){
					element(by.model('newActivity')).sendKeys('newActivityName1');
					// Click on the Add activity button on the web
					element(by.buttonText('Add activity')).click().then(function (){
						element(by.model('newTechnology')).sendKeys('newTechnologyName1');
						// Click on the Add technology button on the web
						element(by.buttonText('Add technology')).click().then(function (){
							// Click on the Add Group button on the web
							element(by.buttonText('Add Group')).click().then(function (){
								browser.driver.sleep(2000);
								browser.get('http://localhost:8080'); // Load ghost navigator (list.html)
								// They go back to take the groups and see that there is one more
								// Will succeed if there is one more group in the list
								var newGroupList = element.all(by.repeater('group in groups')).then(function (newGroupList){
									expect(newGroupList.length).toEqual(initialGroups.length + 1);
								});
							});
						});
					});
				});
			});
		});
	});
});