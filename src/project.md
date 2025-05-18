# Codevista
- creating two screen 
- (i) For Home screen
- (ii) For Playground/ compile the code screen

## For navigate to different pages we need to install extension
- npm install react-router-dom

## Creating two folders inside the src <br/>
<ol>
   <li> HomeScreen </li>
   <li> PlaygroundScreen </li>

## We Use the scss for our project 
- Why we use Scss?
- Because inside the css if we give same class name to our componant(inside js) then style will be also apply to another component so we use scss simillar to scss
## We install sass for scss (also called sass)
- npm i sass
## Add the color picker chrome extension for check any website color which color is used 

## Creating Right part of the screen to add new folders and create the langauge wise files in screen 

## Take all the icons from (https://react-icons.github.io/react-icons/search/#q=)

### Note : 
- Screen 1 & Screen 2 sharing the state  so the changes is reflected 
- Inside the Screen 1 there are two part right & left If i click on the create playground button then create new folder inside the right side so share the state 
- same way Screen 2 if i update the file name it is reflected to first screen  so share same state  

- We are use the use context Hook
###  To solve the problem of avoid prop drilling 
-[useContext](https://www.w3schools.com/react/react_usecontext.asp)

- We can create the playgroundfolder inside that we create jsx file  to provide the data 

### Install uuid 
- npm i uuid
-A UUID (Universally Unique Identifier) is used to generate a unique ID that is highly unlikely to be duplicated.
- v4 () for unique id

### Optional chaining (?.)
- The optional chaining (?.) operator accesses an object's property or calls a function. If the object accessed or function called using this operator is undefined or null, the expression short circuits and evaluates to undefined instead of throwing an error.

### Add Features 
- If user click on create playground button then on right side new folder with file name and langauge it should be created .
#### For Validation 
<ol>
   <li> Not empty folder is created </li>
   <li> Language  must be specified like if user choose java then langage: java</li>
   <li> Localstorage should update </li>
   <li> If user load/ refresh the page then data is there </li>
<ol> 

### useEffect && Usestate 
- Without useState, UI wouldn’t update when you add a new playground.
- Without useEffect, localStorage wouldn’t be initialized properly.

<hr>

## New Folder in right side

- Now Adding click event on new folder button in right side 

<hr>

## Delete Folder functionality
- Delete folder using by that id 
- Also delete from local storage as well

