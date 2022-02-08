Web UI Automation
========================

## Background

This test automation scripts covers five elements of [https://the-internet.herokuapp.com/](https://the-internet.herokuapp.com/)
- CheckBoxes
- Key Presses
- Inputs
- Add/Remove Elements
- File Downlaod

## Prequisites

- You'll need **Node.JS** + **NPM** installed to run the script.

## Setup

First time run the following command:

`npm ci`

To start the test case execution:

`node index`

## Extra

### Before exectue tests
 - If folowing file already exists c:\testdownloads\<file name> it should be deleted manually before exectue tests
    - Otherwise download file test case will be failed as a file with the same name is already exists in the path.

 - If data file need to be taken from local computer, update the following configuration in 'config/default.json' 
    - data.fromUrl to 'false' and 
    - data.localFilePath to absolute path of data.xlsx

       E.x:

          ...
          "data": {
             "localFilePath": "C:\\Users\\Nilwala\\Selenium\\WebUIAutomationTestAssignment\\data\\data_prod.xlsx",
             "fromUrl": false
          }
 - If data need to be taken from git, update only the data.fromUrl as 'true' and provide the url for data.fileUrl.    