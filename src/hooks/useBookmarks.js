import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

export const useBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setBookmarks(new Set());
      setLoading(false);
      return;
    }

    loadBookmarks();
  }, [user]);

  const loadBookmarks = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const bookmarksRef = collection(db, 'bookmarks');
      const q = query(bookmarksRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const userBookmarks = new Set();
      querySnapshot.forEach((doc) => {
        userBookmarks.add(doc.data().resourceId);
      });

      setBookmarks(userBookmarks);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addBookmark = async (resourceId) => {
    if (!user) {
      alert('Please sign in to bookmark resources');
      return;
    }

    try {
      const bookmarkId = `${user.uid}_${resourceId}`;
      const bookmarkRef = doc(db, 'bookmarks', bookmarkId);

      await setDoc(bookmarkRef, {
        userId: user.uid,
        resourceId,
        createdAt: new Date().toISOString(),
      });

      setBookmarks((prev) => new Set([...prev, resourceId]));
    } catch (error) {
      console.error('Error adding bookmark:', error);
      alert('Failed to add bookmark. Please try again.');
    }
  };

  const removeBookmark = async (resourceId) => {
    if (!user) return;

    try {
      const bookmarkId = `${user.uid}_${resourceId}`;
      const bookmarkRef = doc(db, 'bookmarks', bookmarkId);

      await deleteDoc(bookmarkRef);

      setBookmarks((prev) => {
        const newBookmarks = new Set(prev);
        newBookmarks.delete(resourceId);
        return newBookmarks;
      });
    } catch (error) {
      console.error('Error removing bookmark:', error);
      alert('Failed to remove bookmark. Please try again.');
    }
  };

  const toggleBookmark = async (resourceId) => {
    if (bookmarks.has(resourceId)) {
      await removeBookmark(resourceId);
    } else {
      await addBookmark(resourceId);
    }
  };

  const isBookmarked = (resourceId) => {
    return bookmarks.has(resourceId);
  };

  return {
    bookmarks,
    loading,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
  };
};
