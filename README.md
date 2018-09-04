# Material CRUD with MongoDB Database
+ Auto generate required admin web pages for your MongoDB database.
+ Integrated with file-upload module
+ Authentication out of the box (local,facebook,twitter,google)

## Getting Started

### Prerequisites

- [Node.js](nodejs.org) ^8.x
- [Gulp](https://gulpjs.com/) (`npm i --g gulp-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm i -g windows-build-tools` to install build tools [Only for Windows]

2. Run `npm i` to install project dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for generating the production version files and copy content of dist directory to production server