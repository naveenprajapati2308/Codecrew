const path = require("path");
const { spawn } = require("child_process");
const ExpressError = require('./ExpressError')

//path of directory where codes , output is present
const dirCodes = path.join(__dirname, "..", "codes");


const executePython = (filePath, input) => {
    // console.log("Execute python begin");
    const filename = path.basename(filePath);
    // console.log(filename);

    return new Promise((resolve, reject) => {
        const program = spawn(`python`, [filename], { cwd: dirCodes })

        let output = '';
        let error = '';

        // Write input to the program
        program.stdin.write(input);
        program.stdin.end();

        program.stdout.on('data', (data) => {
            output += data.toString();
        });

        program.stderr.on('data', (data) => {
            error += data.toString();
        });

        program.on('error', (err) => {
            // reject(err);
            console.log(err);
            reject(new ExpressError(400, err.message, "execution failure"))
        });

        program.on('close', (code) => {
            if (code !== 0) {
                // reject(new Error(`Process exited with code ${code}. Error: ${error}`));
                reject(new ExpressError(400, `Process exited with code ${code}. Error: ${error}`, "execution failure"))
            } else {
                resolve(output);
            }
        });
    })
}

module.exports = {
    executePython,
}