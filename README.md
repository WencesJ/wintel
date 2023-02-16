## 🚀 Quick start

Wintel Project

# Wintel Project By Wenceslas Jonah

Wintel - A minimal e-commerce(Musical Instruments) application

The simple **Wintel Api** demonstrates a minimal e-commerce application that allows users to:

**Product Feature**

    - [Create a product - POST](https://wintel.onrender.com/api/v1/products)
    - [Get all products - GET] (https://wintel.onrender.com/api/v1/products)
    - [Get a single product - GET: `where :id is either productId or id field`](https://wintel.onrender.com/api/v1/products/:id/single)
    - [Update a single product - PATCH: `where :id is either productId or id field`](https://wintel.onrender.com/api/v1/products/:id/single)
    - [Delete a single product - DELETE: `where :id is either productId or id field`](https://wintel.onrender.com/api/v1/products/:id/single)
  
### Prerequisites

To run this project locally, the follow tools need to be installed:

-   [Node.js](https://nodejs.org/en/download/)
-   [MongoDB Compass](https://www.mongodb.com/try/download/compass)
-   [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

### Installation

Clone the project:

```
git clone https://github.com/wencesJ/wintel.git
```

Move into the project directory and install it's dependencies:

```
cd wintel/
npm install
```

To start the dev API server run the following command:
make sure the config.env file has been created using the config.example file in the /src/libs/config folder.

```
npm run start:dev
```

For Rapid Developement Use An Api Client eg:

[Postman](https://www.postman.com/)

```
Wintel:Api Documentation
```

**Open the source code and start editing!**

Your site is now running at `http://localhost:5000/api/v1/`

Open the `wintel` directory in your code editor of choice and edit files under `src`. Save your changes and the browser will update in real time!

**For working on the repository, you'll have to follow these steps:**

1: Fork the repo

2: Create a new branch on the forked repository. The name of the new branch should be `issue-<ISSUE NO>`.

3: Clone the repository on your system.

4: Work on the new branch and push the code.

5: Create a PR.
