const fs = require("fs");
const path = require("path");
const { exec, spawn } = require("child_process");
const ExpressError = require('./ExpressError');




//path of directory where codes , output is present
const dirCodes = path.join(__dirname, "..", "codes");
const dirOutput = path.join(__dirname, "..", "outputs");


function replaceWordInFile(filePath, targetWord, newWord) {
    console.log("called");
    fs.readFileSync(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // const replacedContent = data.replace(targetWord, newWord);
        const replacedContent = data.replace(new RegExp('\\b' + targetWord + '\\b', 'g'), newWord);

        fs.writeFileSync(filePath, replacedContent, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }

            console.log(`Successfully replaced '${targetWord}' with '${newWord}' in the file.`);
        });
    });
}

function generateRandomString(length = 15) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}



function renameFile(oldPath, newPath) {
    fs.renameSync(oldPath, newPath, (err) => {
        if (err) {
            console.error('Error renaming file:', err);
            return;
        }
        console.log('File renamed successfully.');
    });
}





const compileJava = (filepath) => {

    //complete file name along with extension
    const oldFirstName = path.basename(filepath).split('.')[0]

    const newFirstName = generateRandomString()
    const newFileName = newFirstName + ".java"
    // console.log(newFileName);
    const newFilePath = path.join(dirCodes, newFileName)

    return new Promise((resolve, reject) => {


        try {
            renameFile(filepath, newFilePath);

            // replaceWordInFile(filepath , "Main" , newFirstName)
            let data = fs.readFileSync(newFilePath, 'utf-8')
            
            if(!JSON.stringify(data).includes("Main")){
                reject(new ExpressError(400 , "Main class not found" , "compilation error"))
            }

            data = data.replace('Main', newFirstName)//Change class name
            fs.writeFileSync(newFilePath, data, 'utf-8')
            
        } catch (error) {
            reject(new ExpressError(500 , "Java file processing failed" , "compilation error"))
        }
        exec(`javac -d "${dirOutput}" "${newFilePath}"`, (error, stdout, stderr) => {
            // exec(`javac -d ${dirOutput} ${filepath}` , (error , stdout , stderr)=>{//Linux
            if (error || stderr) {
                reject(new ExpressError(404, stderr, "compilation error"))
            }
            else {
                resolve(newFileName)
            }
        })
    })
}

const executeJava = (fileName, input) => {

    const firstName = fileName.split('.')[0]

    return new Promise((resolve, reject) => {
        const program = spawn(`java`, [firstName], { cwd: dirOutput });
        // const program = spawn(`./${jobId}.out`, {cwd : dirOutput});

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
            reject(new ExpressError(404, err.message, "execution failure"))
        });

        program.on('close', (code) => {
            if (code !== 0) {
                // reject(new Error(`Process exited with code ${code}. Error: ${error}`));
                reject(new ExpressError(400, `Process exited with code ${code}. Error: ${error}`, "execution failure"))
            } else {
                resolve(output);
            }
        });
    });
}


module.exports = {
    compileJava,
    executeJava,
}