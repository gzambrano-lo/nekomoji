const kaomojiEntries = [
  { face: "(-‿‿-)", mood: "happy", tags: ["smile", "soft"] },
  { face: "(/◕ヮ◕)/ .:*☆", mood: "happy", tags: ["sparkle", "joy"] },
  { face: "\\(ˆ▽ˆ)/", mood: "happy", tags: ["cheer", "wave"] },
  { face: "(＾◡＾)✿", mood: "happy", tags: ["flower", "cute"] },
  { face: "(*^▽^*)", mood: "happy", tags: ["bright", "cute"] },
  { face: "(｡•ᴗ•｡)", mood: "happy", tags: ["small", "cute"] },
  { face: "ヽ(✿ﾟ▽ﾟ)ノ", mood: "happy", tags: ["celebrate", "flower"] },
  { face: "(ʕ•ᴥ•ʔ)", mood: "happy", tags: ["bear", "cute"] },
  { face: "(╥﹏╥)", mood: "sad", tags: ["cry", "tears"] },
  { face: "('；ω；`)", mood: "sad", tags: ["upset", "tears"] },
  { face: "｡ﾟ(ﾟ´Д｀ﾟ)ﾟ｡", mood: "sad", tags: ["meltdown", "cry"] },
  { face: "(︶︹︺)", mood: "sad", tags: ["gloom", "down"] },
  { face: "(っ˘̩╭╮˘̩)っ", mood: "sad", tags: ["hug", "cry"] },
  { face: "(-_-。)", mood: "sad", tags: ["quiet", "blue"] },
  { face: "(♡▽♡)", mood: "love", tags: ["heart", "crush"] },
  { face: "(´∀｀)♡", mood: "love", tags: ["warm", "sweet"] },
  { face: "♡(▽˶˃ ᵕ ˂˶)♡", mood: "love", tags: ["adoring", "cute"] },
  { face: "(≧◡≦) ♡", mood: "love", tags: ["happy", "romantic"] },
  { face: "(/▿＼ )♡", mood: "love", tags: ["bashful", "crush"] },
  { face: "(╬ಠ益ಠ)", mood: "angry", tags: ["mad", "fight"] },
  { face: "(/ಠ益ಠ)/彡┻━┻", mood: "angry", tags: ["tableflip", "rage"] },
  { face: "( `ε´ )", mood: "angry", tags: ["pout", "annoyed"] },
  { face: "(#`皿´)", mood: "angry", tags: ["grr", "mad"] },
  { face: "Ψ(▼▽▼)Ψ", mood: "angry", tags: ["chaos", "devil"] },
  { face: "(ง •̀_•́)ง", mood: "angry", tags: ["ready", "fight"] },
  { face: "//ω\\\\", mood: "embarrassed", tags: ["blush", "shy"] },
  { face: "(*／▽＼*)", mood: "embarrassed", tags: ["flustered", "cute"] },
  { face: "(/ /•/▽/•/ /)", mood: "embarrassed", tags: ["bashful", "blush"] },
  { face: "(。•́︿•̀。)", mood: "embarrassed", tags: ["awkward", "tiny"] },
  { face: "(⊙_⊙)", mood: "surprised", tags: ["shock", "blank"] },
  { face: "Σ(O_O;)", mood: "surprised", tags: ["gasp", "alarm"] },
  { face: "(/°o°)/", mood: "surprised", tags: ["whoa", "shock"] },
  { face: "(°o°)", mood: "surprised", tags: ["stunned", "small"] },
  { face: "W(°ｏ°)W", mood: "surprised", tags: ["big shock", "whoa"] },
  { face: "(⸝⸝⸝>﹏<⸝⸝⸝)", mood: "nervous", tags: ["stress", "shaky"] },
  { face: "(；⌣̀_⌣́)", mood: "nervous", tags: ["tense", "uneasy"] },
  { face: "(・・;)", mood: "nervous", tags: ["awkward", "sweat"] },
  { face: "(¬､¬)", mood: "sleepy", tags: ["tired", "drowsy"] },
  { face: "(-_-) zzz", mood: "sleepy", tags: ["night", "nap"] },
  { face: "(￣o￣) zzZZzzZZ", mood: "sleepy", tags: ["sleep", "yawn"] },
  { face: "(￣︿￣)", mood: "smug", tags: ["hm", "attitude"] },
  { face: "(￢‿￢ )", mood: "smug", tags: ["sly", "side eye"] },
  { face: "(￣ー￣)", mood: "smug", tags: ["confident", "cool"] },
  { face: "ヾ(＾-＾)ノ", mood: "waving", tags: ["hello", "greeting"] },
  { face: "(´• ω •`)ﾉ", mood: "waving", tags: ["small wave", "cute"] },
  { face: "(* ^ ω ^)", mood: "cat", tags: ["kitty", "cute"] },
  { face: "(=^･ω･^=)", mood: "cat", tags: ["cat", "classic"] },
  { face: "(=｀ω´=)", mood: "cat", tags: ["cat", "mischief"] },
  { face: "(・_・;)", mood: "confused", tags: ["uh", "lost"] },
  { face: "(◎ ◎)", mood: "confused", tags: ["dizzy", "blank"] },
  { face: "(?_?)", mood: "confused", tags: ["question", "huh"] },
];

const searchInput = document.querySelector("#kaomoji-search");
const pillsContainer = document.querySelector("#category-pills");
const grid = document.querySelector("#kaomoji-grid");
const totalLabel = document.querySelector("#library-total");
const openSubmitModalButton = document.querySelector("#open-submit-modal");
const closeSubmitModalButton = document.querySelector("#close-submit-modal");
const cancelSubmitModalButton = document.querySelector("#cancel-submit-modal");
const submitModal = document.querySelector("#submit-modal");
const submitForm = document.querySelector("#submit-form");
const submitFaceInput = document.querySelector("#submit-face");
const submitMoodInput = document.querySelector("#submit-mood");
const submitTagsInput = document.querySelector("#submit-tags");
const submitNoteInput = document.querySelector("#submit-note");
const submitFeedback = document.querySelector("#submit-feedback");
const submitFormButton = document.querySelector("#submit-form-button");
const turnstileInputSelector = "[name='cf-turnstile-response']";

const preferredOrder = [
  "all",
  "happy",
  "sad",
  "love",
  "angry",
  "embarrassed",
  "surprised",
  "nervous",
  "crying",
  "confused",
  "sleepy",
  "smug",
  "waving",
  "cat",
];

const availableMoods = [...new Set(kaomojiEntries.map((entry) => entry.mood))];
const categories = preferredOrder.filter((category) => category === "all" || availableMoods.includes(category));
let activeCategory = "all";

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function matchesSearch(entry, query) {
  if (!query) {
    return true;
  }

  const haystack = [entry.face, entry.mood, ...entry.tags].join(" ").toLowerCase();
  return haystack.includes(query);
}

function getVisibleEntries() {
  const query = searchInput.value.trim().toLowerCase();
  return kaomojiEntries.filter((entry) => {
    const matchesCategory = activeCategory === "all" || entry.mood === activeCategory;
    return matchesCategory && matchesSearch(entry, query);
  });
}

function createPill(category) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `pill${category === activeCategory ? " active" : ""}`;
  button.dataset.tone = category;
  button.textContent = category;
  button.addEventListener("click", () => {
    activeCategory = category;
    renderPills();
    renderGrid();
  });
  return button;
}

function renderPills() {
  pillsContainer.replaceChildren(...categories.map(createPill));
}

function renderMoodOptions() {
  const moodOptions = categories
    .filter((category) => category !== "all")
    .map((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = titleCase(category);
      return option;
    });

  submitMoodInput.append(...moodOptions);
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const fallback = document.createElement("textarea");
    fallback.value = value;
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand("copy");
    fallback.remove();
  }
}

function flashCard(card) {
  const chip = card.querySelector(".card-chip");
  const previous = chip.textContent;
  chip.textContent = "copied";
  window.setTimeout(() => {
    chip.textContent = previous;
  }, 1200);
}

function buildCard(entry) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "kaomoji-card";
  card.dataset.tone = entry.mood;
  card.setAttribute("aria-label", `Copy ${entry.face}`);
  card.innerHTML = `
    <span class="card-expression">${entry.face}</span>
    <span class="card-chip">${titleCase(entry.mood)}</span>
  `;

  card.addEventListener("click", async () => {
    await copyText(entry.face);
    flashCard(card);
  });

  return card;
}

function updateTotal(visibleCount) {
  totalLabel.textContent = `✦ ${visibleCount} kaomoji total`;
}

function renderGrid() {
  const visibleEntries = getVisibleEntries();
  updateTotal(visibleEntries.length);

  if (visibleEntries.length === 0) {
    grid.innerHTML = `
      <div class="gallery-empty">
        No kaomoji matched that search. Try a broader mood or keyword.
      </div>
    `;
    return;
  }

  grid.replaceChildren(...visibleEntries.map(buildCard));
}

searchInput.addEventListener("input", renderGrid);

function resetTurnstile() {
  if (window.turnstile) {
    window.turnstile.reset();
  }
}

function getTurnstileToken() {
  return document.querySelector(turnstileInputSelector)?.value?.trim() || "";
}

function openSubmitModal() {
  submitModal.hidden = false;
  document.body.style.overflow = "hidden";
  submitFaceInput.focus();
}

function closeSubmitModal() {
  submitModal.hidden = true;
  document.body.style.overflow = "";
  submitForm.reset();
  clearFeedback();
  resetTurnstile();
}

function setFeedback(message, state = "") {
  submitFeedback.textContent = message;
  submitFeedback.className = `form-feedback${state ? ` is-${state}` : ""}`;
}

function clearFeedback() {
  setFeedback("");
}

function normalizeTags(rawValue) {
  return rawValue
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 8);
}

function isDuplicateFace(face) {
  return kaomojiEntries.some((entry) => entry.face === face);
}

function validateSubmission(payload) {
  const turnstileToken = getTurnstileToken();

  if (!payload.face) {
    return "Enter a kaomoji first.";
  }

  if (payload.face.length > 80) {
    return "Keep the kaomoji under 80 characters.";
  }

  if (!payload.mood) {
    return "Choose a mood for moderation.";
  }

  if (isDuplicateFace(payload.face)) {
    return "That kaomoji is already in the library.";
  }

  if (!turnstileToken) {
    return "Complete the Turnstile check before submitting.";
  }

  return "";
}

async function submitKaomojiSuggestion(payload) {
  const turnstileToken = getTurnstileToken();

  const response = await fetch(
    "https://nekomoji-submissions.gzamlo98.workers.dev/api/submissions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        turnstileToken,
        "cf-turnstile-response": turnstileToken,
      }),
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

async function handleSubmit(event) {
  event.preventDefault();
  clearFeedback();

  const payload = {
    face: submitFaceInput.value.trim(),
    mood: submitMoodInput.value,
    tags: normalizeTags(submitTagsInput.value),
    note: submitNoteInput.value.trim(),
    status: "pending",
  };

  const validationError = validateSubmission(payload);
  if (validationError) {
    setFeedback(validationError, "error");
    return;
  }

  submitFormButton.disabled = true;
  submitFormButton.textContent = "Sending...";

  try {
    await submitKaomojiSuggestion(payload);
    setFeedback("Submission received. It is now pending moderation.", "success");
    window.setTimeout(() => {
      closeSubmitModal();
    }, 900);
  } catch (error) {
    setFeedback(error.message || "Submission failed.", "error");
    resetTurnstile();
  } finally {
    submitFormButton.disabled = false;
    submitFormButton.textContent = "Send for review";
  }
}

openSubmitModalButton?.addEventListener("click", openSubmitModal);
closeSubmitModalButton.addEventListener("click", closeSubmitModal);
cancelSubmitModalButton.addEventListener("click", closeSubmitModal);
submitModal.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement && event.target.dataset.closeModal === "true") {
    closeSubmitModal();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !submitModal.hidden) {
    closeSubmitModal();
  }
});
submitForm.addEventListener("submit", handleSubmit);

renderPills();
renderMoodOptions();
renderGrid();
