"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MakeReviewProps {
  onClose: () => void;
}

function MakeReview({ onClose }: MakeReviewProps) {
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Review submitted:", { text, rating });
  };

  return createPortal(
    <div className="fixed z-[50000] inset-0 flex justify-center items-center bg-blur bg-opacity-50 backdrop-blur-sm px-6 sm:px-0">
      <div className="relative w-full max-w-md bg-white rounded-xl p-6 shadow-lg text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold focus:outline-none cursor-pointer"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review..."
          className="w-full border border-gray-300 rounded-md p-2 mb-4 resize-none"
          rows={4}
        />

        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="text-2xl cursor-pointer"
            >
              {star <= rating ? "★" : "☆"}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-white hover:text-black border border-black transition cursor-pointer"
        >
          Submit Review
        </button>

        {submitted && (
          <p className="text-green-600 font-medium mt-4">Review submitted!</p>
        )}
      </div>
    </div>,
    document.body
  );
}

export default MakeReview;
