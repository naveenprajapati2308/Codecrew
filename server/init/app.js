const mongoose = require('mongoose')
const Problem = require('../models/problem')

require('dotenv').config({ path: '../.env' })

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://farazgod1234:1fUprHTFVpfLE9EO@cluster0.icefmrm.mongodb.net/judge");
  console.log("database connected");
}


async function create() {
    await Problem.create({
        name : "Linear Search",
        intro : "Ez Quesion",
        description : "Sai sawal he",
        runCases : "5\n10 20 30 40",
        runOutput : "1 2 3 4 4",
        input : "5\n10 20 30 40",
        output : "5\n10 20 30 40",
    })
}

create()