const express = require("express");
const Rule = require("../Models/rules");
const User = require("../Models/users.model");
const router = express.Router();

const {
    getRules,
    getRule,
    createRule,
    updateRule,
    deleteRule,
  } = require("../controllers/rule.controller");


router.get("/rules",getRules);


router.get("/rules/:ruleId",getRule);


router.post("/createRule",createRule);


router.put("/updateRule/:ruleId",updateRule);


router.delete("/deleteRule/:ruleId",deleteRule);


  module.exports = router;