Here's a README file based on the details provided and the structure of your repository.

---

# Attyre

Attyre is a custom color palette generation tool designed to help users create customized color palettes based on selecting colors from image , choosing their personal preferences, including undertones and preferences for intensity, seasonal, and occasion-based styles.

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [Libraries and Frameworks Used](#libraries-and-frameworks-used)

## Setup Instructions

1. **Clone the Repository**  
   Clone the repository to your local machine:
   ```bash
   git clone https://github.com/Jyoti040/attyre.git
   cd attyre
   ```

2. **Install Dependencies**  
   Run the following command to install dependencies for both the frontend and backend:
   ```bash
   npm install
   ```

3. **Environment Variables**  
   Set up environment variables to configure backend API and other services. Add a `.env` file to the root of the project with:
   ```
   VITE_BACKEND_URL=<your-backend-url>
   ```

4. **Run the Application**  
   Start the application:
   ```bash
   npm run dev
   ```

5. **Build for Production**  
   To create a production build, run:
   ```bash
   npm run build
   ```

## Libraries and Frameworks Used

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **axios**: For handling HTTP requests to the backend API.
