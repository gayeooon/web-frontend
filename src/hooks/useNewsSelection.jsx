import { useState } from 'react';

const useNewsSelection = () => {
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleNewsClick = (articleId) => {
    setSelectedArticleId(articleId);
    setIsOpen(true);
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      setSelectedArticleId(null);
    }
  };

  return {
    selectedArticleId,
    isOpen,
    handleNewsClick,
    handleOpenChange,
  };
};

export default useNewsSelection;
