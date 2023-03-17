1.git clone or download and extract folder
2.download mongodb
3 create new database in mongodb
4 copy your mongodb url in admin model, tools model and user model in line 3 in every file
5 Create a folder name admins and Add Data  admins with username and password.example
{
  "username": "admin",
  "password": "cdti1234"
}
6 Create a folder name tools and Add Data tools with name,amout and photo URL.example
{
  "name": "soldering iron",
  "amount": 100,
  "photo_url": "https://cdn-icons-png.flaticon.com/512/3696/3696721.png"
}
7 Create a folder users tools and Add Data users with username,password,fname,lname and borrowed and set borrowed to an object.example

{
  "username": "6410301012",
  "password": "1234",
  "fname": "นรภัทร",
  "lname": "เสมา",
  "borrowed": {}
}

8.open command promt then go to "app" folder
9.run command "npm install" *that will install every thing you need*
10.running web by command "nodemon"

If you have any problems or questions, ask Norapat Saema by adding Line to ID 0875557011