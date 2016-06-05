#A ReactJs project template with webpack, babel and gulp

#Feature list
* Webpack based bundling process
* ES6 and JSX transcompiling with Babel
* Vanila hot module replacment with webpack dev server
* Gulp task for build
* Redux and redux-thunk based state managment
* Eslint with Airbnb style

#Run dev server

The dev server will automatically rebundle the source file and reload the test page if there is any change to source file
    npm run dev-server
When use dev server, yo don't need to run gulp build command at all

#To build for release
    gulp build
or
    gulp build:watch

#To lint
    npm run lint
