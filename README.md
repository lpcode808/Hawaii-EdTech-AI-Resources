# Hawaii AI Resources Hub

A curated AI resource discovery platform for the Hawaii AI community. Think "Product Hunt meets Notion database" - a feed-based experience where each AI resource is a beautiful, browsable card.

🔗 **Live Site**: [https://lpcode808.github.io/Hawaii-EdTech-AI-Resources/](https://lpcode808.github.io/Hawaii-EdTech-AI-Resources/)

## Features

- **Feed-based Discovery**: Browse 25+ AI resources in a beautiful, responsive grid
- **Fuzzy Search**: Powered by Fuse.js for intelligent, typo-tolerant search
- **Advanced Filtering**: Filter by categories and tags
- **Smart Sorting**: Sort by recent or random
- **Resource Details**: Click any resource for a detailed modal view
- **Featured Resources**: Highlighted resources important to the Hawaii AI community
- **Local Relevance**: Special highlighting for Hawaii-specific connections
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Search**: Fuse.js
- **Icons**: Lucide React
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Firebase account (for authentication and bookmarks)
- Airtable account (for resource submissions)

### Quick Start (Development)

1. Clone the repository:
```bash
git clone <repository-url>
cd Hawaii-EdTech-AI-Resources
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Firebase and Airtable credentials
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Full Setup (Firebase + Airtable)

For complete Phase 2 functionality including authentication, bookmarks, and submissions:

**See [SETUP.md](./SETUP.md) for detailed setup instructions!**

The setup guide includes:
- Firebase project creation and configuration
- Airtable base setup and API keys
- Environment variable configuration
- Vercel deployment instructions
- Troubleshooting tips

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navigation with search, sort, and user menu
│   ├── UserMenu.jsx        # User authentication dropdown menu
│   ├── ResourceCard.jsx    # Individual resource card with bookmark button
│   ├── FeedGrid.jsx        # Grid layout for resource cards
│   ├── FilterPanel.jsx     # Sidebar filters (desktop)
│   ├── ResourceModal.jsx   # Detail view modal
│   ├── SearchBar.jsx       # Search input with Fuse.js
│   └── SubmissionForm.jsx  # Resource submission form modal
├── contexts/
│   └── AuthContext.jsx     # Firebase authentication context
├── config/
│   └── firebase.js         # Firebase initialization and config
├── services/
│   └── airtable.js         # Airtable API integration
├── data/
│   └── mockResources.json  # 25 sample AI resources
├── utils/
│   └── searchUtils.js      # Fuse.js configuration and utilities
├── hooks/
│   ├── useResources.js     # Data management hook
│   └── useBookmarks.js     # Bookmarking with Firestore
├── App.jsx                 # Main app component
├── index.css              # Tailwind imports
└── main.jsx               # Entry point
```

## Features in Detail

### Search
- Real-time fuzzy search across titles, descriptions, and tags
- Minimum 2 character search queries
- Smart matching with typo tolerance

### Filters
- **Categories**: Development Tools, Learning Resources, Research Papers, Datasets, Community
- **Tags**: Python, LLM, RAG, Machine Learning, and more
- **Combined Logic**: Search + Filters = AND logic, Multiple tags = OR logic

### Sort Options
- **Recent**: Sort by submission date (newest first)
- **Random**: Fisher-Yates shuffle for discovery

### Resource Types
- Tool
- Course
- Documentation
- Article
- Video
- Library
- Dataset
- Other

## Customization

### Adding New Resources

Edit `src/data/mockResources.json` to add new resources:

```json
{
  "id": "rec_026",
  "title": "Your Resource Title",
  "description": "A compelling description...",
  "url": "https://example.com",
  "type": "Tool",
  "tags": ["AI", "Machine Learning"],
  "category": "Development Tools",
  "imageUrl": null,
  "submittedDate": "2025-11-05T00:00:00Z",
  "featured": false,
  "localRelevance": "Optional Hawaii connection"
}
```

### Tailwind Theme

Custom colors are defined in `tailwind.config.js`:
- **Primary**: Blue-600 (links, buttons)
- **Accent**: Amber-500 (highlights, featured badges)
- **Neutral**: Slate-50/800 (backgrounds)

## Phase 1 Complete ✓

- [x] Feed of resource cards (responsive grid)
- [x] Fuzzy search (Fuse.js, client-side)
- [x] Filter by category and tags
- [x] Sort by Recent or Random
- [x] Resource detail modal
- [x] Smooth, polished UX

## Phase 2 Complete ✓

- [x] Firebase Authentication (Google login)
- [x] User authentication UI with profile menu
- [x] Bookmarking functionality with Firestore
- [x] Airtable API integration for resource management
- [x] Resource submission form (authenticated users)
- [x] Vercel deployment configuration
- [x] Comprehensive setup documentation

### New Features in Phase 2:
- **Google Sign-In**: Secure authentication through Firebase
- **Personal Bookmarks**: Save favorite resources (synced to Firestore)
- **Submit Resources**: Authenticated users can submit new resources
- **Airtable Integration**: Submissions stored in Airtable for review/approval
- **User Menu**: Profile dropdown with access to submit form and sign out

## Future Phases

### Phase 3 (Planned)
- Real-time resource syncing with Airtable
- User profiles and activity tracking
- Resource ratings and reviews
- Community upvoting system
- Email notifications for approved submissions
- AI-powered recommendations
- Advanced analytics dashboard
- Resource collections/playlists
- Social sharing features

## Contributing

This is a community project for the Hawaii AI ecosystem. Contributions are welcome!

## License

MIT License - Feel free to use this project as a template for your own resource hubs.

## Acknowledgments

Built for the Hawaii AI community with love from Honolulu.

Special thanks to all the amazing AI tools and resources that make learning and building with AI accessible to everyone!
