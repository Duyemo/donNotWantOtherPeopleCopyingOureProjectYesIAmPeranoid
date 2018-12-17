var test=0;
//slightly added version of the cookie

        //subfuncion of GetCookie that gets an offset value and return the value of the arguments of the cookie that is the same number as the offset
        function getCookieVal (offset) {
          var endstr = document.cookie.indexOf (";", offset);
          if (endstr == -1)
          endstr = document.cookie.length;
          return unescape(document.cookie.substring(offset, endstr));
          }
      
          //function that reads the cookie and returns the requested atribute
          function GetCookie (name) {
          var arg = name + "=";
          var alen = arg.length;
          var clen = document.cookie.length;
          //A loop that checks all substring of the cookies until it finds the substring that has the same atribute as is requested
          var i = 0;
          while (i < clen) {  
          var j = i + alen;
          if (document.cookie.substring(i, j) == arg)  
          return getCookieVal (j);
          i = document.cookie.indexOf(" ", i) + 1;
          if (i == 0) 
          break; 
          }
          return null;
          }

          function showNumberVisits() {
            var visit;
            if(!(visit = GetCookie("visit"))){ visit = 0;} //if you visit the site for the first time sets visit to 0, else it set it to the value of visit of the cookie
            visit++;   //increment the number of visits for both the showing and the next cookie 
            test= visit;
    }
    showNumberVisits();
  
   


var loadStats = function(){

    document.getElementById("gamesOnline").innerHTML =  Math.floor(test/2);
    document.getElementById("playersOnline").innerHTML = test;
    document.getElementById("gamesPlayed").innerHTML = Math.floor(test/3);


};
$(document).ready(loadStats);