# Quiz Application Backend Development Assignment

## Introduction

This assignment aims to evaluate your backend development skills using Node.js, Express.js, and MongoDB. You will be tasked with building a RESTful API for a quiz application that allows users to create and participate in timed quizzes.

## Functionalities

### 1. Create a Quiz

- Users can create quizzes by sending a POST request to `/quizzes` endpoint.
- **Required fields** in the request body:
  - `question`: The text of the question.
  - `options`: An array of strings representing answer options.
  - `rightAnswer`: The index of the correct answer in the options array (starting from 0).
  - `startDate`: The date and time (ISO format) when the quiz should start.
  - `endDate`: The date and time (ISO format) when the quiz should end.

### 2. Get Active Quiz

- Users can retrieve the currently active quiz (within the start and end time) by sending a GET request to `/quizzes/active`.
- The response should include the quiz data, including current status.

### 3. Get Quiz Result

- After 5 minutes of the quiz's end time, users can retrieve the quiz result by sending a GET request to `/quizzes/:id/result`, where `:id` is the quiz's unique identifier.
- The response should include the correct answer and additional information if needed.

### 4. Get All Quizzes

- Users can retrieve all quizzes (including inactive and finished) by sending a GET request to `/quizzes/all`.
- The response should include a list of quiz objects with relevant information.

## Technical Requirements

### Backend

- **Node.js** (version 16 or later)
- **Express.js**
- **Mongoose** (for MongoDB interaction)
- **Cron Job** (for automating status updates)

### Database

- **MongoDB**

### Security

- **JWT-based authentication** for secure access
- **Rate limiting** to prevent abuse

## Evaluation Criteria

### Functionality

- All API endpoints should be implemented according to the specifications.
- User authentication and authorization should be properly implemented.
- The application should handle quiz status updates using Cron jobs.

### Code Quality

- Clean and organized code structure
- Proper use of comments and documentation
- Conformance to coding best practices

### API Documentation

- Comprehensive and well-structured API documentation
- Clear and concise explanation of endpoints and response formats

### Error Handling

- Robust error handling for all possible scenarios
- Proper error codes and messages

### Performance

- Efficient code execution
- Adequate resource utilization

### Deployment

- The application should be deployable to a cloud platform or server environment.

## Additional Resources

### Node.js Tutorials

- [YouTube Node.js Tutorial](https://m.youtube.com/watch?v=fBNz5xF-Kx4)
- [The Odin Project - Node.js Course](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs)

### MongoDB and Mongoose

- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

### Cron Jobs

- [Crontab Guru](https://crontab.guru/)

## Conclusion

This assignment will test your ability to develop a robust backend system for a quiz application, covering various aspects including functionality, security, code quality, documentation, error handling, performance, and deployment. Good luck!
