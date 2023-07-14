# HrConnect - CRUD App Readme
HrConnect is a CRUD (Create, Read, Update, Delete) application built using ReactJS, Node.js, Express, Axios, Mongoose, MongoDB, React Router DOM, and Bootstrap. This application allows you to keep records of employees by managing their name, email, phone number, and age. This readme document provides an overview of the application's features, setup instructions, and usage guidelines.

## Features
- Create new employee records by entering their name, email, phone number, and age.
- Retrieve a list of all employees and view their details.
- Update employee information, including name, email, phone number, and age.
- Delete employee records from the database.
- Employes data is stored in a MongoDB database using Mongoose ODM.
## Technologies Used
- ReactJS: A JavaScript library for building user interfaces.
- Node.js: A JavaScript runtime environment that executes JavaScript code outside of a web browser.
- Express: A web application framework for Node.js, used for building server-side applications.
- Axios: A promise-based HTTP client for making HTTP requests from the browser or Node.js.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a schema-based solution for modeling application data.
- MongoDB: A popular NoSQL database.
- React Router DOM: A routing library for React applications.
- Bootstrap: A popular CSS framework for building responsive web interfaces.
## Prerequisites
To run the HrConnect application locally, you need to have the following tools installed on your machine:

- Node.js and npm (Node Package Manager): Install from https://nodejs.org
- MongoDB: Install from https://www.mongodb.com
## Installation
1. Clone the repository to your local machine:
```bash
git clone https://github.com/your-username/HrConnect.git
```
2. Navigate to the project directory:
```bash
cd HrConnect
```
3. Install the dependencies for both the server and client:
```bash
npm install
```
3. Create a .env file in the project's root directory and provide the necessary environment variables:
```env
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
```
__Note:__ Replace __`<your_mongodb_connection_string>`__ with the actual connection string for your MongoDB database.

## Usage
1. Start the server: when in the hrServer folder type
```bash
npm run dev
```
This will start the Node.js server on the specified port (default is 5000).
2. Start the client: when in the hrClient folder type
```bash
npm run dev
```
This will start the React development server and open the application in your default browser.
3. Use the HrConnect application in your browser:
- Create a new employee record by clicking the "__Add +__" button on the home page. This will open a form.
  ![Screenshot Description](/screenShots/Home.png)
- fill out the necessary fields and click the "__Create__" button.
  ![Screenshot Description](/screenShots/new.png)
- The list of employees and their details is located on the home page.
- View details of an employee by clicking the "__view__" button next to an employee's entry.
  ![Screenshot Description](/screenShots/viewUser.png)
- Update employee information by clicking the "__Update__" button next to an employee's entry, making the desired changes, and clicking the "__Update__" button.
  ![Screenshot Description](/screenShots/Update.png)
- Delete an employee record by clicking the "__Delete__" button next to an employee's entry.
## Folder Structure
The HrConnect project has the following folder structure:

- __`hrClient`__: Contains the client-side code, built with ReactJS.
- __`hrServer`__: Contains the server-side code, built with Node.js, Express, and MongoDB/Mongoose.
- __`public`__: Contains static files to be served by the React development server.
- __`README.md`__: The readme file with project documentation.
- __`package.json`__: Defines project dependencies and scripts.
- __`server.js`__: The entry point for the server-side application.
## Contributing
If you'd like to contribute to the HrConnect project, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your forked repository.
4. Submit a pull request explaining your changes and any additional information.
## License
The HrConnect project is open-source software licensed under the MIT License.

## Contact
For any questions or inquiries, please contact the project maintainers at mwanikiedu114@gmail.com.

Thank you for using HrConnect! We hope this application helps you efficiently manage employee records. If you have any feedback or encounter any issues, please let us know.
