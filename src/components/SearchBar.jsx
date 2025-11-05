import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Search resources..." }) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          block w-full pl-10 pr-10 py-2.5
          bg-white border border-slate-300 rounded-lg
          text-slate-900 placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          transition-shadow
        "
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
