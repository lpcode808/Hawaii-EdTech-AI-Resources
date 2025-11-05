import { useState, useRef, useEffect } from 'react';
import { LogIn, LogOut, User, Bookmark, PlusCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserMenu = ({ onSubmitClick }) => {
  const { user, loginWithGoogle, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  if (!user) {
    return (
      <button
        onClick={handleLogin}
        className="
          flex items-center space-x-2 px-4 py-2
          bg-primary text-white rounded-lg
          hover:bg-blue-700 transition-colors
          font-medium text-sm
        "
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Sign In</span>
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center space-x-2 p-2 rounded-lg
          hover:bg-slate-100 transition-colors
        "
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
        <span className="hidden md:inline text-sm font-medium text-slate-700">
          {user.displayName || 'User'}
        </span>
      </button>

      {isOpen && (
        <div className="
          absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg
          border border-slate-200 py-1 z-50
        ">
          <div className="px-4 py-3 border-b border-slate-200">
            <p className="text-sm font-medium text-slate-900">
              {user.displayName}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {user.email}
            </p>
          </div>

          <button
            onClick={onSubmitClick}
            className="
              w-full flex items-center space-x-3 px-4 py-2
              text-sm text-slate-700 hover:bg-slate-50
              transition-colors text-left
            "
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Resource</span>
          </button>

          <button
            onClick={handleLogout}
            className="
              w-full flex items-center space-x-3 px-4 py-2
              text-sm text-slate-700 hover:bg-slate-50
              transition-colors text-left border-t border-slate-200
            "
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
