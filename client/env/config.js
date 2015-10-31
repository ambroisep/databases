// YOU DO NOT NEED TO EDIT this code.
//
// All this is doing is inserting the parse API keys into every $.ajax
// request that you make so you don't have to.
if (!(window.username)) {
// if (!/(&|\?)username=/.test(window.location.search)) {
  var newSearch = window.location.search;
  console.log("---------------")
  if (newSearch !== '' & newSearch !== '?') {
    newSearch += '&';
  }
  var username = (prompt('What is your name?') || 'anonymous');
  var password = (prompt('Enter your password') || '');
  // newSearch += 'username=' + username
  // newSearch += '&password=' +  password//setting location would reload page and cause the regex to only match one of the cases...
  window.username = username;
  window.password = password;
  // window.location.search = newSearch;
}



// Put your parse application keys here!
$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "PARSE_APP_ID");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "PARSE_API_KEY");
});