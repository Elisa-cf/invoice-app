# Bankable: Invoice Management App 💼📈

This is an Invoice Management application that allows users to create and manage invoices. Users can create new invoices, filter invoices by status, and view details of each invoice.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create new invoices with details like invoice number, issue name, currency, total amount, etc.
- Invoice preview before submiting the form.
- Filter invoices by their payment status (pending or paid).
- View a list of invoices with relevant information.
- Sign up and log in to manage invoices securely.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/invoice-management-app.git
   cd invoice-management-app

2. Install dependencies:

  ```sh
  npm install
  ```

3. Create a Firebase project and set up authentication and Firestore database.
4. Update the Firebase configuration in src/utils/firebaseConfig.js with your project's credentials.

## Usage

1. Start the development server:

  ```sh
  npm run dev
  ```
2. Access the app in your browser at http://localhost:3000.
3. Sign up or log in to start managing your invoices.

4. Compile and Minify for Production

  ```sh
  npm run build
  ```

## Technologies Used: 

[Vue.js 3](https://vuejs.org/): Front-end framework
Firebase: Authentication and Firestore database
Tailwind CSS: Styling and responsive design
[Vite](https://vitejs.dev/): Build tool and development server
[Vue Router](https://router.vuejs.org/): Client-side routing

## Script Setup and Computed Properties: 

This project utilizes Vue 3's script setup syntax for component logic and Computed Properties for efficient data manipulation.

## Contributing:

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Commit your changes and push to your forked repository.
5. Create a pull request to the main repository.

# License: 

This project is licensed under the [MIT License](https://chat.openai.com/c/LICENSE) - see the LICENSE file for details.
