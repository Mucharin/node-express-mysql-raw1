const sql = require("./db.js");

const Tutorial = function(tutorial){
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
};

Tutorial.create = (newTutorial, result) => {
    sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res)=>{
        if(err){
            result(err, null);
            return;
        }

        result(null, {id: res.insertId, ...newTutorial});
    });
};

Tutorial.getAll = (title, result) => {
    let sqltext = "SELECT * FROM tutorials";

    sql.query(sqltext, (err, res) => {
        if(err){
            console.log("error: ", err)
            result(null, err);
            return;
        }

        console.log("tutorials: ", res);
        result(null, res);
    });
};

Tutorial.findById = (id, result) => {
    sql.query("SELECT * FROM tutorials WHERE id = " + id, (err, res) => {
        if(err){
            result(err, null);
            return;
        }

        if(res.length){
            result(null, res[0]);
            return;
        }
        result({kind: "not_found"}, null);
    });
};

Tutorial.getAllPublished = (result) => {
    sql.query("SELECT * FROM tutorials WHERE published = true",(err,res) =>{
        if(err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
}
module.exports = Tutorial;

Tutorial.remove = (id, result) => {
    sql.query("DELETE FROM tutorials WHERE id = ?",id, (err,res)=>{
        if(err){
            result(null, err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not frond"}, null);
            return;
        }

        result(null, res);
    });
};