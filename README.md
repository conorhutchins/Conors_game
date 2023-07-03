# Conor's Board Games REST API

[![Conor's Board Games](https://conors-game.onrender.com/favicon.ico)](https://conors-game.onrender.com)

Welcome to my personal project, **Conor's Board Games REST API**. This project serves as the backend of a board games review site. It's written in Javascript and is equipped with features allowing users to post reviews of various games, comment on these reviews, and vote on comments/reviews.

## Key Features

- User reviews: Users can post reviews of board games across different categories.
- Comments: Users can engage in discussions by commenting on game reviews.
- Search and Sort: Provides functionality to search for reviews and order them.
- Voting: Enables users to upvote or downvote reviews and comments.
- Comment deletion: Users have the ability to delete comments.

## Installation & Setup

Follow the steps below to clone, install dependencies, and setup the database.

1. **Clone this repository**

    ```bash
    git clone https://github.com/conorhutchins/Conors_game
    ```

2. **Install dependencies**

    ```bash
    npm init -y
    ```

3. **Setup the database**

    ```bash
    npm run setup-dbs
    npm run seed
    ```

4. **Create environment variables files**

You will need to create two .env files: `.env.test` and `.env.development`. Inside each file, add your PostgreSQL database name in the following format:

    ```bash
    PGDATABASE=<database_name_here>
    ```

Use the correct database name for each environment: `nc_games` or `nc_games_test`. Make sure to add these .env files to your .gitignore.

Environment variables are set by passing dotenv a config object with the correct path, determined by your current working environment (eg. test or development). This is done in the connection file before the pool is exported.

## Prerequisites

Please ensure that you have the following applications installed on your system:

- Node.js (v19.7.0)
- PostgreSQL (psql 15.2)

Now, you're all set to explore and work on **Conor's Board Games REST API**. Enjoy!
