let currentTest = "ECAT";
let currentQuestions = [];
let mockTimer = null;
let timeLeft = 300;
let mockAnswers = [];

const $ = (id) => document.getElementById(id);

const toast = (msg) => {
  const el = $("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2200);
};

document.addEventListener("DOMContentLoaded", () => {
  $("year").textContent = new Date().getFullYear();
  renderTestCards();
  renderUniversityDirectory("ALL");
  bindEvents();
  updateProgress();

  if (localStorage.getItem("entryprep-dark") === "1") {
    document.body.classList.add("dark");
  }
});

function bindEvents() {
  $("menuBtn").onclick = () => {
    const nav = $("navMenu");
    nav.classList.toggle("show");
    $("menuBtn").setAttribute(
      "aria-expanded",
      nav.classList.contains("show")
    );
  };

  $("themeBtn").onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "entryprep-dark",
      document.body.classList.contains("dark") ? "1" : "0"
    );
  };

  $("closeDash").onclick = closeDashboard;
  $("heroAiBtn").onclick = openAI;
  $("bannerAiBtn").onclick = openAI;
  $("closeAi").onclick = closeAI;
  $("sendAi").onclick = sendAI;

  $("resetProgress").onclick = () => {
    if (confirm("Reset all local progress?")) {
      localStorage.removeItem("entryprep-attempts");
      localStorage.removeItem("entryprep-scores");
      localStorage.removeItem("entryprep-questions");

      updateProgress();
      toast("Progress reset.");
    }
  };

  $("searchBtn").onclick = runSearch;

  $("globalSearch").addEventListener("keydown", (e) => {
    if (e.key === "Enter") runSearch();
  });

  document.querySelectorAll(".filter").forEach((btn) => {
    btn.onclick = () => {
      document
        .querySelectorAll(".filter")
        .forEach((x) => x.classList.remove("active"));

      btn.classList.add("active");
      renderUniversityDirectory(btn.dataset.filter);
    };
  });

  document.querySelectorAll(".side-nav button").forEach((btn) => {
    btn.onclick = () => showPanel(btn.dataset.panel);
  });

  document.querySelectorAll("[data-ai]").forEach((btn) => {
    btn.onclick = () => {
      $("aiInput").value = btn.dataset.ai;
      $("aiInput").focus();
    };
  });

  $("aiInput").addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      sendAI();
    }
  });
}

function renderTestCards() {
  $("testCards").innerHTML = Object.entries(ENTRY_DATA)
    .map(
      ([key, data]) => `
      <article class="test-card">
        <div class="test-icon">${data.icon}</div>
        <span class="eyebrow">${key}</span>
        <h3>${data.title}</h3>
        <p>${data.description}</p>

        <div class="subject-tags">
          ${data.subjects
            .map((s) => `<span class="tag">${s}</span>`)
            .join("")}
        </div>

        <button class="btn primary" onclick="openDashboard('${key}')">
          Open ${key} →
        </button>
      </article>
    `
    )
    .join("");
}

function renderUniversityDirectory(filter) {
  const items = [];

  for (const [test, data] of Object.entries(ENTRY_DATA)) {
    if (filter !== "ALL" && filter !== test) continue;

    data.universities.forEach((u) => {
      items.push({ test, u });
    });
  }

  $("universityGrid").innerHTML = items
    .map(
      ({ test, u }) => `
      <article class="university-card">
        <span class="tag">${test}</span>
        <h3>${u[0]}</h3>
        <p>📍 ${u[1]}</p>
        <p>🎓 ${u[2]}</p>

        <a
          class="official"
          href="${u[3]}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official website ↗
        </a>
      </article>
    `
    )
    .join("");
}

function openDashboard(test) {
  currentTest = test;

  const data = ENTRY_DATA[test];

  $("dashboard").classList.remove("hidden");

  $("dashEyebrow").textContent = `${test} PREPARATION`;
  $("dashTitle").textContent = `${data.title} Dashboard`;

  renderOverview();
  renderUniversities();
  renderSyllabus();
  renderPapers();
  renderMCQs();
  renderMock();

  showPanel("overview");

  $("dashboard").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function closeDashboard() {
  $("dashboard").classList.add("hidden");
  stopTimer();
}

function showPanel(panel) {
  document
    .querySelectorAll(".dash-panel")
    .forEach((p) => p.classList.add("hidden"));

  $(`panel-${panel}`).classList.remove("hidden");

  document.querySelectorAll(".side-nav button").forEach((b) => {
    b.classList.toggle("active", b.dataset.panel === panel);
  });

  if (panel === "mock") {
    renderMock();
  }
}

function renderOverview() {
  const d = ENTRY_DATA[currentTest];

  $("panel-overview").innerHTML = `
    <h3>${d.title} preparation</h3>

    <p>${d.description}</p>

    <div class="overview-grid">

      <div class="metric">
        <strong>${d.subjects.length}</strong>
        <span>Subjects</span>
      </div>

      <div class="metric">
        <strong>${Object.values(d.syllabus).flat().length}</strong>
        <span>Syllabus topics</span>
      </div>

      <div class="metric">
        <strong>${d.questions.length}</strong>
        <span>Starter MCQs</span>
      </div>

    </div>

    <p style="margin-top:18px;color:var(--muted)">
      Use the tabs to move from syllabus → practice → mock test.
      Current admission information should always be verified from
      official sources.
    </p>
  `;
}

function renderUniversities() {
  const d = ENTRY_DATA[currentTest];

  $("panel-universities").innerHTML = `
    <h3>Universities for ${currentTest}</h3>

    <div
      class="university-grid"
      style="margin-top:15px"
    >

      ${d.universities
        .map(
          (u) => `
        <article class="university-card">

          <h3>${u[0]}</h3>

          <p>📍 ${u[1]}</p>

          <p>🎓 ${u[2]}</p>

          <a
            class="official"
            href="${u[3]}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Official website ↗
          </a>

        </article>
      `
        )
        .join("")}

    </div>
  `;
}

function renderSyllabus() {
  const d = ENTRY_DATA[currentTest];

  $("panel-syllabus").innerHTML = `
    <h3>${currentTest} syllabus sequence</h3>

    ${Object.entries(d.syllabus)
      .map(
        ([subject, topics]) => `
        <div class="syllabus-group">

          <h4>${subject}</h4>

          <div class="syllabus-row">

            ${topics
              .map(
                (t, i) =>
                  `<span class="syllabus-item">${i + 1}. ${t}</span>`
              )
              .join("")}

          </div>

        </div>
      `
      )
      .join("")}
  `;
}

function renderPapers() {
  const d = ENTRY_DATA[currentTest];

  $("panel-papers").innerHTML = `
    <h3>Past-paper & official resources</h3>

    <p style="color:var(--muted)">
      These are links to official admissions/resources.
      Do not treat third-party or unverified material as
      an official past paper.
    </p>

    ${d.papers
      .map(
        (p) => `
        <div class="paper">

          <span>${p[0]}</span>

          <a
            href="${p[1]}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open ↗
          </a>

        </div>
      `
      )
      .join("")}
  `;
}

function renderMCQs() {
  const d = ENTRY_DATA[currentTest];

  $("panel-mcqs").innerHTML = `
    <h3>Practice MCQs</h3>

    <p style="color:var(--muted)">
      Tap an option to check your answer.
    </p>

    ${d.questions
      .map(
        (q, i) => `
        <div class="question" data-q="${i}">

          <h4>${i + 1}. ${q[0]}</h4>

          ${q[1]
            .map(
              (o, j) => `
              <button
                class="option"
                onclick="checkMCQ(${i},${j})"
              >
                ${String.fromCharCode(65 + j)}. ${o}
              </button>
            `
            )
            .join("")}

          <div
            id="exp-${i}"
            class="explanation"
          ></div>

        </div>
      `
      )
      .join("")}
  `;
}

function checkMCQ(qIndex, selected) {
  const q = ENTRY_DATA[currentTest].questions[qIndex];

  const box = document.querySelector(`[data-q="${qIndex}"]`);

  const buttons = box.querySelectorAll(".option");

  buttons.forEach((b, i) => {
    b.disabled = true;

    if (i === q[2]) {
      b.classList.add("correct");
    }

    if (i === selected && selected !== q[2]) {
      b.classList.add("wrong");
    }
  });

  const exp = $(`exp-${qIndex}`);

  exp.textContent =
    (selected === q[2] ? "✓ Correct. " : "✗ Not quite. ") + q[3];

  exp.classList.add("show");

  addQuestionsDone(1);
}

function renderMock() {
  const d = ENTRY_DATA[currentTest];

  currentQuestions = [...d.questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(5, d.questions.length));

  mockAnswers = Array(currentQuestions.length).fill(null);

  $("panel-mock").innerHTML = `
    <div class="mock-actions">

      <div>

        <h3>5-minute ${currentTest} mock</h3>

        <p style="color:var(--muted);margin:0">
          Practice test using the starter question bank.
        </p>

      </div>

      <span
        class="timer"
        id="mockTimer"
      >
        05:00
      </span>

    </div>

    <div id="mockQuestions">

      ${currentQuestions
        .map(
          (q, i) => `
        <div class="question">

          <h4>${i + 1}. ${q[0]}</h4>

          ${q[1]
            .map(
              (o, j) => `
              <button
                class="option"
                data-mock="${i}-${j}"
                onclick="selectMock(${i},${j})"
              >
                ${String.fromCharCode(65 + j)}. ${o}
              </button>
            `
            )
            .join("")}

        </div>
      `
        )
        .join("")}

    </div>

    <div style="display:flex;gap:10px;flex-wrap:wrap">

      <button
        class="btn secondary"
        onclick="startMockTest()"
      >
        Start / Restart Timer
      </button>

      <button
        class="btn primary"
        onclick="submitMock()"
      >
        Submit Mock Test
      </button>

    </div>
  `;

  timeLeft = 300;
  stopTimer();
}

function startMockTest() {
  showPanel("mock");

  timeLeft = 300;

  stopTimer();

  mockTimer = setInterval(() => {
    timeLeft--;

    updateTimer();

    if (timeLeft <= 0) {
      stopTimer();
      submitMock(true);
    }
  }, 1000);

  updateTimer();
}

function updateTimer() {
  const el = $("mockTimer");

  if (!el) return;

  const m = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const s = String(timeLeft % 60).padStart(2, "0");

  el.textContent = `${m}:${s}`;
}

function stopTimer() {
  if (mockTimer) {
    clearInterval(mockTimer);
  }

  mockTimer = null;
}

function selectMock(q, j) {
  mockAnswers[q] = j;

  document
    .querySelectorAll(`[data-mock^="${q}-"]`)
    .forEach((b) => b.classList.remove("correct"));

  const chosen = document.querySelector(
    `[data-mock="${q}-${j}"]`
  );

  if (chosen) {
    chosen.classList.add("correct");
  }
}

function submitMock(auto = false) {
  stopTimer();

  let score = 0;

  currentQuestions.forEach((q, i) => {
    if (mockAnswers[i] === q[2]) {
      score++;
    }
  });

  const pct = Math.round(
    (score / currentQuestions.length) * 100
  );

  const scores = JSON.parse(
    localStorage.getItem("entryprep-scores") || "[]"
  );

  scores.push(pct);

  localStorage.setItem(
    "entryprep-scores",
    JSON.stringify(scores)
  );

  localStorage.setItem(
    "entryprep-attempts",
    String(
      Number(
        localStorage.getItem("entryprep-attempts") || 0
      ) + 1
    )
  );

  addQuestionsDone(currentQuestions.length);

  updateProgress();

  toast(
    auto
      ? `Time's up — ${pct}%`
      : `Mock submitted — ${pct}%`
  );

  $("panel-mock").insertAdjacentHTML(
    "afterbegin",
    `
      <div
        class="metric"
        style="margin-bottom:16px"
      >
        <strong>${pct}%</strong>

        <span>
          ${score}/${currentQuestions.length} correct.
          ${
            pct >= 80
              ? "Keep it up!"
              : "Review the syllabus and try again."
          }
        </span>

      </div>
    `
  );
}

function addQuestionsDone(n) {
  const total =
    Number(
      localStorage.getItem("entryprep-questions") || 0
    ) + n;

  localStorage.setItem(
    "entryprep-questions",
    String(total)
  );

  updateProgress();
}

function updateProgress() {
  const scores = JSON.parse(
    localStorage.getItem("entryprep-scores") || "[]"
  );

  const avg = scores.length
    ? Math.round(
        scores.reduce((a, b) => a + b, 0) /
          scores.length
      )
    : 0;

  const best = scores.length
    ? Math.max(...scores)
    : 0;

  const attempts = Number(
    localStorage.getItem("entryprep-attempts") || 0
  );

  const questions = Number(
    localStorage.getItem("entryprep-questions") || 0
  );

  $("progressScore").textContent = `${avg}%`;

  $("progressCircle").style.setProperty(
    "--progress",
    `${avg}%`
  );

  $("attemptCount").textContent = attempts;

  $("bestScore").textContent = `${best}%`;

  $("questionsDone").textContent = questions;
}

function openAI() {
  $("aiPanel").classList.remove("hidden");
  $("aiInput").focus();
}

function closeAI() {
  $("aiPanel").classList.add("hidden");
}

function addAIMessage(text, who = "bot") {
  const el = document.createElement("div");

  el.className = `ai-msg ${who}`;

  el.textContent = text;

  $("aiMessages").appendChild(el);

  $("aiMessages").scrollTop =
    $("aiMessages").scrollHeight;
}

async function sendAI() {
  const input = $("aiInput");

  const message = input.value.trim();

  if (!message) return;

  addAIMessage(message, "user");

  input.value = "";

  const send = $("sendAi");

  send.disabled = true;

  send.textContent = "Thinking...";

  try {
    const res = await fetch("/api/ai", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message,
        test: $("aiTest").value
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.error || "AI request failed"
      );
    }

    addAIMessage(
      data.reply || "No response received."
    );

  } catch (err) {
    addAIMessage(
      err.message ||
        "AI is unavailable right now."
    );

  } finally {
    send.disabled = false;
    send.textContent = "Send";
  }
}

function runSearch() {
  const q = $("globalSearch")
    .value
    .trim()
    .toLowerCase();

  if (!q) return;

  if (
    q.includes("ecat") ||
    q.includes("engineering") ||
    q.includes("uet") ||
    q.includes("nust")
  ) {
    openDashboard("ECAT");

  } else if (
    q.includes("bcat") ||
    q.includes("business") ||
    q.includes("iba") ||
    q.includes("lums")
  ) {
    openDashboard("BCAT");

  } else if (
    q.includes("mdcat") ||
    q.includes("medical") ||
    q.includes("biology") ||
    q.includes("mbbs")
  ) {
    openDashboard("MDCAT");

  } else {
    document
      .querySelector("#universities")
      .scrollIntoView({
        behavior: "smooth"
      });

    toast(
      "Try ECAT, BCAT, MDCAT, UET, IBA, LUMS or medical."
    );
  }
}

window.openDashboard = openDashboard;
window.checkMCQ = checkMCQ;
window.startMockTest = startMockTest;
window.selectMock = selectMock;
window.submitMock = submitMock;
