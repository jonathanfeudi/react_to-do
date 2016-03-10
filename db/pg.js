var pg = require('pg');
var connectionString = "postgress://Feudimonster:"+process.env.DB_PASSWORD+"@localhost/todolist"

function addTask(req, res, next){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data:err});
    }
    var query = client.query("INSERT INTO tasks (task_name, task_desc) VALUES ($1, $2) RETURNING task_id;", [req.body.name, req.body.description],
  function(err, result){
    done()
    if(err){
      return console.error('error running query', err)
    }
    res.rows = result.rows;
    next()
    })
  })
};

function getTasks(req, res, next){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data:err});
    }
    var query = client.query("SELECT * FROM tasks",
  function(err, result){
    done()
    if(err){
      return console.error('error running query', err)
    }
    res.rows = result.rows;
    next()
  })
  })
};

function deleteTask(req, res, next){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success:false, data:err});
    }
    var id = req.params.taskID;
    var query = client.query("DELETE * FROM tasks WHERE task_id ="+id+";",
  function(err, result){
    done()
    if(err){
      return console.error('error running query', err)
    }
    next()
  })
  })
};

function modifyTask(req, res, next){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success:false, data:err});
    }
    var query = client.query("UPDATE tasks SET (completed) = NOT completed WHERE task_id =($1);", [req.params.taskID],
  function(err, result){
    done()
    if(err){
      return console.error('error running query', err)
    }
    next()
  })
  })
};

function updateTime(req, res, next){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success:false, data:err});
    }
    var query = client.query("UPDATE tasks SET (task_time_start, task_time_end) = ($1, $2) WHERE task_id = ($3);", [req.body.task_time_start, req.body.task_time_end, req.params.taskID],
  function(err, result){
    done()
    if(err){
      return console.error('error running query', err)
    }
    next()
  })
  })
};

module.exports.updateTime = updateTime;
module.exports.modifyTask = modifyTask;
module.exports.deleteTask = deleteTask;
module.exports.addTask = addTask;
module.exports.getTasks = getTasks;
