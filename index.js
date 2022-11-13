//Packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

const generateReadme = 
({
    title, 
    description, 
    installation, 
    usage, 
    contribution, 
    test,
    license,
    github,
    email, 
    }, licenseBadge) =>

`# ${title} 
${licenseBadge}
    
## Description

${description}

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Credits](#credits)
4. [Test](#test)
5. [License](#license)
6. [Contact Information](#contact)
    
## Installation <a name="installation"></a>

${installation}

## Usage <a name="usage"></a>

${usage}

## Credits <a name="credits"></a>

${contribution}

## Test <a name="test"></a>

${test}

## License <a name="license"></a>

${license}

## Contact info: <a name="contact"></a>
[Github](https://github.com/${github}?tab=repositories)
Email: ${email}`;

//Create an array of questions for user input
inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the project title?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description:',
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Enter installation instructions:',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Enter usage information:',
        },
        {
            type: 'input',
            name: 'contribution',
            message: 'Enter contribution information:',
        },
        {
            type: 'input',
            name: 'test',
            message: 'Enter test instructions:',
        },
        {
            type: 'list',
            message: 'Choose a license for your application:',
            name: 'license',
            choices: ['Apache', 'MIT', 'GPL'],
          },
          {
            type: 'input',
            name: 'github',
            message: 'Enter your Github username:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address',
        },
    ])

    .then((answers) => {

        //licenses section
        const licenseMIT = 
        `The MIT License (MIT) Copyright © 2022 ${answers.github}

        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;

        const licenseGPL = 
        `${answers.title}
        Copyright (C) 2022 

        This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version.

        This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU General Public License for more details.

        You should have received a copy of the GNU General Public License
        along with this program.  If not, see <http://www.gnu.org/licenses/>.`;

        const licenseApache = 
        `Copyright 2022 ${answers.github}

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.`;

        //set badge title
        let licenseBadge = "";
        if(answers.license === 'Apache'){
            licenseBadge = "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
        }
        if(answers.license === 'MIT'){
            licenseBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
        }if(answers.license === 'GPL'){
            licenseBadge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
        }

        // set content for the license section
        if(answers.license === 'Apache'){
            answers.license = licenseApache;
        }
        if(answers.license === 'MIT'){
            answers.license = licenseMIT;
        }
        if(answers.license === 'GPL'){
            answers.license = licenseGPL;
        }
        const readmeContent = generateReadme(answers, licenseBadge);
    
        fs.writeFile('generated-readme.md', readmeContent, (err) =>
          err ? console.log(err) : console.log('Successfully created README')
        );
      });

/*

    WHEN I choose a license for my application from a list of options
        THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
    
    WHEN I enter my email address

*/

// TODO: Create a function to write README file
//function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
//function init() {}

// Function call to initialize app
//init();
