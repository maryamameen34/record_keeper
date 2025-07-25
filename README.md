# RecordKeeper

RecordKeeper is a modern, full-stack web application designed for efficient record management. It allows users to create, view, search, edit, and delete records, complete with a clean user interface powered by Shadcn UI and robust authentication provided by Clerk.

## Features

*   **User Authentication:** Secure sign-up and sign-in using Clerk, ensuring only authenticated users can access records.
*   **Record Management (CRUD):**
    *   **Create Records:** Easily add new records with title, date, and description.
    *   **View Records:** Display all records in a sortable, paginated table.
    *   **Search Records:** Filter records instantly by title.
    *   **Edit Records:** Update existing records via a convenient dialog.
    *   **Delete Records:** Remove records with a confirmation prompt.
*   **Dynamic Pagination:** Efficiently browse through large sets of records with a fully functional pagination system (previous/next buttons, page numbers, ellipses).
*   **Modern UI:** A clean, responsive, and visually appealing user interface built with Shadcn UI components and Tailwind CSS.
*   **Toast Notifications:** User-friendly, non-intrusive alerts for success and error messages.
*   **Date & Time Input:** Integrated date picker for easy and consistent date input.
*   **Backend Sorting:** Records are fetched and displayed sorted by creation date (latest first).

## Technologies Used

*   **Frontend:**
    *   Next.js 14 (React Framework)
    *   TypeScript
    *   Tailwind CSS
    *   Shadcn UI (for beautiful and accessible components like Buttons, Inputs, Tables, Dialogs, Pagination, Toasts, Calendar, Popover, Textarea, Label)
    *   `date-fns` (for date formatting)
    *   `axios` (for API requests)
*   **Backend:**
    *   Next.js API Routes
    *   Mongoose (MongoDB object modeling for Node.js)
    *   MongoDB (Database)
*   **Authentication:**
    *   Clerk (Authentication as a Service)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have the following installed:

*   Node.js (>= 18.x)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/maryamameen34/recordkeeper.git
    cd recordkeeper
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env` file in the root of the project and add the following environment variables. Obtain your MongoDB URI from MongoDB Atlas or your local setup, and your Clerk API keys from your Clerk Dashboard.

```dotenv
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

2.  Open your browser and visit `http://localhost:3000`.

## Live Demo

Check out the live deployment of RecordKeeper here: [https://record-keeper-pi.vercel.app/](https://record-keeper-pi.vercel.app/)


Check out the live demo of RecordKeeper here: [https://www.youtube.com/watch?v=FT1hMN7vg-M&t=6s](https://www.youtube.com/watch?v=FT1hMN7vg-M&t=6s)
## Usage

*   **Authentication:** The application is protected by Clerk. You will be prompted to sign in or sign up when you first visit the page.
*   **Add Records:** Click the "Add New Record" button to open a dialog and create new records.
*   **Search:** Use the search bar to filter records by title.
*   **Pagination:** Navigate through records using the pagination controls at the bottom of the table.
*   **Edit Records:** Click the blue edit icon (pencil) next to a record to open an edit dialog.
*   **Delete Records:** Click the red delete icon (trash can) next to a record to permanently remove it.

## Contributing

Contributions are welcome! If you find a bug or have an improvement, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
