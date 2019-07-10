//Importing the libraries
var https = require("https");
var mysql = require('mysql');
var moment = require('moment');

//Creating MySQL connection
var con = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: "q1w2e3r4",
  database: "freshdb"
});

var body = "";

//options for fetching from the freshdesk api
var options = {
   host: 'innovitihelp.freshdesk.com',
   port: 443,
  
   path: '/api/v2/tickets?per_page=100',
   // authentication headers
   headers: {

        'Authorization': 'Basic cmFtYW5hLmFtcnV0aGFAaW5ub3ZpdGkuY29tOnRlc3RAMTIz',
         'Accept': 'application/json',
         'Content-Type': 'application/json'

   }
};

var d = new Date();
d.setDate(d.getDate()-360);
console.log("a"+d.toISOString());
d=d.toISOString();

//this is the call
for(var j=1;j<11;j++){
  options.path="/api/v2/tickets?per_page=100&updated_since="+d+"&page="+j;
  // &updated_since='+d+'&page='+j;
  request = https.get(options, function(res){
     var body = "";
     res.on('data', function(data) {
        body += data;
     });
     res.on('end', function() {
      //here we have the full response, html or json object
      // console.log(body);
      body = JSON.parse(body);
      var j=body.length;

      for(var i=0;i<j-1;i++){
       var due_by = body[i].due_by;
        due_by = due_by.replace(/T/g, " ");
        due_by = due_by.replace(/Z/g, "");

        var fr_due_by = body[i].fr_due_by;
        fr_due_by = fr_due_by.replace(/T/g, " ");
        fr_due_by = fr_due_by.replace(/Z/g, "");

        var created_at = body[i].created_at;
        created_at = created_at.replace(/T/g, " ");
        created_at = created_at.replace(/Z/g, "");

        var created_at_date = new Date(created_at).toLocaleString("en-US");
        created_at_date = moment(created_at_date).format("YYYY-MM-DD HH:mm:ss");

        var updated_at = body[i].updated_at;
        updated_at = updated_at.replace(/T/g, " ");
        updated_at = updated_at.replace(/Z/g, "");

          // var created_on = new Date().toISOString("en-US", {timeZone: "Asia/Kolkata"}).slice(0, 19).replace('T', ' ');

          var status = body[i].status;
          var isResolved=0;
          var isExists=0;
        // console.log(sql3);
          
          var sql="";

            sql = "INSERT INTO ticket_log4(ticket_id,responder_id,requester_id,group_id,priority,source,status,due_by,fr_due_by,created_at,updated_at,resolved_time,due_time_duration_hours)"+
                          " VALUES ("+body[i].id+","
                          +body[i].responder_id+","
                          +body[i].requester_id+","
                          +body[i].group_id+","
                          +body[i].priority+","
                          +body[i].source+","
                          +body[i].status+","
                          +"'"+due_by+"'"+","
                          +"'"+fr_due_by+"'"+","
                          +"'"+created_at_date+"',"
                          +"'"+updated_at+"',"
                            +"'"+updated_at+"',"
                          +"TIME_TO_SEC(TIMEDIFF('"+due_by+"','"+created_at+"'))/3600)";
              sql += " ON DUPLICATE KEY UPDATE "
                              +"ticket_id="+body[i].id+","
                            +"responder_id="+body[i].responder_id+","
                            +"requester_id="+body[i].requester_id+","
                            +"group_id="+body[i].group_id+","
                            +"priority="+body[i].priority+","
                            +"source="+body[i].source+","
                            +"status="+body[i].status+","
                            +"due_by="+"'"+due_by+"'"+","
                            +"fr_due_by="+"'"+fr_due_by+"'"+","
                            +"created_at="+"'"+created_at_date+"',"
                            +"updated_at="+"'"+updated_at+"',"
                            +"due_time_duration_hours="+"TIME_TO_SEC(TIMEDIFF('"+due_by+"','"+created_at+"'))/3600";
          


       // console.log(((body.results)[0]).id);

       con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("1 record inserted");
                          });
      }
       });
  res.on('error', function(e) {
     console.log("Got error: " + e.message);
  });
});
}
