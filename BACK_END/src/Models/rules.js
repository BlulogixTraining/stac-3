const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
  ruleId: {
     type: String,
     required: true,
     unique: true 
  },

  ruleName: {
     type: String, 
     required: true 
  },

  ruleDescription: { 
    type: String,
    default: "No description"
  },

  ruleCondition: { 
    type: String, 
    required: true 
  },

  userId: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Users' 
  }],


  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'active' 
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  },

  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
  
});



const Rule = mongoose.model('Rule', ruleSchema);

module.exports = Rule;