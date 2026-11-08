function LessonVisual({
  type = "image",
  src,
  alt,
  caption,
  children
}) {
  return (
    <figure className={`lesson-visual lesson-visual-${type}`}>

      {src ? (
        <img
          src={src}
          alt={alt || "Lesson visual"}
        />
      ) : (
        children
      )}

      {caption && (
        <figcaption className="lesson-visual-caption">
          {caption}
        </figcaption>
      )}

    </figure>
  );
}

export default LessonVisual;