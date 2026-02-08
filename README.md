# CobblePotesAPI

## Project Title
CobblePotesAPI

## Description
CobblePotesAPI is a RESTful API developed to manage and interact with the CobblePotes application. This API provides endpoints to create, retrieve, update, and delete potes (items).

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/sayidowprod-afk/CobblePotesAPI.git
   ```
2. Navigate to the project directory:
   ```bash
   cd CobblePotesAPI
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

## Usage
1. Start the server:
   ```bash
   npm start
   ```
2. The API will be available at `http://localhost:3000`.

## API Endpoints
### 1. Create a Pote
- **POST** `/potes`
- **Request Body:** `{
    "name": "string",
    "description": "string"
}`
- **Response:** Pote object

### 2. Retrieve All Potes
- **GET** `/potes`
- **Response:** Array of pote objects

### 3. Update a Pote
- **PUT** `/potes/:id`
- **Request Body:** `{
    "name": "string",
    "description": "string"
}`
- **Response:** Updated pote object

### 4. Delete a Pote
- **DELETE** `/potes/:id`
- **Response:** Success message

## Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [Express.js](https://expressjs.com/) - For the Node.js framework.
- [MongoDB](https://www.mongodb.com/) - For the database.
