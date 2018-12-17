var cookieCountert = function () {
  //subfuncion of GetCookie that gets an offset value and return the value of the arguments of the cookie that is the same number as the offset
  function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
      endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
  }

  //function that reads the cookie and returns the requested atribute
  function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    //A loop that checks all substring of the cookies until it finds the substring that has the same atribute as is requested
    var i = 0;
    while (i < clen) {
      var j = i + alen;
      if (document.cookie.substring(i, j) == arg)
        return getCookieVal(j);
      i = document.cookie.indexOf(" ", i) + 1;
      if (i == 0)
        break;
    }
    return null;
  }

  //function that set the cookie
  function SetCookie(name, value) {
    document.cookie = name + "=" + escape(value)
  }

  //this function displayes how manny times you visited the site on screen
  function showNumberVisits() {
    var visit;
    if (!(visit = GetCookie("visit"))) { visit = 0; } //if you visit the site for the first time sets visit to 0, else it set it to the value of visit of the cookie
    visit++;   //increment the number of visits for both the showing and the next cookie                                  
    SetCookie("visit", visit); //replace the old cookie with new one that has the accuret data of how many times you visited the site 
    window.alert("\n" + "Your browser has visited this page " + visit + " time(s).");
  }
  showNumberVisits();

};
$(document).ready(cookieCountert);