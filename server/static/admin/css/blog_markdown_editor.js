document.addEventListener("DOMContentLoaded", () => {
  if (typeof SimpleMDE === "undefined") return;

  document.querySelectorAll("textarea.markdown-editor").forEach((textarea) => {
    if (textarea.dataset.markdownReady) return;

    textarea.dataset.markdownReady = "true";
    new SimpleMDE({
      element: textarea,
      spellChecker: false,
      status: false,
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
        "table",
        "code",
        "horizontal-rule",
        "|",
        "preview",
        "side-by-side",
        "fullscreen",
      ],
    });
  });
});
