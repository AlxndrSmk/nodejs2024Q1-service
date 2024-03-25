# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/AlxndrSmk/nodejs2024Q1-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Additional

### Environment Variables:

Locate the ```.env.example``` file in your project's root directory. Copy it as ```.env``` and customize the values according to your specific setup. This file holds sensitive information needed by the application.

### Testing in Isolation:

Running tests concurrently with the application can be disruptive. To ensure a clean testing environment, open a separate terminal window and execute the designated test commands. This allows for uninterrupted testing without affecting the application's operation.

### Accessing Documentation:

The application boasts comprehensive OpenAPI documentation, providing in-depth details about its functionalities. After launching the application, simply navigate to ```http://localhost:4000/doc/``` in your web browser to access this valuable resource.

### Debugging and Beyond:

For streamlined debugging within Visual Studio Code, leverage the built-in debugger. Simply press F5 to initiate the debugging process. Additionally, explore the package.json file to discover other scripts potentially useful for development or production environments.