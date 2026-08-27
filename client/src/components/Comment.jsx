import React from 'react';
import formatDate from '../helpers/formatDate';

const Comment = ({ content, username, createdAt }) => {
  return (
    <div className="py-4 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-gray-800 text-sm">@{username}</span>
        <span className="text-xs text-gray-400">{formatDate(createdAt)}</span>
      </div>
      <p className="text-gray-700 text-base leading-relaxed">{content}</p>
    </div>
  );
};

export default Comment;