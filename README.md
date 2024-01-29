# 🚀 Sigma Events

Welcome to Sigma Events, an easy-to-use website for organizing and participating in events hassle-free. Check it out <a href="https://sigmaevents.netlify.app/"><kbd>here</kbd></a>.

This project simplifies event planning and participation with an intuitive and user-friendly interface, built using Next.js, Tailwind CSS, and MongoDB.

# 🎉 Key Features

- Clear event details presented in a structured manner.
- One-time information entry to avoid repetitive form filling.
- Instant event notifications for timely updates.
- Insights and feedback for event management and improvement.
- Privacy-focused approach without sharing personal information publicly.
- Easy access to past and upcoming events for efficient planning.

## 🛠️ Setting Up Sigma Events Locally

To set up Sigma Events locally on your machine, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/abhideepkumar/sigmaevents
cd sigmaevents
```

### 2. Install Dependencies

Run the following command to install necessary dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Rename a `example.env.local` file to `.env.local` in the project's root directory and change the required environment variables.

#### Setting Up Google Authentication

1. **Create a Google Cloud Platform Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/) and create a project for Sigma Events.

2. **Enable Google Authentication**:
   - In the Google Cloud Console, navigate to the created project and enable Google authentication for your project.

3. **Obtain Google Client ID and Client Secret**:
   - Within the Google Cloud Console, retrieve the Client ID and Client Secret for the project.

4. **Add Authorized JavaScript origins and Authorized redirect URIs**:
   - In the Google Cloud Console, go to the Credentials section and select your project.
   - Click on the edit button next to your Client ID and scroll down to the Authorized JavaScript origins and Authorized redirect URIs sections.
   - Add the URL where your application will run locally (`http://localhost:3000/` for Authorized JavaScript origins) and (`http://localhost:3000/api/auth/callback/google` for Authorized redirect URIs). This will allow Google to recognize your application and redirect the user back to your website after authentication.
   - Save the changes and copy the Client ID and Client Secret to your `.env.local` file.

#### Setting Up MongoDB

1. **Create a MongoDB Atlas Account**:
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a new cluster for Sigma Events.

2. **Get API Key and Connection URL**:
   - After creating the cluster, obtain the API Key and Connection URL from Data API section.

#### NextAuth Configuration

- `NEXTAUTH_SECRET`: This should be a 32-digit random hexadecimal code, used for session encryption and signing. Generate a secure secret key from [numbergenerator.org](https://numbergenerator.org/random-32-digit-hex-codes-generator) and paste it as the value for `NEXTAUTH_SECRET`.

- `NEXTAUTH_URL`: Set this to the URL where your application will run locally (`http://localhost:3000/` by default). This URL is used during the authentication process. Also, add this url in your Google Console Authentication so that Google login will allow this URL.

- `ADMIN_NEXTAUTH_URL`:This URL is used during the authentication process for admins.

#### Update .env.local with obtained credentials

Update the `.env.local` file with the obtained credentials:

If you still find it challenging, you can watch some YouTube videos for guidance.

### 4. Start the Project

Run the following command to start the Sigma Events project locally:

```bash
npm run dev
```

Access the website via `http://localhost:3000/` in your browser.

## 🤝 Contributing

Contributions are welcome! Submit issues or pull requests for improvements or bug fixes.

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
