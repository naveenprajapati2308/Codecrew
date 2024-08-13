const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { exec, spawn } = require("child_process");
const ExpressError = require('./ExpressError')

//path of directory where codes , output is present
const dirCodes = path.join(__dirname, "..", "codes");
const dirOutput = path.join(__dirname, "..", "outputs");

const extension = {
  "cpp": "cpp",
  "python": "py",
  "c": "cpp",
  "java": "java",
}
const OutputExtension = {
  "cpp": "out",
  "python": "py",
  "c": "out",
  "java": "class",
}

//make directory if not there
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}
if (!fs.existsSync(dirOutput)) {
  fs.mkdirSync(dirOutput, { recursive: true });
}


//generates files, writes content, return path
const generateFile = async (content, format) => {

  if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
  }
  if (!fs.existsSync(dirOutput)) {
    fs.mkdirSync(dirOutput, { recursive: true });
  }
  

  const jobId = uuid();
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCodes, filename);
  fs.writeFileSync(filepath, content);
  return filepath;
};



function compileCpp(filepath) {

  const jobId = path.basename(filepath).split(".")[0];
  // let outPath = path.join(dirOutput, `${jobId}.exe`);
  let outPath = path.join(dirOutput, `${jobId}.out`);//In linux

  //remove in linux
  // filepath = JSON.stringify(filepath)
  // outPath = JSON.stringify(outPath)

  return new Promise((resolve, reject) => {
    // exec(`g++ ${filepath} -o ${outPath}`, (error, stdout, stderr) => {
    exec(`g++ "${filepath}" -o "${outPath}"`, (error, stdout, stderr) => {
      if (error) {
        // reject({ error, stderr });
        reject(new ExpressError(400 , stderr , "compilation error"))
      } else {
        resolve(jobId);
      }
    });
  });
}

function executeCpp(jobId, input , timeout=10000) {

  console.log(jobId);

  return new Promise((resolve, reject) => {
    // const program = spawn(`${jobId}.exe`, {cwd : dirOutput});
    const program = spawn(`./${jobId}.out`, {cwd : dirOutput});

    let output = '';
    let error = '';

    // Write input to the program
    program.stdin.write(input);
    program.stdin.end();

    // Set a timeout to terminate the process if it hangs
    const timer = setTimeout(() => {
      program.kill();
      reject(new ExpressError(408, 'Process timed out\nCode ran for too long\nPossible that your program expects input but you didn\'t give any. ', 'execution failure'));
    }, timeout);

    program.stdout.on('data', (data) => {
      output += data.toString();
    });

    program.stderr.on('data', (data) => {
      error += data.toString();
    });

    program.on('error', (err) => {
      // reject(err);
      clearTimeout(timer)
      reject(new ExpressError(404 , err.message , "execution failure"))
    });

    program.on('close', (code) => {
      clearTimeout(timer)
      if (code !== 0) {
        // reject(new Error(`Process exited with code ${code}. Error: ${error}`));
        reject(new ExpressError(400 , `Process exited with code ${code}. Error: ${error}` , "execution failure"))
      } else {
        resolve(output);
      }
    });
  });
}

module.exports = {
  generateFile,
  extension,
  OutputExtension,
  compileCpp,
  executeCpp,
};