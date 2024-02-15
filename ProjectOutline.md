### Project Outline

## 1. Project Setup
- Initialize Node.js project with npm init.
- Install necessary npm packages: express, mongoose, and any date library if required.
- Configure server.js as the entry point.

## 2. Database Models
- User Model: Define schema for users including username, email, thoughts, and friends.
- Thought Model: Define schema for thoughts including thoughtText, createdAt, username, and reactions.
- Reaction Schema: Define a schema for reactions as a subdocument of Thought, including reactionId, reactionBody, username, and createdAt.
- Implement virtuals for friendCount in User model and reactionCount in Thought model.

## 3. API Routes
- Users Routes (/api/users):
CRUD operations on users.
Add/remove friends.
- Thoughts Routes (/api/thoughts):
CRUD operations on thoughts.
Add/remove reactions.
- Structure routes using Express Router, separating them into userRoutes.js and thoughtRoutes.js.

## 4. Controllers
- User Controller: Functions to handle requests for creating, retrieving, updating, and deleting users, and managing friends.
- Thought Controller: Functions to handle requests for creating, retrieving, updating, and deleting thoughts, and managing reactions.

## 5. Middleware
- Implement middleware for error handling.
- Use Express middleware for body parsing, logging requests, and other common web application needs.

## 6. Database Connection
- Configure Mongoose to connect to MongoDB.
- Ensure models are synced with the database upon application start.

## 7. Testing
- Use Insomnia or Postman to test API routes.
- Ensure all acceptance criteria are met:
Server starts and connects to MongoDB.
API routes return correct data in JSON format.
Ability to create, update, and delete users and thoughts.
Ability to add and remove friends and reactions.

## 8. Bonus Features
- Implement additional features such as JWT authentication for users.
- Consider adding pagination for list routes.
- Implement a soft delete mechanism for users and thoughts.

## 9. Documentation
- Document API endpoints.
- Include setup instructions and environment requirements.