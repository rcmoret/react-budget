This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project works in conjunction with my [budget api](https://github.com/rcmoret/budget-api)

## Getting started

### API Configuration
`cp src/shared/Constants/Api.js.example src/shared/Constants/Api.js`<br>
By default, the api is expected to be running locally (`127.0.0.1`) on port `8088`.<br>
Change `src/shared/Constants/Api.js` to match your api set up.

### `npm install`
### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Accounts
#### Manage
Each account appears as a tile with a name and its balance across the top.<br>
From here you can select 'Manage Accounts'. From here you can create, modify, delete (usually soft delete) accounts. 

#### Transfers
View, create and delete transfers

#### Transactions
Clicking on a tile renders that accounts transactions which are paginated by month. Creating and update individual transactions is available here. Transactions are paginated by month and the url will change to reflect the month (`accounts/:account_id/:month/:year`). The absence of month and year will default to the current month/year.

### Budget
#### Items Index
Items are also paginated by month and follows a similar pattern to transactions index. Items are organized by day-to-day/monthly and also by revenues/expenses. Day-to-day (and discrectionary) items have additional information which can be seen by clicking the caret for the item. Item amount is the only editable datum for an item so clicking on the amount renders an input for updating. 

#### Category Index
Create, read, update and delete are available for categories

#### Icons
Create, read, update and delete are available for icons

#### New Month Workflow
...

#### End of Month Workflow
