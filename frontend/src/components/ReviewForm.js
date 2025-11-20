import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ onSubmit, onCancel }) => {
  const [reviewBody, setReviewBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewBody.trim()) {
      alert('Molimo unesite tekst recenzije.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(reviewBody);
      setReviewBody('');
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="review-form-group">
        <label htmlFor="reviewBody" className="review-form-label">
          Vaša recenzija:
        </label>
        <textarea
          id="reviewBody"
          value={reviewBody}
          onChange={(e) => setReviewBody(e.target.value)}
          className="review-form-textarea"
          placeholder="Podelite svoje mišljenje o filmu..."
          rows="5"
          disabled={isSubmitting}
        />
      </div>
      <div className="review-form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="review-form-cancel"
          disabled={isSubmitting}
        >
          Otkaži
        </button>
        <button
          type="submit"
          className="review-form-submit"
          disabled={isSubmitting || !reviewBody.trim()}
        >
          {isSubmitting ? 'Šalje se...' : 'Pošalji Recenziju'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;

