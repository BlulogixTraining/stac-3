const mongoose = require('mongoose');
const Rule = require('../Models/rules');
require('dotenv').config();

const rules = [
  {
    ruleId: 'rule123',
    ruleName: 'Sample Rule',
    ruleCondition: 'If X happens, do Y',
    status: 'active',
    userId: [] // Add user IDs when available
  },
  {
    ruleId: 'rule124',
    ruleName: 'Another Rule',
    ruleCondition: 'If A happens, do B',
    status: 'inactive',
    userId: [] // Add user IDs when available
  }
];

async function seedRules() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Rule.insertMany(rules);
    console.log('Rules seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding rules:', error);
    process.exit(1);
  }
}

seedRules();
