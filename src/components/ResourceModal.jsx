import { X, ExternalLink, Calendar, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

const ResourceModal = ({ resource, onClose }) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!resource) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 animate-in fade-in zoom-in duration-200"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Featured Badge */}
          {resource.featured && (
            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-sm font-medium rounded-full mb-4">
              <Sparkles className="w-4 h-4 mr-1" fill="currentColor" />
              Featured
            </div>
          )}

          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-400 rounded-xl mb-4 flex items-center justify-center">
            <span className="text-3xl text-white font-bold">
              {resource.title.charAt(0)}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {resource.title}
          </h2>

          {/* Meta Info */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="px-3 py-1 bg-blue-100 text-primary text-sm font-medium rounded-full">
              {resource.type}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full">
              {resource.category}
            </span>
            <div className="flex items-center text-sm text-slate-500">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(resource.submittedDate)}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">Description</h3>
            <p className="text-slate-700 leading-relaxed">
              {resource.description}
            </p>
          </div>

          {/* Local Relevance */}
          {resource.localRelevance && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="text-sm font-semibold text-amber-900 mb-1 flex items-center">
                <span className="mr-1">🌺</span>
                Hawaii Connection
              </h3>
              <p className="text-sm text-amber-800">
                {resource.localRelevance}
              </p>
            </div>
          )}

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          {resource.url && (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center w-full
                px-6 py-3 bg-primary text-white font-semibold rounded-lg
                hover:bg-primary-700 transition-colors
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              "
            >
              Visit Resource
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
