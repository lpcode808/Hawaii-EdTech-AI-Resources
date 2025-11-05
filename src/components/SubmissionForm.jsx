import { useState } from 'react';
import { X, Send, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CATEGORIES = [
  'Development Tools',
  'Learning Resources',
  'Research Papers',
  'Datasets',
  'Community',
];

const TYPES = [
  'Tool',
  'Course',
  'Documentation',
  'Article',
  'Video',
  'Library',
  'Dataset',
  'Other',
];

const SubmissionForm = ({ isOpen, onClose, onSubmit }) => {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    type: 'Tool',
    tags: '',
    category: 'Development Tools',
    imageUrl: '',
    localRelevance: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Parse tags from comma-separated string
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const submission = {
        ...formData,
        tags,
        submittedBy: user.email,
        submittedByName: user.displayName,
        submittedDate: new Date().toISOString(),
      };

      await onSubmit(submission);

      // Reset form
      setFormData({
        title: '',
        description: '',
        url: '',
        type: 'Tool',
        tags: '',
        category: 'Development Tools',
        imageUrl: '',
        localRelevance: '',
      });

      onClose();
    } catch (error) {
      console.error('Error submitting resource:', error);
      alert('Failed to submit resource. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-slate-900 bg-opacity-50"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="
          relative inline-block w-full max-w-2xl overflow-hidden text-left
          align-bottom bg-white rounded-lg shadow-xl transform transition-all
          sm:my-8 sm:align-middle
        ">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">
              Submit a Resource
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., LangChain Documentation"
                className="
                  w-full px-3 py-2 border border-slate-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                "
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                URL *
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
                placeholder="https://..."
                className="
                  w-full px-3 py-2 border border-slate-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                "
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Describe what this resource is and why it's useful..."
                className="
                  w-full px-3 py-2 border border-slate-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  resize-none
                "
              />
            </div>

            {/* Type and Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="
                    w-full px-3 py-2 border border-slate-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  "
                >
                  {TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="
                    w-full px-3 py-2 border border-slate-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  "
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="AI, Machine Learning, Python (comma-separated)"
                className="
                  w-full px-3 py-2 border border-slate-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                "
              />
              <p className="mt-1 text-xs text-slate-500">
                Separate multiple tags with commas
              </p>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Image URL (optional)
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="
                  w-full px-3 py-2 border border-slate-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                "
              />
            </div>

            {/* Local Relevance */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Hawaii Connection (optional)
              </label>
              <input
                type="text"
                name="localRelevance"
                value={formData.localRelevance}
                onChange={handleChange}
                placeholder="e.g., Created by UH researcher, Hawaii-based company..."
                className="
                  w-full px-3 py-2 border border-slate-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                "
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="
                  px-4 py-2 border border-slate-300 rounded-lg
                  text-sm font-medium text-slate-700
                  hover:bg-slate-50 transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="
                  px-4 py-2 bg-primary text-white rounded-lg
                  text-sm font-medium
                  hover:bg-blue-700 transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center space-x-2
                "
              >
                {submitting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Resource</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmissionForm;
