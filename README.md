
Fanmade website to track progression on tauri.

https://tauriprogress.github.io/

To run locally:
  1. install [node](https://nodejs.org/)
  2. install [git](https://git-scm.com/downloads)
  3. run: npm install -g create-react-app
  4. run: create-react-app client // this is going to create a folder called client from where you run the script
  5. run: git clone https://github.com/tauriprogress/tauriprogress.github.io.git
  6. run: npm install
  7. setup: the [server](https://github.com/tauriprogress/server)
  8. since the app uses a git repo which is installed as a package to get the url of the server to make requests to it, in order to run this app locally you need to change the server url variable to http://localhost:3001 in node_modules. node_modules\tauriprogress-constants\urls.json
 9. run: npm start
