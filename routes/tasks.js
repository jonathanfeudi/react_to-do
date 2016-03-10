const express     = require('express');
const tasks       = express.Router();
const db = require('../db/pg.js');

tasks.route('/')
  .get(db.getTasks, (req,res)=>{res.send(res.rows)})
  .post(db.addTask, (req,res)=>{res.send(res.rows)})

tasks.route('/:taskID/time')
  .put(db.updateTime, (req, res)=>{})

tasks.route('/:taskID')
  .put(db.modifyTask, (req,res)=>{} )
  .delete(db.deleteTask, (req,res)=>{})

module.exports = tasks;
