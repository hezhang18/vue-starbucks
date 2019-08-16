# vue-starbucks

Reconstruction of Starbucks Project with Vue.js 

## Document Introduction

> The folder named MongoData holds the data of users, products and store information needed by this website. Server folder holds back-end interface files. And the other folder and files are for the front-end.

## Local Deployment

> First, node development environment and node package manager (npm) need to be installed locally. For a better experience, Taobao mirror cnpm can be used instead of npm.

> To deploy this website locally, you also need to deploy the MongoDB database in advance and create a database named vStarbucks, and then import the collections in MongoData into this database.

> Next, you can browse the contents of this website locally by executing a few simple lines of commands.

``` bash
# start database

# unauthorized mode
sudo mongod

# authorized mode (recommend)
sudo mongod --auth

# notes: if you start the database using authorization mode, we need change the 'password' in linkedDB.js (mongodb://Jeff:password@127.0.0.1:27017/vStarbucks) to the password corresponding to the local database.

```

``` bash
# start back-end server

# enter the server folder and install dependencies
npm install

# start server
node bin/www

```

``` bash
# start project at localhost:8080

# enter the project folder and install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```

If you want to preview this website online, you can visit [my personal website](http://www.hppzhang.com).
