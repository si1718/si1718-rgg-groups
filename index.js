var express = require('express');
var bodyParser = require("body-parser"); // Convert code js to json
var MongoClient = require("mongodb").MongoClient; // Access module to mongodb instantiated and client created
var ObjectID = require("mongodb").ObjectID;

var mongodbURL = "mongodb://rafagroups:rafagroupspass@ds159845.mlab.com:59845/si1718-rgg-groups";

var app = express();

app.use(bodyParser.json()); // Use json middleware form the body-parser module

var baseURL = "/api/v1";

var db;

// Connect to mongodbURL and return the database
MongoClient.connect(mongodbURL, {native_parser:true}, (err, database) => {
    db = database.collection("groups");
    if (err) throw err;
    console.log("INFO: Database obtained");
});


// Function that checks all post errors
function validationPost(res, groups, idLetters, idG, phone, components){
    var existingIdGroup = groups.filter((g) => {
        return (g.idGroup == idG);
    });
        
    if (existingIdGroup.length >= 1) {
        console.log("WARNING: New POST to /groups with a conflict because the group id already exists");
        res.sendStatus(409);
    }
    else{
        var letters = 0;
        
        for (var i = 0; i < idLetters.length; i++) {
            if (isNaN(idLetters[i]))
                letters++;
        }
        
        if (letters != idLetters.length) {
            console.log("WARNING: New POST to /groups without letters id or letters id incorrect in the name of the area");
            res.sendStatus(400);
        }
        else{ // The format of the area name is correct
            // idGroup validation
            if (idG.substr(0, 3) != idLetters) {
                console.log("WARNING: New POST to /groups with letters id of the area or letters id of the idGroup incorrects");
                res.sendStatus(400);
            }
            else if (idG.length < 6 || idG.length > 7 || isNaN(idG.substr(3, idG.length))) {
                console.log("WARNING: New POST to /groups with idGroup incorrect");
                res.sendStatus(400);
            }
            else{ // idGroup inserted is correct
                // Phone validation
                if (isNaN(phone) || phone.length != 9) {
                    console.log("WARNING: New POST to /groups with an incorrect phone number");
                    res.sendStatus(400);
                }
                else{ // Phone is correct
                    var telephone1;
                    var si = 1;
                    for (var i = 0; i < components.length; i++){
                        if (components[i].length == 2){
                            telephone1 = components[i][1].substr(10, components[i][1].length);
                            
                            if (isNaN(telephone1) || telephone1.length != 9) {
                                console.log("WARNING: New POST to /groups with a component whose phone number is incorrect");
                                res.sendStatus(400);
                                si = 0;
                            }
                        }
                    }
                    if (si == 1){ return 1; }
                }
            }
        }
    }
}


// POST: Insert a new group
app.post(baseURL + '/groups', function (req, res) {
    var newGroup = req.body; // Data inserted by the user
    var iniciales = newGroup.scientificTechnicalArea.substr(newGroup.scientificTechnicalArea.length-3, 3).toLowerCase();
    var id = newGroup.idGroup.toLowerCase();
    var telephone = newGroup.phone;
    var components = newGroup.components;
    
    db.find({}).toArray((err, groups) => { // Return an array which contains all groups
        if (validationPost(res, groups, iniciales, id, telephone, components) == 1) {
            db.insert(newGroup);
            res.sendStatus(201);
            console.log("INFO: New POST to /groups with a new group created and he has been inserted into the database");
        }
        if (err) {
            console.error('WARNING: Error inserting data into the database');
            res.sendStatus(500);
        }
    });
})


// GET all existing groups. Responds to the get method when the resource baseURL + '/groups' is invoked
app.get(baseURL + '/groups', function (req, res) {
    db.find({}).toArray((err, groups) => { // Return an array which contains all groups
        if (groups.length >= 1) {
            res.send(groups);
            console.log("INFO: All groups have been shown");
        }
        else if (err) {
            console.error('WARNING: Error getting data from the database');
            res.sendStatus(500);
        }
        else{
            console.log("WARNING: New GET to /groups and no groups was found in the database");
            res.sendStatus(404);
        }
    });
})


// PUT a new group
app.put(baseURL + '/groups', function (req, res) {
    console.log("WARNING: New PUT to /groups, this method is not allowed");
    res.sendStatus(405);
})


// DELETE all groups
app.delete(baseURL + '/groups', function (req, res) {
    db.find({}).toArray((err, groups) => { // Return an array which contains all contacts
        if (groups.length >= 1){
            groups = [];
            db.remove({});
            console.log("INFO: All groups are been deleted");
            res.send();
        }
        else if (err) {
            console.error('WARNING: Error deleting data from the database');
            res.sendStatus(500);
        }
        else{
            console.log("WARNING: New DELETE to /groups and there aren´t groups in the database");
            res.send();
        }
    });
})


// POST: Insert a group knowing some data
app.post(baseURL + '/groups/*', function (req, res) {
    console.log("WARNING: New POST to /groups/*, this method is not allowed");
    res.sendStatus(405);
})


// GET an existing group knowing the group id
app.get(baseURL + '/groups/:idGroup', function (req, res) {
    db.find({}).toArray((err, groups) => { // Return an array which contains all groups
        if (groups.length >= 1) {
            var id = req.params.idGroup.toLowerCase();
            
            var filteredGroup = groups.filter((g) => {
                return (g.idGroup == id);
            });
            
            if (filteredGroup.length == 1) {
                res.send(filteredGroup);
                console.log("INFO: The group whose group id is " + id + " has been shown");
            }
            else{
                console.log("WARNING: New GET to /groups/:idGroup with a nonexistent group");
                res.sendStatus(404);
            }
        }
        else if (err) {
            console.error('WARNING: Error getting data from the database');
            res.sendStatus(500);
        }
        else{
            console.log("WARNING: New GET to /groups/:idGroup and no groups was found in the database");
            res.sendStatus(404);
        }
    });
})

// Function that modifies the url of the following function get
function getOriginalString(cadena){
   // We put accents and "ñ"
   for (var i = 0; i < cadena.length; i++) {
       cadena = cadena.replace("1","á");
       cadena = cadena.replace("2","é");
       cadena = cadena.replace("3","í");
       cadena = cadena.replace("4","ó");
       cadena = cadena.replace("5","ú");
       cadena = cadena.replace("6","ñ");
       cadena = cadena.replace("-", " ");
   }
   
   return cadena;
}


// GET existing groups knowing the area name
app.get(baseURL + '/groups1/:area', function (req, res) {
    db.find({}).toArray((err, groups) => { // Return an array which contains all contacts
        if (groups.length >= 1) {
            var area = req.params.area;
            
            for (var i = 0; i < area.length; i++)
                area = area.replace("-", " ");
            
            area = getOriginalString(area);
            
            var filteredGroups = groups.filter((a) => {
                return (a.scientificTechnicalArea == area);
            });
            
            if (filteredGroups.length >= 1) {
                res.send(filteredGroups);
                console.log("INFO: The groups whose area was " + area + " have been shown");
            }
            else{
                console.log("WARNING: New GET to /groups1/:area with nonexistent groups");
                res.sendStatus(404);
            }
        }
        else if (err) {
            console.error('WARNING: Error getting data from the database');
            res.sendStatus(500);
        }
        else{
            console.log("WARNING: New GET to /groups1/:area and no groups was found in the database");
            res.sendStatus(404);
        }
    });
})


// Get existing groups knowing the responsible
app.get(baseURL + '/groups2/:responsible', function (req, res) {
    db.find({}).toArray((err, groups) => { // Return an array which contains all contacts
        if (groups.length >= 1) {
            var responsible = req.params.responsible;
            
            for (var i = 0; i < responsible.length; i++)
                responsible = responsible.replace("-", " ");
            
            responsible = getOriginalString(responsible);
            
            var filteredGroups = groups.filter((r) => {
                return (r.responsible == responsible);
            });
            
            if (filteredGroups.length >= 1) {
                res.send(filteredGroups);
                console.log("INFO: The groups whose responsible was " + responsible + " have been shown");
            }
            else{
                console.log("WARNING: New GET to /groups2/:responsible and the responsible was not found in the database");
                res.sendStatus(404);
            }
        }
        else if (err) {
            console.error('WARNING: Error getting data from the database');
            res.sendStatus(500);
        }
        else{
            console.log("WARNING: New GET to /groups2/:responsible with nonexistent groups in the database");
            res.sendStatus(404);
        }
    });
})


// Function that checks all update errors
function validationUpdate(res, idLetters, phone, components){
    var letters = 0;
        
    for (var i = 0; i < idLetters.length; i++) {
        if(isNaN(idLetters[i]))
            letters++;
    }
     
    if (letters != idLetters.length) {
        console.log("WARNING: New PUT to /groups/:idGroup without letters id or letters id incorrect in the name of the area");
        res.sendStatus(400);
    }
    else{ // The format of the area name is correct
        // Phone validation
        if (isNaN(phone) || phone.length != 9) {
            console.log("WARNING: New PUT to /groups/:idGroup with an incorrect phone number");
            res.sendStatus(400);
        }
        else{ // Phone is correct
            //Components phone validation
            var telephone1;
            var si = 1;
            for (var i = 0; i < components.length; i++){
                if (components[i].length >= 2){
                    for (var j = 1; j < components[i].length; j++) {
                        telephone1 = components[i][j].substr(10, components[i][j].length);
                        
                        if (isNaN(telephone1) || telephone1.length != 9) {
                            console.log("WARNING: New PUT to /groups/:idGroup with a component whose phone number is incorrect");
                            res.sendStatus(400);
                        si = 0;
                        }
                    }
                }
            }
            if (si == 1){ return 1; }
        }
    }
}


// PUT an existent group knowing the group id
app.put(baseURL + '/groups/:idGroup', function (req, res) { //NO TERMINADO
    db.find({}).toArray((err, groups) => { // Return an array which contains all groups
        if (groups.length >= 1) {
            var updateGroup = req.body; // Data updated by the user
            var idG = req.params.idGroup.toLowerCase();
            
            updateGroup.idGroup = updateGroup.idGroup.toLowerCase();
            
            db.find({"idGroup": idG}).toArray((err, group) => {
                var existingGroupWithId = group;
                
                if (existingGroupWithId.length >= 1) { // Group whose datas will be changed
                    if (updateGroup.idGroup.toLowerCase() == idG) { // The same ids
                        var iniciales = updateGroup.scientificTechnicalArea.substr(updateGroup.scientificTechnicalArea.length-3, 3).toLowerCase();
                        //var id = updateGroup.idGroup.toLowerCase();
                        var telephone = updateGroup.phone;
                        var components = updateGroup.components;
                        
                        if (validationUpdate(res, iniciales, telephone, components) == 1) {
                            if (updateGroup._id && ( typeof(updateGroup._id) === 'string')) // transformation of the _id
                                updateGroup._id = ObjectID.createFromHexString(updateGroup._id);
                            
                            db.updateOne({idGroup: idG}, updateGroup);
                            console.log("INFO: New PUT to /groups/idGroup successfully done");
                            res.send();
                        }
                    }
                    else{
                        console.log("WARNING: New PUT to /groups/:idGroup with a different group id inserted");
                        res.sendStatus(400);
                    }
                }
                else if (err) {
                    console.error('WARNING: Error updating data from the database');
                    res.sendStatus(500);
                }
                else{
                    console.log("WARNING: New PUT to /groups/:idGroup with a group id that does not exist. Modify the URL inserted");
                    res.sendStatus(400);
                }
            });
        }
        else if (err) {
            console.error('WARNING: Error updating data from the database');
            res.sendStatus(500);
        }
        else{
            console.log("WARNING: New PUT to /groups/:idGroup and no groups was found in the database");
            res.sendStatus(404);
        }
    });
})


// DELETE a group whose group id is known
app.delete(baseURL + '/groups/:idGroup', function (req, res) {
    db.find({}).toArray((err, groups) => { // Return an array which contains all contacts
        if (groups.length >= 1) {
            var id = req.params.idGroup.toLowerCase();
            
            var filteredGroup = groups.filter((g) => {
                return (g.idGroup == id);
            });
            
            if (filteredGroup.length == 1) {
                db.remove({"idGroup": id});
                console.log("INFO: The group whose group id was " + id + " has been deleted");
                res.send();
            }
            else{
                console.log("WARNING: New DELETE to /groups/:idGroup and there aren´t groups with the idGroup entered");
                res.sendStatus(404);
            }
        }
        else if (err) {
            console.error('WARNING: Error deleting data from the database');
            res.sendStatus(500);
        }
        else{
            console.log("WARNING: New DELETE to /groups/:idGroup and there aren´t groups in the database");
            res.send();
        }
    });
})


app.listen(process.env.PORT);