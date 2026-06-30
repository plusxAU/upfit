"use client";

import { useEffect, useState, useCallback } from "react";

type Review = {
  jobId: string;
  stars: string;
  comment: string;
  name: string;
  suburb: string;
  vehicle: string;
  service: string;
  status: string;
  dateSubmitted: string;
  featureDate: string;
};

type ReviewsData = {
  pending: Review[];
  published: Review[];
};

const cell: React.CSSProperties = {
  fontSize: "12px",
  color: "#888880",
  padding: "2px 0",
};

const label: React.CSSProperties = {
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#555550",
  marginBottom: "2px",
};

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toDatetimeLocal(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function fromDatetimeLocal(value: string): string {
  if (!value) return "";
  return new Date(value).toISOString();
}

function ReviewRow({
  review,
  onMutate,
}: {
  review: Review;
  onMutate: () => void;
}) {
  const [featureDateInput, setFeatureDateInput] = useState(
    toDatetimeLocal(review.featureDate || review.dateSubmitted)
  );
  const [saving, setSaving] = useState(false);
  const [acting, setActing] = useState(false);

  const patch = useCallback(
    async (body: object) => {
      const res = await fetch(`/api/admin/reviews/${review.jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Request failed");
    },
    [review.jobId]
  );

  async function handleApprove() {
    setActing(true);
    try {
      await patch({ status: "published" });
      onMutate();
    } catch {
      alert("Approve failed — check console.");
    } finally {
      setActing(false);
    }
  }

  async function handleUnpublish() {
    setActing(true);
    try {
      await patch({ status: "pending" });
      onMutate();
    } catch {
      alert("Unpublish failed — check console.");
    } finally {
      setActing(false);
    }
  }

  async function handleSaveFeatureDate() {
    setSaving(true);
    try {
      await patch({ featureDate: fromDatetimeLocal(featureDateInput) });
      onMutate();
    } catch {
      alert("Save failed — check console.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (
      !window.confirm(
        `Delete this review from ${review.name}? This cannot be undone.`
      )
    )
      return;
    setActing(true);
    try {
      const res = await fetch(`/api/admin/reviews/${review.jobId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      onMutate();
    } catch {
      alert("Delete failed — check console.");
      setActing(false);
    }
  }

  const isPublished = review.status === "published";

  return (
    <div
      style={{
        background: "#161614",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        padding: "16px 18px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* Top row: stars + name/suburb + vehicle/service */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
        <span style={{ color: "#e8f44a", fontSize: "13px", letterSpacing: "0.1em" }}>
          {"★".repeat(Number(review.stars))}{"☆".repeat(5 - Number(review.stars))}
        </span>
        <span style={{ color: "#f0ede6", fontSize: "13px", fontWeight: 500 }}>
          {review.name}
        </span>
        {review.suburb && (
          <span style={cell}>· {review.suburb}</span>
        )}
        {(review.vehicle || review.service) && (
          <span
            style={{
              fontSize: "11px",
              color: "#444440",
              background: "#232320",
              padding: "2px 7px",
              borderRadius: "4px",
            }}
          >
            {[review.vehicle, review.service].filter(Boolean).join(" · ")}
          </span>
        )}
      </div>

      {/* Comment */}
      {review.comment && (
        <p style={{ fontSize: "13px", color: "#888880", margin: 0, lineHeight: 1.5 }}>
          &ldquo;{review.comment}&rdquo;
        </p>
      )}

      {/* Dates row */}
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        <div>
          <p style={label}>Submitted</p>
          <p style={cell}>{formatDate(review.dateSubmitted)}</p>
        </div>
        <div>
          <p style={label}>Job ID</p>
          <p style={{ ...cell, fontFamily: "monospace", fontSize: "11px" }}>{review.jobId}</p>
        </div>
      </div>

      {/* Feature date editor */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", flexWrap: "wrap" }}>
        <div>
          <p style={label}>Feature date {isPublished ? "(sets carousel order)" : "(set on publish)"}</p>
          <input
            type="datetime-local"
            value={featureDateInput}
            onChange={(e) => setFeatureDateInput(e.target.value)}
            style={{
              background: "#0f0f0d",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "6px",
              color: "#f0ede6",
              fontSize: "12px",
              padding: "6px 10px",
              outline: "none",
              colorScheme: "dark",
            }}
          />
        </div>
        <button
          onClick={handleSaveFeatureDate}
          disabled={saving}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: "6px",
            color: "#888880",
            fontSize: "12px",
            padding: "6px 12px",
            cursor: "pointer",
            opacity: saving ? 0.5 : 1,
          }}
        >
          {saving ? "Saving…" : "Save date"}
        </button>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", paddingTop: "4px" }}>
        {!isPublished && (
          <button
            onClick={handleApprove}
            disabled={acting}
            style={{
              background: "#e8f44a",
              color: "#0f0f0d",
              border: "none",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              padding: "7px 14px",
              cursor: "pointer",
              opacity: acting ? 0.5 : 1,
            }}
          >
            {acting ? "…" : "Approve & publish"}
          </button>
        )}
        {isPublished && (
          <button
            onClick={handleUnpublish}
            disabled={acting}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "6px",
              color: "#888880",
              fontSize: "12px",
              padding: "7px 14px",
              cursor: "pointer",
              opacity: acting ? 0.5 : 1,
            }}
          >
            {acting ? "…" : "Unpublish"}
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={acting}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,80,80,0.3)",
            borderRadius: "6px",
            color: "#cc4444",
            fontSize: "12px",
            padding: "7px 14px",
            cursor: "pointer",
            opacity: acting ? 0.5 : 1,
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function Section({
  title,
  reviews,
  onMutate,
  empty,
}: {
  title: string;
  reviews: Review[];
  onMutate: () => void;
  empty: string;
}) {
  return (
    <div style={{ marginBottom: "48px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <p style={{ color: "#f0ede6", fontSize: "14px", fontWeight: 500, margin: 0 }}>
          {title}
        </p>
        <span
          style={{
            fontSize: "11px",
            background: "rgba(255,255,255,0.07)",
            color: "#666660",
            padding: "2px 8px",
            borderRadius: "4px",
          }}
        >
          {reviews.length}
        </span>
      </div>
      {reviews.length === 0 ? (
        <p style={{ fontSize: "13px", color: "#444440" }}>{empty}</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {reviews.map((r) => (
            <ReviewRow key={r.jobId} review={r} onMutate={onMutate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReviewsAdmin() {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      if (!res.ok) throw new Error("Fetch failed");
      setData(await res.json());
    } catch {
      setError("Failed to load reviews.");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (error) {
    return <p style={{ color: "#e8f44a", fontSize: "13px" }}>{error}</p>;
  }

  if (!data) {
    return <p style={{ color: "#444440", fontSize: "13px" }}>Loading…</p>;
  }

  return (
    <div>
      <Section
        title="Published"
        reviews={data.published}
        onMutate={load}
        empty="No published reviews."
      />
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginBottom: "48px" }} />
      <Section
        title="Pending moderation"
        reviews={data.pending}
        onMutate={load}
        empty="No pending reviews."
      />
    </div>
  );
}
