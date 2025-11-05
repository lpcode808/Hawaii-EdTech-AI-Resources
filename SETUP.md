# Phase 2 Setup Guide

This guide will help you set up Firebase Authentication, Firestore, and Airtable for the Hawaii AI Resources Hub.

## Prerequisites

- Node.js 16+ installed
- A Google account for Firebase
- An Airtable account (free tier is fine)
- A Vercel account (optional, for deployment)

## Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Give your project a name (e.g., "hawaii-ai-resources")
4. Follow the setup wizard (you can disable Google Analytics if you prefer)

### 2. Enable Authentication

1. In the Firebase Console, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Google" as a sign-in provider
5. Add your authorized domains (e.g., localhost, your-vercel-domain.vercel.app)

### 3. Enable Firestore Database

1. In the Firebase Console, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (you can configure security rules later)
4. Select a Firestore location closest to your users (e.g., us-west2 for Hawaii)

### 4. Get Firebase Configuration

1. Go to Project Settings (gear icon in the left sidebar)
2. Scroll down to "Your apps" section
3. Click the web icon (</>)
4. Register your app with a nickname
5. Copy the `firebaseConfig` object values

### 5. Set Up Firestore Security Rules

1. Go to Firestore Database > Rules
2. Update the rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Bookmarks collection
    match /bookmarks/{bookmarkId} {
      allow read, write: if request.auth != null
        && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

## Airtable Setup

### 1. Create an Airtable Base

1. Go to [Airtable](https://airtable.com/)
2. Create a new base called "Hawaii AI Resources"
3. Rename the default table to "Resources"

### 2. Set Up Table Structure

Create the following fields in your Resources table:

| Field Name       | Field Type      | Description                    |
|------------------|-----------------|--------------------------------|
| Title            | Single line text| Resource title                 |
| Description      | Long text       | Resource description           |
| URL              | URL             | Link to resource               |
| Type             | Single select   | Tool, Course, Documentation... |
| Category         | Single select   | Development Tools, Learning... |
| Tags             | Single line text| Comma-separated tags           |
| Image URL        | URL             | Optional image                 |
| Local Relevance  | Single line text| Hawaii connection              |
| Submitted By     | Single line text| User's display name            |
| Submitted Email  | Email           | User's email                   |
| Submitted Date   | Date            | Submission timestamp           |
| Status           | Single select   | Pending Review, Approved...    |

### 3. Configure Single Select Options

**Type options:**
- Tool
- Course
- Documentation
- Article
- Video
- Library
- Dataset
- Other

**Category options:**
- Development Tools
- Learning Resources
- Research Papers
- Datasets
- Community

**Status options:**
- Pending Review
- Approved
- Rejected

### 4. Get Airtable API Credentials

1. Go to [Airtable API](https://airtable.com/api)
2. Select your base
3. Copy your Base ID from the URL or the API documentation
4. Go to your [Airtable account](https://airtable.com/account)
5. Generate a Personal Access Token with `data.records:read` and `data.records:write` permissions
6. Copy the token (you won't be able to see it again!)

## Environment Variables Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your credentials in `.env`:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_from_firebase_config
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Airtable Configuration
VITE_AIRTABLE_API_KEY=your_airtable_personal_access_token
VITE_AIRTABLE_BASE_ID=your_airtable_base_id
VITE_AIRTABLE_TABLE_NAME=Resources
```

3. **Important:** Never commit `.env` to version control! It's already in `.gitignore`.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

4. Test the features:
   - Click "Sign In" to authenticate with Google
   - Click the bookmark icon on resource cards
   - Click "Submit Resource" to add a new resource

## Vercel Deployment

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add all variables from your `.env` file

### Option 2: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables (same as above)
6. Click "Deploy"

### Update Firebase Authorized Domains

After deployment:
1. Go to Firebase Console > Authentication > Settings > Authorized domains
2. Add your Vercel domain (e.g., `your-app.vercel.app`)

## Testing the Integration

### Test Authentication
1. Click "Sign In"
2. Sign in with your Google account
3. Verify your name appears in the user menu

### Test Bookmarking
1. Make sure you're signed in
2. Click the bookmark icon on any resource card
3. Verify the bookmark icon is filled
4. Check Firestore console to see the bookmark document

### Test Resource Submission
1. Make sure you're signed in
2. Click "Submit Resource" in the user menu
3. Fill out the form and submit
4. Check your Airtable base for the new record with "Pending Review" status

## Troubleshooting

### Firebase Authentication Errors
- Make sure your domain is in Firebase authorized domains
- Check that Google sign-in is enabled in Firebase Console
- Verify your Firebase config values are correct

### Firestore Permission Errors
- Check Firestore security rules
- Make sure you're signed in before bookmarking
- Verify the collection name is "bookmarks"

### Airtable API Errors
- Verify your API key has the correct permissions
- Check that your Base ID is correct
- Ensure field names in code match your Airtable table exactly

### Deployment Issues
- Make sure all environment variables are set in Vercel
- Check that your build completes successfully locally first
- Verify your domain is added to Firebase authorized domains

## Next Steps

After setup:
1. Review and approve submitted resources in Airtable
2. Change approved resources' Status to "Approved"
3. Consider syncing approved resources back to your app
4. Configure more restrictive Firestore security rules for production
5. Set up Airtable webhooks for real-time updates (Phase 3)

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Ensure Firebase and Airtable are configured properly
4. Review the Firebase and Airtable documentation

For Hawaii AI community support, reach out on our community channels!
