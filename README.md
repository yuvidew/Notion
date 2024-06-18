# Notion Clone Website

This project is a clone of Notion, built using the following technologies:
- **Next.js**: A React framework for building server-side rendered applications.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Convex**: A backend-as-a-service that simplifies building full-stack applications.
- **EdgeStore**: A storage solution for managing and serving files.

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with the Notion Clone, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yuvidew/notion-clone.git
   cd notion-clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory and add the necessary environment variables for Convex and EdgeStore.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
notion-clone/
├── public/             # Static files
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Next.js pages
│   ├── styles/         # Tailwind CSS styles
│   ├── utils/          # Utility functions
│   └── services/       # Convex and EdgeStore services
├── .env.local          # Environment variables
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## Features

- **Rich Text Editing**: Create and edit rich text content with various formatting options.
- **Page Management**: Create, edit, and delete pages to organize your content.
- **Real-time Collaboration**: Collaborate with others in real-time.
- **File Storage**: Upload and manage files with EdgeStore.
- **Authentication**: User authentication and authorization using Convex.

## Technologies

- **Next.js**: Framework for server-rendered React applications.
- **Tailwind CSS**: Utility-first CSS framework.
- **Convex**: Backend-as-a-service for data management.
- **EdgeStore**: Storage solution for handling files.

## Installation

To install the dependencies, run the following command:

```bash
npm install
```

## Usage

### Running the Development Server

To start the development server, use:

```bash
npm run dev
```

### Building for Production

To build the project for production, use:

```bash
npm run build
```

To start the production server, use:

```bash
npm start
```

### Linting

To run ESLint, use:

```bash
npm run lint
```

### Tailwind CSS

Tailwind CSS is configured in the `tailwind.config.js` file. You can customize the design system by editing this file.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push to your branch.
5. Open a pull request.

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

Happy coding! If you have any questions, feel free to open an issue or reach out.
