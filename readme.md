backend => node, express, sequelize
frontend => angular, scss
bdd => mysql


in your shell:

install git, node & mysql : $sudo apt install git npm mysql-server;
clone groupomania repository : $git clone https://github.com/Dreamswitch/groupomania.git;

go into groupomania folder,
install database : $sudo mysql < dataBase/groupomaniaDB.sql;

go into ./backend folder,
install backend dependencies : $npm install;
launch backend server : $npm start;

go into ./frontend/groupomania folder,
install frontend dependencies : $npm install;
launch frontend server : $npm start;

now , a window should be automatiquely opened in your navigator at "localhost:4200"

Enjoy ;)