const path = require('path')
const fs = require('fs')


function joinEveryKStrings(arr, k) {
    // Initialize an array to hold the resulting joined strings
    const result = [];
    
    // Loop through the array in steps of k
    for (let i = 0; i < arr.length; i += k) {
      // Get the slice of k strings from the array
      const slice = arr.slice(i, i + k);
      
      // Join the slice into a single string
      const joinedString = slice.join('\n');
      
      // Add the joined string to the result array
      result.push(joinedString);
    }
    
    // Return the resulting array
    return result;
  }

function parseTestCases(input) {
    // Split the input string by newlines to get each line separately
    let lines = input.split('\r\n');
    lines.shift()

    const numTestCases = parseInt(lines[0], 10);
    const lines_per_testcase = lines.length / numTestCases

    
    return joinEveryKStrings(lines , lines_per_testcase)
  }

function judgeOutput(correct, incorrect , input) {

    correct = CorrectOutput.split('\r\n');
    incorrect = incorrectOutput.split('\r\n');
    input = parseTestCases(input)

    if (correct.length !== incorrect.length) {
        return {
            correctFormat : false,
            judgement : `Incorrect output length`,
            passed : 0,
        }; // The first difference is at the end of the shorter array
    }

    // Iterate through both arrays up to the length of the shorter one
    let i = 0
    for (i = 0; i < correct.length; i++) {
        if (correct[i] !== incorrect[i]) {
            return {
                correctFormat : true,
                passed: i,
                correct: correct[i],
                userOutput: incorrect[i],
                judgement : `Incorrect output at test case : ${i+1}`,
                testCase : input[i]

            }; // Return the index of the first differing element
        }
    }
    // If no difference is found and the arrays are of the same length, return -1
    return -1;
}


const CorrectOutput = fs.readFileSync('../testcases/output.txt', { encoding: 'utf8', flag: 'r' });
const inputString = fs.readFileSync('../testcases/input.txt', { encoding: 'utf8', flag: 'r' });
const incorrectOutput = fs.readFileSync('../testcases/incorrectOutput.txt', { encoding: 'utf8', flag: 'r' });


console.log(judgeOutput(correct, incorrect , inputString));



