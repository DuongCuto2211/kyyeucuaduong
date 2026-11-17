(() => {
  "use strict";

  const config = window.INVITATION_CONFIG || {};
  const supabaseConfig = window.SUPABASE_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);

  const opening = $("#opening");
  const envelope = $("#envelope");
  const openButtons = [$("#openLetter"), $("#openTextButton")];
  const music = $("#backgroundMusic");
  const musicToggle = $("#musicToggle");
  const musicLabel = $("#musicLabel");
  const toast = $("#toast");
  let toastTimer;
  let supabaseClient = null;
  let hasOpened = false;

  function setText(selector, value) {
    const element = $(selector);
    if (element && value !== undefined && value !== null && String(value).trim() !== "") {
      element.textContent = String(value);
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3400);
  }

  function applyInvitationConfig() {
    setText("#coverEyebrow", config.coverEyebrow);
    setText("#letterGreeting", config.greeting);
    setText("#hostSignature", config.hostName);
    setText("#closingHost", `— ${config.hostName || "Người gửi lời mời"}`);
    setText("#eventName", config.eventName);
    setText("#eventDateText", config.dateLabel);
    setText("#eventTimeText", config.timeLabel);
    setText("#eventLocation", config.locationName);
    setText("#eventAddress", config.address);
    const year = new Date().getFullYear();
    setText("#letterYear", year);
    setText("#footerYear", year);

    const copy = $("#letterCopy");
    if (copy && Array.isArray(config.letterParagraphs) && config.letterParagraphs.length) {
      copy.replaceChildren();
      config.letterParagraphs.forEach((paragraph) => {
        const p = document.createElement("p");
        p.textContent = paragraph;
        copy.appendChild(p);
      });
    }

    const mapLink = $("#mapLink");
    if (mapLink) {
      if (config.mapUrl && /^https:\/\//i.test(config.mapUrl)) {
        mapLink.href = config.mapUrl;
      } else {
        mapLink.hidden = true;
      }
    }

    const images = Array.isArray(config.galleryImages) ? config.galleryImages : [];
    document.querySelectorAll(".gallery-item").forEach((button, index) => {
      const imagePath = images[index];
      if (!imagePath) return;
      const image = button.querySelector("img");
      if (image) image.src = imagePath;
      button.dataset.fullImage = imagePath;
    });

    if (config.musicPath) music.src = config.musicPath;
  }

  async function startMusic() {
    try {
      music.volume = 0.32;
      await music.play();
      musicToggle.classList.add("is-playing");
      musicToggle.setAttribute("aria-pressed", "true");
      musicToggle.setAttribute("aria-label", "Tắt nhạc nền");
      musicLabel.textContent = "TẮT NHẠC";
    } catch (error) {
      musicToggle.classList.remove("is-playing");
      musicToggle.setAttribute("aria-pressed", "false");
      musicLabel.textContent = "BẬT NHẠC NHA";
      showToast("Nhạc chưa phát được, thử bật lại nha.");
    }
  }

  function openInvitation() {
    if (hasOpened) return;
    hasOpened = true;
    envelope.classList.add("is-open");
    opening.classList.add("has-opened");
    musicToggle.hidden = false;
    startMusic();
    window.setTimeout(() => {
      $("#letterSection").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 820);
  }

  openButtons.forEach((button) => button.addEventListener("click", openInvitation));
  musicToggle.addEventListener("click", async () => {
    if (music.paused) {
      await startMusic();
    } else {
      music.pause();
      musicToggle.classList.remove("is-playing");
      musicToggle.setAttribute("aria-pressed", "false");
      musicToggle.setAttribute("aria-label", "Bật nhạc nền");
      musicLabel.textContent = "BẬT NHẠC NHA";
    }
  });

  function initRevealAnimations() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    items.forEach((item) => observer.observe(item));
  }

  function initCountdown() {
    const wrap = $("#countdownWrap");
    const target = config.eventDateISO ? new Date(config.eventDateISO).getTime() : NaN;
    if (!Number.isFinite(target)) {
      wrap.hidden = true;
      return;
    }
    const update = () => {
      const distance = target - Date.now();
      if (distance <= 0) {
        ["#days", "#hours", "#minutes", "#seconds"].forEach((selector) => setText(selector, "00"));
        return;
      }
      const values = {
        "#days": Math.floor(distance / 86400000),
        "#hours": Math.floor((distance % 86400000) / 3600000),
        "#minutes": Math.floor((distance % 3600000) / 60000),
        "#seconds": Math.floor((distance % 60000) / 1000)
      };
      Object.entries(values).forEach(([selector, value]) => setText(selector, String(value).padStart(2, "0")));
    };
    update();
    window.setInterval(update, 1000);
  }

  function initGallery() {
    const dialog = $("#imageDialog");
    const dialogImage = $("#dialogImage");
    document.querySelectorAll(".gallery-item").forEach((button) => {
      button.addEventListener("click", () => {
        dialogImage.src = button.dataset.fullImage || button.querySelector("img").src;
        dialogImage.alt = button.querySelector("img").alt;
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
      });
    });
    $("#closeImageDialog").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  function initSupabase() {
    const url = (supabaseConfig.url || "").trim();
    const key = (supabaseConfig.publishableKey || "").trim();
    const status = $("#formStatus");
    const submitButton = $("#submitGuestbook");

    if (!url || !key) {
      status.textContent = "Sổ lưu bút chưa mở. Người làm thiệp cần kết nối Supabase trong file config.js trước nhé.";
      submitButton.disabled = true;
      return;
    }
    if (!window.supabase || typeof window.supabase.createClient !== "function") {
      status.textContent = "Chưa mở được sổ lưu bút. Bạn thử kiểm tra mạng rồi tải lại trang nha.";
      submitButton.disabled = true;
      return;
    }

    try {
      supabaseClient = window.supabase.createClient(url, key);
      status.textContent = "Sổ lưu bút sẵn sàng rồi, viết vài dòng cho cả hội nha!";
      loadGuestbook();
    } catch (error) {
      console.error("Supabase initialization error:", error);
      status.textContent = "Sổ lưu bút chưa kết nối đúng. Người làm thiệp kiểm tra lại config.js nhé.";
      submitButton.disabled = true;
    }
  }

  function formatEntryDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
  }

  function renderGuestbook(entries) {
    const container = $("#guestbookEntries");
    const count = $("#entryCount");
    count.textContent = `${entries.length} LỜI NHẮN`;
    container.replaceChildren();

    if (!entries.length) {
      const empty = document.createElement("div");
      empty.className = "empty-entries";
      const icon = document.createElement("span");
      icon.textContent = "✳";
      const copy = document.createElement("p");
      copy.textContent = "Chưa có ai mở hàng cả...\nBạn viết đầu tiên nha!";
      empty.append(icon, copy);
      container.appendChild(empty);
      return;
    }

    entries.forEach((entry) => {
      const article = document.createElement("article");
      article.className = "guestbook-entry";
      const top = document.createElement("div");
      top.className = "guestbook-entry-top";
      const name = document.createElement("strong");
      name.textContent = entry.name;
      const time = document.createElement("time");
      time.dateTime = entry.created_at;
      time.textContent = formatEntryDate(entry.created_at);
      const message = document.createElement("p");
      message.textContent = entry.message;
      top.append(name, time);
      article.append(top, message);
      container.appendChild(article);
    });
  }

  async function loadGuestbook() {
    if (!supabaseClient) return;
    const status = $("#formStatus");
    try {
      const { data, error } = await supabaseClient
        .from("guestbook")
        .select("id, name, message, created_at")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      renderGuestbook(data || []);
      status.textContent = "Đã cập nhật lời nhắn mới nhất.";
    } catch (error) {
      console.error("Guestbook loading error:", error);
      status.textContent = "Chưa đọc được lời nhắn. Người làm thiệp kiểm tra lại phần Supabase nha.";
    }
  }

  function initGuestbookForm() {
    const form = $("#guestbookForm");
    const nameInput = $("#guestName");
    const messageInput = $("#guestMessage");
    const counter = $("#messageCounter");
    const submitButton = $("#submitGuestbook");

    messageInput.addEventListener("input", () => {
      counter.textContent = `${messageInput.value.length} / 300`;
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!supabaseClient) {
        showToast("Sổ lưu bút chưa sẵn sàng. Báo người gửi thiệp kiểm tra nha.");
        return;
      }

      const name = nameInput.value.trim();
      const message = messageInput.value.trim();
      if (name.length < 1 || name.length > 40 || message.length < 1 || message.length > 300) {
        showToast("Tên tối đa 40 ký tự, lời nhắn tối đa 300 ký tự nha.");
        return;
      }
      if (/https?:\/\/|www\./i.test(`${name} ${message}`)) {
        showToast("Mình không nhận đường link trong lời nhắn nha.");
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = "ĐANG GỬI…";
      $("#formStatus").textContent = "Đang gửi lời nhắn, chờ xíu nha…";
      try {
        const { error } = await supabaseClient.from("guestbook").insert({ name, message });
        if (error) throw error;
        form.reset();
        counter.textContent = "0 / 300";
        $("#formStatus").textContent = "Gửi được rồi nè, cảm ơn bạn nha!";
        showToast("Lời nhắn đã lên sổ rồi. Cảm ơn bạn nha!");
        await loadGuestbook();
      } catch (error) {
        console.error("Guestbook insert error:", error);
        $("#formStatus").textContent = "Chưa gửi được lời nhắn. Bạn kiểm tra mạng rồi thử lại nha.";
        showToast("Chưa gửi được mất rồi, thử lại sau nha.");
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'GỬI NHA <span>↗</span>';
      }
    });
  }

  applyInvitationConfig();
  initRevealAnimations();
  initCountdown();
  initGallery();
  initSupabase();
  initGuestbookForm();
})();
