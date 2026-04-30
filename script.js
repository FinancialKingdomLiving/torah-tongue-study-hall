document.addEventListener("DOMContentLoaded", () => {
  const wordCount = document.getElementById("wordCount");
  const verbCount = document.getElementById("verbCount");

  if (wordCount) {
    wordCount.innerText = WORDS.length;
  }

  if (verbCount) {
    verbCount.innerText = VERBS.length;
  }

  const lexiconList = document.getElementById("lexiconList");
  if (lexiconList) {
    WORDS.forEach(word => {
      const item = document.createElement("div");
      item.className = "card";
      item.innerHTML = `
        <h3>${word.hebrew}</h3>
        <p>${word.translit}</p>
        <p>${word.meaning}</p>
      `;
      lexiconList.appendChild(item);
    });
  }

  const verbList = document.getElementById("verbList");
  if (verbList) {
    VERBS.forEach(verb => {
      const item = document.createElement("div");
      item.className = "card";
      item.innerHTML = `
        <h3>${verb.hebrew}</h3>
        <p>${verb.translit}</p>
        <p>${verb.meaning}</p>
        <p>${verb.stem}</p>
      `;
      verbList.appendChild(item);
    });
  }
});
