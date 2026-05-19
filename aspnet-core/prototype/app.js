const navItems = document.querySelectorAll(".nav-item");
const pagePanels = document.querySelectorAll(".page-panel");
const toastButtons = document.querySelectorAll("[data-toast]");
const splitModal = document.querySelector("#split-modal");
const trialModal = document.querySelector("#trial-modal");
const employeeModal = document.querySelector("#employee-modal");
const taskRankModal = document.querySelector("#task-rank-modal");
const skillRankModal = document.querySelector("#skill-rank-modal");
const skillMetricRankModal = document.querySelector("#skill-metric-rank-modal");
const currentTabTitle = document.querySelector("#current-tab-title");
const toast = document.querySelector("#toast");
const shiftSelect = document.querySelector("[data-shift-select]");
const businessSlots = document.querySelectorAll("[data-business-slot]");

const shiftBusinessSlots = {
  "夜班": ["0:00~4:00", "4:00~8:00"],
  "中班": ["16:00~20:00", "20:00~24:00"],
  "早班": ["8:00~12:00", "12:00~16:00"]
};

function showPage(pageId) {
  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.page === pageId);
  });
  pagePanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === pageId);
  });
  const activeItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  if (activeItem && currentTabTitle) {
    currentTabTitle.textContent = activeItem.textContent.trim();
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  if (!message) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function openModal(modal) {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  if (!document.querySelector(".modal-backdrop.open")) {
    document.body.classList.remove("modal-open");
  }
}

function updateBusinessSlots() {
  if (!shiftSelect || businessSlots.length < 2) return;
  const slots = shiftBusinessSlots[shiftSelect.value] || shiftBusinessSlots["夜班"];
  businessSlots[0].textContent = slots[0];
  businessSlots[1].textContent = slots[1];
}

navItems.forEach((item) => {
  item.addEventListener("click", () => showPage(item.dataset.page));
});

document.querySelectorAll("[data-switch-trial]").forEach((button) => {
  button.addEventListener("click", () => showPage("demand-trial"));
});

document.querySelectorAll("[data-open-split]").forEach((button) => {
  button.addEventListener("click", () => openModal(splitModal));
});

document.querySelectorAll("[data-open-employee]").forEach((button) => {
  button.addEventListener("click", () => {
    updateBusinessSlots();
    openModal(employeeModal);
  });
});

document.querySelectorAll("[data-open-task-rank]").forEach((button) => {
  button.addEventListener("click", () => openModal(taskRankModal));
});

document.querySelectorAll("[data-open-skill-rank]").forEach((button) => {
  button.addEventListener("click", () => openModal(skillRankModal));
});

document.querySelectorAll("[data-open-skill-metric-rank]").forEach((button) => {
  button.addEventListener("click", () => openModal(skillMetricRankModal));
});

if (shiftSelect) {
  shiftSelect.addEventListener("change", updateBusinessSlots);
  updateBusinessSlots();
}

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => closeModal(button.closest(".modal-backdrop")));
});

document.querySelectorAll(".modal-backdrop").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal-backdrop.open").forEach(closeModal);
  }
});

document.querySelectorAll("[data-scroll-trial]").forEach((button) => {
  button.addEventListener("click", () => {
    openModal(trialModal);
    showToast("已执行试算，货源分配结果已更新");
  });
});

toastButtons.forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});
