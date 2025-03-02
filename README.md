# CS-465

## Architecture

This project used both a multi-page rendering with Express HTML and JavaScript and a single-page application (SPA). The Express server handled routing and server-side rendering, while client-side JavaScript allowed for content updates (like trips). The backend used a NoSQL MongoDB database due to its flexibility in handling unstructured data.

## Functionality

JSON (JavaScript Object Notation) is a universal format that allows a frontend and backend to communicate easily. Throughout development, I refactored code to improve efficiency, such as creating reusable UI components to reduce redundancy and make it easier to maintain. One specific example of this is in the app_server controllers where the rendering logic first tries the API and if it fails it falls back to a locally saved copy. 

## Testing

Testing involved verifying API methods (GET, POST, PUT, DELETE) endpoints returned data that was expected. This was done using postman.  Security testing was very important , especially after adding admin authentication.

## Reflection

This course helped with my skills in full stack development, authentication, and database management. I learned how to build and secure an application from end to end, making me a more marketable developer with hands-on experience in frontend, backend, and security best practices. This project provided a good starting point for working with real-world web applications and adding  security.
