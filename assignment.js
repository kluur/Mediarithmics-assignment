const http = require('http');
const rootURL = "http://infinite-castles.herokuapp.com";
var cnt = 0;
cb = function(url) {
    http.get(url, function(res) {
      var data = [];
      res.on('data', function(d) {
        data.push(d);
      }).on('end', function() {
        try {
            var rooms = JSON.parse(data).rooms;
            var chests = JSON.parse(data).chests;
            for(var i = 0; i < chests.length; i++){
                http.get(rootURL + chests[i], entry);
            }
            for(var j = 0; j < rooms.length; j++){
                cb(rootURL + rooms[j]);
            }
        } catch(e) {
            console.log(e);
        }
      });
    });
}
entry = function(res) {
    var data = [];
	res.on('data', function(stream) {
		data.push(stream);
	});
	res.on('end', function() {
        try {
            if(JSON.parse(data).status === "It looks like there is something here!"){
                console.log(JSON.parse(data).id);
                cnt++;
                console.log(cnt);
            }
        } catch(e) {
            console.log(e);
        }
	});
};
cb("http://infinite-castles.herokuapp.com/castles/1/rooms/entry");