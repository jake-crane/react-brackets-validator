# React take home exercise - Ultimate Bracket Validator

## Brief

Your task is to build a single page app that will take an input String from the user in the form of a text area and upon hitting a submission button, evaluate if the brackets within the String are considered valid. A String will be classed as valid given all of the following conditions are matched:
* Every opening bracket must have a corresponding closing bracket
* Every closing bracket must have a corresponding opening bracket
* Brackets must be closing in the reversed order they were opened

The following character pairs are considered opening and closing brackets respectively: 
  * `[`, `]`
  * `{`, `}`
  * `(`, `)`
  * `<`, `>`

All other characters in the input String should be ignored.

The results of each evaluation should be added to a history table below the input field. 
* The history table should be re-rendered with the validated String after submission and processing of the String.
* The history table should indicate the reason why a String failed validation (Invalid closing bracket, or Invalid opening bracket). 
  * A String may fail for more than one reason however only the first reason needs to be reported. The bracket that caused the error should be indicated in the reason.

## Suggested Layout

Please find below rough guidance on the basic layout expected, and example data shown in the history table, demonstrating the rules defined above:

![image](https://user-images.githubusercontent.com/89465154/229849250-2bf2fc1f-e143-49f1-927e-4eee58e985f1.png)
* `{}[][]` -	Valid	
* `<{[]}<>>` -	Valid	
* `<[]>>`	- Invalid closing bracket `>`, missing opening bracket `<`
* `<[]><`	- Invalid opening bracket `<`, missing closing bracket `>`
* `<[>]`	- Invalid `>` missing `]`


## Guidance

* You start with this empty repository, but are welcome to use a sample React app as a starting point if you wish such as `create-react-app` or similar
* TypeScript is preferred, functional components are preferred
* There is no back end or data source to this application, the application should be fully contained within the single page app unpersisted
* You may want to consider unit testing for the validation algorithm, given time constraints no other unit testing is suggested
* The focus of this task is producing clean, organized, readable, testable, and performant code
* You are welcome to use libraries for styling, but please do **not** use any libraries to assist in writing the core validation algorithm
* Please commit your solution back to this GitHub repository
* Bonus tasks:
  * Indicate visually to the user which bracket in the submitted text was invalid
  * Given a text input that is long enough in length to stretch history table, consider an alternative styling to keep the table readable

Please give the task your best shot and show us what you can do!

Do not spend longer than a few hours on this task, if you do not have time to finish part of the application that you intended, please leave a code sample and a comment explaining what your intentions would be if you were given more time. We can discuss those intentions in the follow up interview should it be offered.
