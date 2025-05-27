"use client";

import { useState, useEffect } from "react";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export default function Comments({ productId, comments: initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const toast = useRef(null);

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

    if (!newComment.trim()) {
      toast.current.show({
        severity: "error",
        summary: "خطا",
        detail: "لطفا متن نظر را وارد کنید",
        life: 3000,
      });
      return;
    }

    if (rating === 0) {
      toast.current.show({
        severity: "error",
        summary: "خطا",
        detail: "لطفا امتیاز را وارد کنید",
        life: 3000,
      });
      return;
    }

    try {
      setSubmitting(true);
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
        toast.current.show({
          severity: "success",
          summary: "موفق",
          detail: "نظر شما با موفقیت ثبت شد",
          life: 3000,
        });
      } else {
        const error = await response.json();
        toast.current.show({
          severity: "error",
          summary: "خطا",
          detail: error.error || "خطا در ثبت نظر",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.current.show({
        severity: "error",
        summary: "خطا",
        detail: "خطا در ثبت نظر",
        life: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">در حال بارگذاری...</div>;
  }

  return (
    <div className="mt-8">
      <Toast ref={toast} />
      <h2 className="text-2xl font-bold mb-4">نظرات کاربران</h2>
      
      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
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
            icon="pi pi-send"
            loading={submitting}
            className="bg-green-600 text-white rounded px-3 py-1"
          />
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-100 rounded">
          برای ثبت نظر، لطفا ابتدا وارد حساب کاربری خود شوید.
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center">هنوز نظری ثبت نشده است</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="font-bold ml-2">{comment.username}</span>
                  <Rating value={comment.rating} readOnly stars={5} cancel={false} />
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 