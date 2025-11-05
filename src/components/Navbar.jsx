import { Sparkles, ArrowUpDown } from 'lucide-react';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const Navbar = ({ searchQuery, onSearchChange, sortBy, onSortChange, resourceCount, onSubmitClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Hawaii AI Resources
              </h1>
              <p className="text-xs text-slate-500">
                {resourceCount} {resourceCount === 1 ? 'resource' : 'resources'}
              </p>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search resources..."
            />
          </div>

          {/* Sort Dropdown & User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="w-4 h-4 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="
                  px-3 py-2 bg-white border border-slate-300 rounded-lg
                  text-sm font-medium text-slate-700
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  cursor-pointer
                "
              >
                <option value="recent">Recent</option>
                <option value="random">Random</option>
              </select>
            </div>
            <UserMenu onSubmitClick={onSubmitClick} />
          </div>
        </div>

        {/* Search Bar (Mobile) */}
        <div className="md:hidden pb-4">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search resources..."
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
