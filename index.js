const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');

const questions = [
    {
      type: 'input',
      message: 'Enter your project title: ',
      name: 'title',
    },
    {
      type: 'input',
      message: 'Enter your project description: ',
      name: 'description',
    },
    {
      type: 'input',
      message: 'Provide installation instructions: ',
      name: 'installation',
    },
    {
      type: 'input',
      message: 'Provide usage information: ',
      name: 'usage',
    },
    {
      type: 'input',
      message: 'Enter contributors: ',
      name: 'contributors',
    },
    {
      type: 'input',
      message: 'Enter test instructions: ',
      name: 'tests',
    },
    {
      type: 'checkbox',
      message: 'Please select a license: ',
      choices: [
        "Apache",
        "MIT"
      ],
      name: "license"
    },
    {
      type: 'input',
      message: 'What is your github username: ',
      name: 'username'
    },
    {
      type: 'input',
      message: 'What is your email address: ',
      name: 'email'
    },
    {
      type: 'input',
      message: 'What is your github repo: ',
      name: 'repo'
    }
  ];

  function init() {
    inquirer.prompt(questions).then(answers => {
      var filename = "README.md";
      axios
        .get("https://api.github.com/users/" + answers.username)
        .then(response => {
          var imageURL = response.data.avatar_url;
          answers.image = imageURL;
          writeToFile(filename, answers);
        });
    });
  };


  function writeToFile(filename, data) {
    fs.writeFile(filename, genMD(data), function(err) {
      if (err) {
        throw err;
      }
    });
  };


  function genMD(data) {
    return `
  # Project Title : ${data.title}
  
  ## Project Description:
  ${data.description}
  
  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributors](#contributors)
  * [Test](#test)
  * [License](#license)
  * [Author](#Author)
  * [Email](#Email)
  * [Badges](#badges)
  
  ## Installation
  ${data.installation}
  
  ## Usage
  ${data.usage}
  
  ## Contributing
  ${data.contributors}
  
  ## Test
  ${data.tests}
  
  ## License
  This application is covered by the ${data.license} license.

  
  ## Author 
  ${data.username}

  ## Author Avatar
  ![GitHub profile pic](${data.image})
  
  ## Email
  ${data.email}

  ## Badges
  
  ![Size](https://img.shields.io/github/repo-size/${data.username}/${data.repo})
  
  `;
  };

  init();

