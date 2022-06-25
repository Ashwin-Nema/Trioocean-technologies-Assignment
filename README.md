# Trioocean-technologies-Assignment
A simple to-do list using angular with NodeJs backend and PostgreSQL

Instructions:<br/><br/>
Ensure that you are in the folder containing this readme.md file and also your internet connection is on while loading this assignment because I have used bootstrap CDN that requires internet connection to load.
<br/><br/>
1. Open two separate terminals and go to the backend folder using both terminals </br>

```
cd .\backend\ 
```
2.  Install all the node_modules in one of the two terminals using command </br>
```
npm i
```

3.After install node_modules please create a .env file in the backend folder with following variables: </br>

POSTGRESS_USER -  Postgress SQL Username </br>
POSTGRESS_HOST - Postgress SQL Host </br>
POSTGRESS_DATABASE - Postgress SQL Database </br>
POSTGRESS_PASSWORD - Postgress SQL Password </br>
POSTGRESS_PORT - Postgress SQL Port

4.Now in one terminal we start watching our files and in another terminal we start our main backend server.
Hence in one terminal type:</br>
```
tsc -w
```

and in another terminal type<br> </br>
```
npm run start
```

3.In the backend folder, go to app.ts file </br> backend > src > app.ts </br>
 Please uncomment code starting from line number 18 to line number 34 and save the file. Check in the terminal while we started the server  (i.e. npm start command). There will be message -</br> 
"To do list table created successfully"
</br>
Now recomment the same lines.

4.Now in our root folder where we have this readme.md file open another terminal and type:
</br>
```
cd .\frontend\
```
5. Now in this terminal install all the node_modules with this command. </br>
```
npm i
```

and after node_modules are installed start the server with this command </br>
```
ng serve
```

Now our server is running

Routes in the frontend - 

/ - Main Dashboard, Component - DashboardComponent </br>
task/:id - Accessing task by id, Component - TaskdetailsComponent </br>

addtodo- Adding new task, Component - AddToDoComponent </br>

Front End:</br>
Initially to do list is empty, new items can be added by clicking on Add New Task. Click there and add new task. Add all the necessary details and then click on Go To Dashboard. Now we have title and and a delete icon on the right end. Clicking on title will redirect towards the details of the task and clicking on the icon will delete the item. 

Back End:</br>
app.ts file </br>
backend -> src -> app.ts</br>
This file the entry point for the backend.
We have ListRouter which has all the CRUD operations for the list items.