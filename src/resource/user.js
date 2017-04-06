module.exports = {
  create: create,
  update: update,
  read: read
}

var json = require('form-json');

function create(req, res){
    json(req, res, db){
      var user = req.body;
      var salt = encryption.salt();
      var cryptedPassword = encryption.digest(user.password + salt);
      db.run('INSERT INTO users (eid, email, firstname, lastname, cryptPassword) VALUES (?,?,?,?,?)', [
        user.eid,
        user.email,
        user.firstname,
        user.lastname,
        user.cryptPassword

      ], function(err){
        if(err){return;}
        res.statusCode(200);
        res.end("User Created")

      })
    }
}

function read(req, res, db){
  var id = req.params.id;
  db.get('SELECT eid, email, firstname, lastname FROM user WHERE id=?', function(user){
    res.setHeader("Content-Type, text/json");
    res.end(JSON.stringify(user));

  });
}
