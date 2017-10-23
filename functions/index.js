process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

// a. the action name from the list_chords Dialogflow intent
const CHORD_NAMES_ACTION = 'list_chords';
// b. the parameters that are parsed from the list_chords intent 
const TITLE_ARGUMENT = 'title';
const ARTIST_ARGUMENT = 'artist';


exports.chordMe = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));


// c. The function that generates the chord list
  function listChords (app) {
    let title = app.getArgument(TITLE_ARGUMENT);
    let artist = app.getArgument(ARTIST_ARGUMENT);
    app.tell('Here are the chords in ' + title + ' by ' + artist + '. Happy playing!');
  }
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(CHORD_NAMES_ACTION, listChords);


app.handleRequest(actionMap);
});
