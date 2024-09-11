const Rule = require("../Models/rules");
const User = require("../Models/users.model");

const getRules = async (req, res) => {
    try {
        const rules = await Rule.find();
        res.status(200).json(rules);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rules', error });
    }
};

const getRule = async(req,res)=> {
    try {
        const rule = await Rule.findById(req.params.ruleId);
        
        if (!rule) {
            return res.status(404).json({ message: 'Rule not found' });
        }
        
        res.status(200).json(rule);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rule', error });
    }
};

const createRule = async(req,res)=>{
    try{
        const {ruleId, ruleName, ruleCondition,ruleDescription,userId} = req.body;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newRule = new Rule({
            ruleId: ruleId,
            ruleName: ruleName,
            ruleCondition: ruleCondition,
            ruleDescription: ruleDescription,
            userId: userId
        });

          await newRule.save();
          res.status(201).json({ message: 'Rule Created Successfully'});
    } catch (error)
       {
          res.status(500).json({ message: error }); 
       }
};

const updateRule = async(req,res)=>{
    try{
        const {ruleName, ruleCondition,ruleDescription,userId} = req.body;

        const updatedRule = await Rule.findByIdAndUpdate(
            req.params.ruleId,
            {
                ruleName,
                ruleCondition,
                ruleDescription,
                userId,
                updated_at: Date.now(),
            },
            { new: true } 
          );

          if (!updatedRule) {
            return res.status(404).json({ message: 'Rule not found' });
          }

          res.status(200).json({ message: 'Rule Updated Successfully'});

    }catch (error) {
       res.status(500).json({ message: error }); 
    }
};


const deleteRule = async(req,res)=>{
    try {
        const deletedRule = await Rule.findByIdAndDelete(req.params.ruleId);
    
        if (!deletedRule) {
          return res.status(404).json({ message: 'Rule not found' });
        }
    
        res.status(200).json({ message: 'Rule deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting rule', error });
      }
};




module.exports = {
    getRules,
    getRule,
    createRule,
    updateRule,
    deleteRule,
  };
  