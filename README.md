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

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Hawaii-EdTech-AI-Resources
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navigation with search and sort
│   ├── ResourceCard.jsx    # Individual resource card component
│   ├── FeedGrid.jsx        # Grid layout for resource cards
│   ├── FilterPanel.jsx     # Sidebar filters (desktop)
│   ├── ResourceModal.jsx   # Detail view modal
│   └── SearchBar.jsx       # Search input with Fuse.js
├── data/
│   └── mockResources.json  # 25 sample AI resources
├── utils/
│   └── searchUtils.js      # Fuse.js configuration and utilities
├── hooks/
│   └── useResources.js     # Data management hook
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

## Future Phases

### Phase 2 (Planned)
- Firebase Authentication (Google login)
- Bookmarking functionality
- Airtable API integration
- Resource submission form
- Deployment to Vercel

### Phase 3 (Future)
- AI-powered recommendations
- Resource rating system
- Community contributions
- Advanced analytics

## Contributing

This is a community project for the Hawaii AI ecosystem. Contributions are welcome!

## License

MIT License - Feel free to use this project as a template for your own resource hubs.

## Acknowledgments

Built for the Hawaii AI community with love from Honolulu.

Special thanks to all the amazing AI tools and resources that make learning and building with AI accessible to everyone!
