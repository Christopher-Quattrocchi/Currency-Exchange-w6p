# Currency Exchange Calculator

## Overview
The Currency Exchange Calculator is a web application that allows users to convert amounts between different currencies. Utilize this tool to see how much your money is worth in various global currencies.

### Created By
Christopher Quattrocchi

## Technologies Used
- JavaScript
- CSS
- HTML
- API Integration
- npm (Node Package Manager)
- ESLint (Linting)
- Git (Version Control)

## Live Demo
[Currency Exchange Live Demo](https://Christopher-Quattrocchi.github.io/Currency-Exchange/)
(Note: The gh-pages branch exists but may not provide the optimal experience for this project.)

## Description
This application harnesses the power of JavaScript, CSS, and HTML along with an external currency exchange API to provide real-time currency conversion rates.

## Setup/Installation Requirements
- Clone the project repository.
- Navigate to the project directory.
- Go to https://www.exchangerate-api.com/ and get an API key
- In the root of the project folder, create a file named .env, and enter the line "API_KEY=YOURKEYHERE"
- Run `npm install` to install dependencies.
- Execute `npm run start` to start the application.

## Known Bugs
- Error handling should cover most cases, contact me if you find something! (Chrisquattrocchi@gmail.com)

## License
MIT License

Copyright (c) 2023 Christopher Quattrocchi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.






-------------------------------------------------------------------------------------
Main objectives:

COMPLETE
Enter amount of USD, show conversion for at least five other currencies

MOSTLY COMPLETE
Error message for request status and for incorrect input

MOSTLY COMPLETE NEED TO BE MORE SPECIFIC
If currency doesn't exist, say so in error

Secondary objectives:

COMPLETE
Allow to convert between all currency types

COMPLETE
Allow to convert to and from US dollars

COMPLETE
*Cache api results so only one call is needed*

COMPLETE
Dropdown for currencies
