# Bankable: Invoice Management App 💼📈

This is an Invoice Management application that allows users to create and manage invoices. Users can create new invoices, filter invoices by status, and view details of each invoice.

To visit the website: https://submit-invoice-app.netlify.app/

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Designs](#designs)
- [Contributing](#contributing)
- [License](#license)

## Features


### Create new invoices with the following details:

- Invoice number
- Issue name
- Currency
- Total amount
- VAT number
- Country
- Invoice date
- Payment due date
- Invoice status (pending or paid)

### Invoice Preview:

- Preview the invoice details before submitting the form.
- View a comprehensive summary of the invoice including issue details, amount, VAT, dates, and payment status.
- Edit the invoice details or submit the invoice for processing.

### Filter Invoices:

- Filter invoices based on their payment status (pending or paid).
- Easily navigate through invoices with different payment statuses.
  
### Invoice List:

- View a list of invoices with relevant information.
- Each invoice displays its issue name, invoice number, total amount, and payment status.

### User Authentication:

- Sign up and log in to manage invoices securely.
- User data is stored and managed using Firebase authentication.

### Wizard Form:

- The invoice creation process is designed as a 3-step wizard for easy data input.
- Each step of the form guides the user through different aspects of the invoice creation process.

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

1. [Vue.js 3](https://vuejs.org/): Front-end framework
2. Firebase: Authentication and Firestore database
3. Tailwind CSS: Styling and responsive design
4. [Vite](https://vitejs.dev/): Build tool and development server
5. [Vue Router](https://router.vuejs.org/): Client-side routing

## Script Setup and Computed Properties: 

This project utilizes Vue 3's script setup syntax for component logic and Computed Properties for efficient data manipulation.

## Designs

- Wizard form + Invoice Board: [Go to Figma mockup](https://www.figma.com/file/KEbdEEVi1sfiMt0mlvx2bC/Bankable?type=design&node-id=12%3A1028&mode=design&t=MVdU4vaTRzzeXa8P-1)
- Invoice Preview/Modal: [Invoice Preview idea](https://drive.google.com/file/d/14idP3JBrBQZzw3FMXbWtrOGGC0ko_Dfx/view?usp=sharing)
- Register/Login Form: [Register/Login idea](https://drive.google.com/file/d/1mcBro5t0i9CPaRkn3773jeuZj9S0X_PX/view?usp=sharing)

## Contributing:

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Commit your changes and push to your forked repository.
5. Create a pull request to the main repository.

# License: 

This project is licensed under the [MIT License](https://chat.openai.com/c/LICENSE) - see the LICENSE file for details.
