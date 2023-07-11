# interactive-comments-section

## Description

The project is a Comment Section component built using React that allows users to add, edit, and delete comments. Users can also reply to existing comments. It integrates with a server backend for data storage and retrieval.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [API Endpoints](#api-endpoints)
- [Credits](#credits)

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run the following command to install the required dependencies:
 npm install


## Usage

1. Start the development server using the following command:
 npm start


2. Access the Comment Section component in your browser at `http://localhost:3000` or the appropriate URL.

## Features

- Users can add comments.
- Users can edit their own comments.
- Users can delete their own comments.
- Users can reply to existing comments.
- Comments are displayed with user IDs and creation dates.
- Users can disconnect from the application.

## Technologies

The project uses the following technologies:

- React: A JavaScript library for building user interfaces.
- React Router: A routing library for React applications.
- Axios: A library for making HTTP requests.
- HTML/CSS: Markup and styling for the user interface.

## API Endpoints

The Comment Section component interacts with the following API endpoints:

- `POST /user/verify`: Verifies user authentication.
- `GET /comment/:userId`: Retrieves comments for a specific user.
- `POST /comment`: Creates a new comment.
- `PUT /comment/:commentId`: Updates an existing comment.
- `DELETE /comment/:commentId`: Deletes a comment.
- `POST /comment/:commentId/reply`: Adds a reply to a comment.


## Credits

Team members:

-  [Kostas Kotsis](https://github.com/zitsko)
- [Jason Galanis](https://github.com/JasonGal1337)
  





