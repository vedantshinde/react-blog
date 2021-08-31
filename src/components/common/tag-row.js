import react from "react";

export default function TagRow({ tags, tagColors }) {
  return (
    <div className="tags-container">
      {tags.map((tag, ind) => (
        <span
          key={ind}
          className="tag"
          style={{ backgroundColor: tagColors[ind]}}
        >
          {tag.toUpperCase()}
        </span>
      ))}
    </div>
  );
}
