import { useState, useEffect, useCallback } from 'react';
import {
  MessageSquare,
  Send,
  Edit3,
  Trash2,
  X,
  Check,
  RefreshCw,
  Clock,
} from 'lucide-react';
import { api } from '../services/api';
import { GuestbookEntry } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ name: '', message: '' });

  // Delete confirmation
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getGuestbookEntries();
      setEntries(data);
    } catch (err) {
      console.error('Failed to load entries:', err);
      setError('Failed to load guestbook entries. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    try {
      setSubmitting(true);
      setError(null);
      await api.createGuestbookEntry({
        name: formData.name.trim(),
        message: formData.message.trim(),
      });
      setFormData({ name: '', message: '' });
      showSuccess('Your message has been added to the guestbook!');
      await loadEntries();
    } catch (err) {
      console.error('Failed to create entry:', err);
      setError('Failed to add your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (entry: GuestbookEntry) => {
    setEditingId(entry.id);
    setEditData({ name: entry.name, message: entry.message });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ name: '', message: '' });
  };

  const handleUpdate = async (id: number) => {
    if (!editData.name.trim() || !editData.message.trim()) return;

    try {
      setSubmitting(true);
      setError(null);
      await api.updateGuestbookEntry(id, {
        name: editData.name.trim(),
        message: editData.message.trim(),
      });
      showSuccess('Entry updated successfully!');
      cancelEdit();
      await loadEntries();
    } catch (err) {
      console.error('Failed to update entry:', err);
      setError('Failed to update the entry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setSubmitting(true);
      setError(null);
      await api.deleteGuestbookEntry(id);
      setDeletingId(null);
      showSuccess('Entry deleted successfully!');
      await loadEntries();
    } catch (err) {
      console.error('Failed to delete entry:', err);
      setError('Failed to delete the entry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-cyan-500 mb-4">
            <MessageSquare size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="text-gradient">Guestbook</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Leave a message! I&apos;d love to hear from you.
          </p>
        </header>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-center animate-slide-down">
            <Check size={18} className="inline mr-2" />
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center animate-slide-down">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-2 text-red-300 hover:text-white"
            >
              <X size={16} className="inline" />
            </button>
          </div>
        )}

        {/* Sign Guestbook Form */}
        <section className="card p-6 mb-8 animate-slide-up">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Send size={20} className="text-primary-400" />
            Sign the Guestbook
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="input"
                required
                minLength={2}
                maxLength={100}
                disabled={submitting}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write something nice..."
                className="input min-h-[120px] resize-y"
                required
                minLength={1}
                maxLength={1000}
                disabled={submitting}
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
              disabled={submitting || !formData.name.trim() || !formData.message.trim()}
            >
              {submitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  Signing...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Sign Guestbook
                </>
              )}
            </button>
          </form>
        </section>

        {/* Entries List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-300">
              Messages ({entries.length})
            </h2>
            <button
              onClick={loadEntries}
              className="btn-ghost flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="card p-12 text-center">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-slate-400">Loading messages...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="card p-12 text-center">
              <MessageSquare size={48} className="mx-auto text-slate-600 mb-4" />
              <p className="text-slate-400 text-lg">No messages yet.</p>
              <p className="text-slate-500">Be the first to sign the guestbook!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <article
                  key={entry.id}
                  className="card p-5 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {editingId === entry.id ? (
                    /* Edit Mode */
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="input"
                        placeholder="Name"
                        disabled={submitting}
                      />
                      <textarea
                        value={editData.message}
                        onChange={(e) => setEditData({ ...editData, message: e.target.value })}
                        className="input min-h-[100px] resize-y"
                        placeholder="Message"
                        disabled={submitting}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(entry.id)}
                          className="btn-primary flex items-center gap-1"
                          disabled={submitting || !editData.name.trim() || !editData.message.trim()}
                        >
                          {submitting ? <LoadingSpinner size="sm" /> : <Check size={16} />}
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="btn-secondary flex items-center gap-1"
                          disabled={submitting}
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : deletingId === entry.id ? (
                    /* Delete Confirmation */
                    <div className="space-y-3">
                      <p className="text-slate-300">
                        Are you sure you want to delete this message?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="btn-danger flex items-center gap-1"
                          disabled={submitting}
                        >
                          {submitting ? <LoadingSpinner size="sm" /> : <Trash2 size={16} />}
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="btn-secondary flex items-center gap-1"
                          disabled={submitting}
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500/20 to-cyan-500/20 flex items-center justify-center text-primary-400 font-bold">
                            {entry.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{entry.name}</h3>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                              <Clock size={12} />
                              {formatDate(entry.created_at)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEdit(entry)}
                            className="p-2 text-slate-500 hover:text-primary-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => setDeletingId(entry.id)}
                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="mt-3 text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {entry.message}
                      </p>
                    </>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
