# Automated Unit Testing and CI Pipeline
This repository contains the implementation of an automated Continuous Integration (CI) pipeline for a JavaScript library. The project focuses on unit testing, coverage reporting, and workflow automation using GitHub Actions.

[![Coverage Status](https://coveralls.io/repos/github/eerolainepaa/CI-CD/badge.png?branch=main)](https://coveralls.io/github/eerolainepaa/CI-CD?branch=main)

## Project Overview
The goal of this project was to implement a robust testing environment for a provided JavaScript library, ensuring at least 60% test coverage (excluding internal utilities) and automating the validation process.

### Tech Stack
- **Runtime:** Node.js
- **Testing Framework:** Mocha and chai
- **Code Coverage:** c8
- **CI Platform:** GitHub Actions
- **Coverage:** Coveralls

### Key Features
- **Automated Pipeline:** Every push triggers a GitHub Actions workflow that install dependencies, executes the test suite, and transmits coverage data to Coveralls.
- **High Test Coverage:** Achieved 99.18% line coverage and 92.98% branch coverage across the library (excluding /.internal)
- **Debugging:** Identified and fixed critical bugs in core functions.
- **Documentation:** More extensive analysis of the bugs and testing methodology can be found in the [report.]((https://github.com/username/repo/blob/main/docs/Ex8%20Report.pdf))
