/**
 * script.js
 * Berisi seluruh logika interaktif situs:
 * 1. Toggle menu navigasi (mobile)
 * 2. Mesin quiz: render soal ala LJK, timer mundur, progress bar,
 *    penilaian otomatis, dan pembahasan
 * 3. Validasi form kontak
 */

document.addEventListener("DOMContentLoaded", function () {
  initNavToggle();
  initQuizPage();
  initContactForm();
  setActiveNavLink();
});

/* ---------------------------------------------------------
   1. NAVBAR TOGGLE (mobile)
--------------------------------------------------------- */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    links.classList.toggle("open");
    const expanded = links.classList.contains("open");
    toggle.setAttribute("aria-expanded", expanded);
  });
}

function setActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === path) link.classList.add("active");
  });
}

/* ---------------------------------------------------------
   2. QUIZ ENGINE
--------------------------------------------------------- */
function initQuizPage() {
  const examForm = document.getElementById("examForm");
  if (!examForm) return; // bukan halaman quiz

  const params = new URLSearchParams(window.location.search);
  const subjectKey = params.get("subject") || "matematika";
  const subject = QUIZ_BANK[subjectKey] || QUIZ_BANK.matematika;

  const questionsContainer = document.getElementById("questionsContainer");
  const subjectTag = document.getElementById("subjectTag");
  const examTitle = document.getElementById("examTitle");
  const progressFill = document.getElementById("progressFill");
  const progressLabel = document.getElementById("progressLabel");
  const timerEl = document.getElementById("timer");
  const resultPanel = document.getElementById("resultPanel");
  const examBody = document.getElementById("examBody");
  const examFooter = document.getElementById("examFooter");

  subjectTag.textContent = "Mata Pelajaran: " + subject.label;
  examTitle.textContent = "Quiz " + subject.label;
  document.title = "Quiz " + subject.label + " — Quiz Cerdas SMA";

  // Render soal dalam gaya "lembar jawaban komputer" (bubble sheet)
  const letters = ["A", "B", "C", "D", "E"];
  subject.soal.forEach(function (item, qIndex) {
    const block = document.createElement("div");
    block.className = "question-block";

    const qText = document.createElement("div");
    qText.className = "q-text";
    qText.innerHTML =
      '<span class="q-number">' + String(qIndex + 1).padStart(2, "0") + "</span><span>" + item.pertanyaan + "</span>";
    block.appendChild(qText);

    item.opsi.forEach(function (opsiText, oIndex) {
      const label = document.createElement("label");
      label.className = "option-row";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "soal-" + qIndex;
      input.value = oIndex;
      input.required = oIndex === 0; // minimal 1 wajib agar form tervalidasi browser
      input.addEventListener("change", updateProgress);

      const bubble = document.createElement("span");
      bubble.className = "bubble";
      bubble.textContent = letters[oIndex];

      const textSpan = document.createElement("span");
      textSpan.className = "option-text";
      textSpan.textContent = opsiText;

      label.appendChild(input);
      label.appendChild(bubble);
      label.appendChild(textSpan);
      block.appendChild(label);
    });

    questionsContainer.appendChild(block);
  });

  const totalSoal = subject.soal.length;
  updateProgress();

  function updateProgress() {
    const answered = new Set();
    subject.soal.forEach(function (_, i) {
      const checked = document.querySelector('input[name="soal-' + i + '"]:checked');
      if (checked) answered.add(i);
    });
    const percent = Math.round((answered.size / totalSoal) * 100);
    progressFill.style.width = percent + "%";
    progressLabel.textContent = "Terjawab " + answered.size + " dari " + totalSoal + " soal (" + percent + "%)";
  }

  /* ----- Timer mundur ----- */
  let sisaDetik = subject.durasiDetik;
  renderTimer();
  const timerInterval = setInterval(function () {
    sisaDetik--;
    renderTimer();
    if (sisaDetik <= 30) timerEl.classList.add("warning");
    if (sisaDetik <= 0) {
      clearInterval(timerInterval);
      finishExam(true);
    }
  }, 1000);

  function renderTimer() {
    const m = Math.floor(Math.max(sisaDetik, 0) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.max(sisaDetik, 0) % 60;
    timerEl.textContent = m + ":" + s.toString().padStart(2, "0");
  }

  /* ----- Submit / penilaian ----- */
  examForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearInterval(timerInterval);
    finishExam(false);
  });

  function finishExam(waktuHabis) {
    let benar = 0;
    const rincian = [];

    subject.soal.forEach(function (item, i) {
      const checked = document.querySelector('input[name="soal-' + i + '"]:checked');
      const dipilih = checked ? parseInt(checked.value, 10) : null;
      const isBenar = dipilih === item.jawaban;
      if (isBenar) benar++;
      rincian.push({
        nomor: i + 1,
        pertanyaan: item.pertanyaan,
        dijawab: dipilih !== null ? letters[dipilih] : "-",
        kunci: letters[item.jawaban],
        status: isBenar ? "Benar" : "Salah"
      });
    });

    const nilai = Math.round((benar / totalSoal) * 100);

    // Sembunyikan soal, tampilkan hasil
    examBody.style.display = "none";
    examFooter.style.display = "none";
    resultPanel.classList.add("show");

    const stamp = document.getElementById("stamp");
    const stampScore = document.getElementById("stampScore");
    const resultText = document.getElementById("resultText");
    const resultTableBody = document.querySelector("#resultTable tbody");

    stampScore.textContent = nilai;
    stamp.classList.toggle("fail", nilai < 60);

    resultText.innerHTML =
      (waktuHabis ? "<strong>Waktu habis!</strong> " : "") +
      "Kamu menjawab benar <strong>" + benar + "</strong> dari <strong>" + totalSoal + "</strong> soal " +
      subject.label + ".";

    resultTableBody.innerHTML = "";
    rincian.forEach(function (r) {
      const tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" + r.nomor + "</td>" +
        "<td>" + r.pertanyaan + "</td>" +
        "<td>" + r.dijawab + "</td>" +
        "<td>" + r.kunci + "</td>" +
        '<td>' + (r.status === "Benar"
          ? '<mark style="background:#2F6B4F;color:#fff;">Benar</mark>'
          : '<mark style="background:#C0392B;color:#fff;">Salah</mark>') +
        "</td>";
      resultTableBody.appendChild(tr);
    });

    resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ---------------------------------------------------------
   3. FORM KONTAK
--------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const msgBox = document.getElementById("contactMsg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = form.nama.value.trim();
    const email = form.email.value.trim();
    const pesan = form.pesan.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nama.length < 3 || !emailRegex.test(email) || pesan.length < 10) {
      msgBox.textContent =
        "Mohon periksa kembali: nama minimal 3 huruf, email harus valid, dan pesan minimal 10 karakter.";
      msgBox.className = "form-msg show error";
      return;
    }

    msgBox.textContent =
      "Terima kasih, " + nama + "! Pesanmu sudah kami catat (demo — belum terhubung ke server sungguhan).";
    msgBox.className = "form-msg show success";
    form.reset();
  });
}
