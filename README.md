# Assignments 

##Notes API
The application is developed to get data from json using GET,POST,PUT,DELETE actions using the Notes API.

##Setup
Download/clone the project from the repo.

##Structure
# /api - This folder has routes file wherein all the routes has been defined.
# /data - This folder has NotesData.json file which is the main input source of api.
# /services - This folder has controller.js file which has the logic for api functioning.

##Usage
1.Open command prompt (Start -> Run -> cmd)
2.Naviagte to the path where project has been downloaded.(cd <FILEPATH>)
3.Execute command npm run start
4.The message stating --> "Notes Server listening at http://localhost:8080" will display on the screen.
5. Open http://localhost:8080 in the browser to verify it.

##API
1. Get All Notes - http://localhost:8080/
2. Get Specific Note - http://localhost:8080/<id>
3. Add New Note - http://localhost:8080/ (Body will have the parameters like Notes_Type and Notes_Data)
4. Edit Note - http://localhost:8080/<id> (Body will have the values to be updated)
5. Delete Note - http://localhost:8080/<id>

##API Execution
Api can be tested on Postman.
