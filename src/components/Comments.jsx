"use client";

import { useState, useEffect } from "react";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useRouter } from "next/navigation";

export default function Comments({ productId, comments: initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/userinfo", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newComment,
          rating,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setComments([...comments, data]);
        setNewComment("");
        setRating(0);
      } else {
        const error = await response.json();
        alert(error.error || "خطا در ثبت نظر");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("خطا در ثبت نظر");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">نظرات کاربران</h2>
      
      {/* Comment Form */}
      {!loading && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg">
          {user ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">امتیاز شما</label>
                <Rating value={rating} onChange={(e) => setRating(e.value)} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">نظر شما</label>
                <InputTextarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  className="w-full p-2 border rounded"
                  placeholder="نظر خود را بنویسید..."
                />
              </div>
              <Button
                type="submit"
                label="ثبت نظر"
                className="bg-green-600 text-white"
                disabled={!newComment.trim() || rating === 0}
              />
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">برای ثبت نظر ابتدا وارد حساب کاربری خود شوید</p>
              <Button
                label="ورود به حساب کاربری"
                className="bg-blue-600 text-white"
                onClick={() => router.push("/login")}
              />
            </div>
          )}
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-bold text-gray-800">{comment.username}</span>
                <Rating value={comment.rating} readOnly stars={5} cancel={false} />
              </div>
              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
              </span>
            </div>
            <p className="text-gray-600">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 