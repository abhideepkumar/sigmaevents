Welcome to Sigma Events! 🚀 This project is an easy-to-use website created to help students and clubs plan and participate in events hassle-free. It's built using Next.js, Tailwind CSS, and MongoDB. Let's dive into how you can get started!

## What's Sigma Events?

Sigma Events is like a one-stop platform where students and clubs can organize and join events without any fuss. It's designed to make event planning and participation super simple. Here's why you might find it helpful:

- 📅 **Clear Event Details**: All event information is neatly presented, so you won't miss any details.
- ✏️ **No Repetitive Form Filling**: Say goodbye to filling in the same details for every event. Save time by entering your info just once!
- 🔔 **Instant Event Notifications**: Stay up-to-date with instant event notifications so you never miss an exciting opportunity.
- 📊 **Insights and Feedback**: Get insights about event attendance and gather valuable feedback for improvement.
- 🔒 **Privacy-Focused**: No need to share your personal number like in WhatsApp groups.
- 🕰️ **Easy Access to Past and Upcoming Events**: Find past events easily and plan for upcoming ones hassle-free.

## Project Structure Overview

### Components Folder
This folder holds different parts of the website:
- **Access**: Deals with letting you log in to access the website.
- **AllEvents**: Shows all the events available for you to check out and register for.
- **Login**: Handles the process of logging in using Google.
- **Navbar**: The menu bar you see at the top of the site for navigation.
- **User** and **Newuser**: Display user details and manage completing your profile.

### Pages Folder
Here's where different pages of the website are located:
- **_app.js** and **_document.js**: Basic setup for the website.
- **events.js** and **setting.js**: These pages help display events and manage user settings.

## Setting Up MongoDB

Setting up MongoDB is like creating a space to store all the event and user-related data. Don't worry; it's easy!
1. **Create MongoDB Atlas Account**: Sign up [here](https://www.mongodb.com/cloud/atlas) and make a cluster.
2. **Get API Key and Connection URL**: Get a special code (API key) and link (connection URL) for your database.
3. **Set Environment Variables**: Create a `.env.local` file and put in the special codes you received.

## Setting Up NextAuth with Google Console

NextAuth is a tool for handling logins. Here's how to set it up with Google:
1. **Create a Google Cloud Platform Project**: Go to [Google Cloud Console](https://console.cloud.google.com/) and create a project.
2. **Enable Google Authentication**: Click a few buttons in the console to set up Google login for your project.
3. **Get Client ID and Secret**: You'll get special codes (Client ID and Secret) for linking your NextAuth with Google.

## Running the Project Locally

Let's try running Sigma Events on your computer!
1. **Clone the Repository**: Copy the project to your computer using `git clone https://github.com/abhideepkumar/sigmaevents.git`.
2. **Install Dependencies**: Run `npm install` to get all the necessary bits and pieces.
3. **Set Environment Variables**: Make a file called `.env.local` and put in the codes you got from MongoDB and Google.
4. **Start the Project**: Run `npm run dev` in your terminal.

## .env.local should have (setting this is optional if you are working on frontend)
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
MONGO_API
MONGO_KEY
NEXTAUTH_SECRET
NEXTAUTH_URL
## Contributing

We love contributions! Feel free to suggest improvements or even fix bugs by submitting issues or pull requests.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use it however you like!