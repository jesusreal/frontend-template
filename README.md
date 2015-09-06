This application implements a template to start a web project without the need of doing all the set up.
 
Requirements:

	- Node.js should be installed in your machine

Instructions of use:
	
	1 - On command window go to project root folder and type "npm install". 
		This will install packages for node and bower components.

	2 - Development Server (option 1). On command window, go to project root folder and type "gulp". This will build the application (on "dist" folder) and start the server. Open your web browser and go to "http://localhost:8080/". By default the server executes the built code.

	3 - Development Server (option 2). On command window, go to project root folder and type "npm start". This will start the server. Open your web browser and go to "http://localhost:8000/".  
		Notes: 
			- If you use this option, you have to update the directory on .bowerrc file to "./app/bower_components".
			- By default the server executes the source code. If you want to build your project like for the first option, update the path in the "start" command of "package.json" accordingly and don't modify the .bowerrc file.
