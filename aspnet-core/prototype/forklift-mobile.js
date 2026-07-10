const loginView = document.querySelector("#login-view");
const taskView = document.querySelector("#task-view");
const detailView = document.querySelector("#detail-view");
const loginBtn = document.querySelector("#login-btn");
const logoutBtn = document.querySelector("#logout-btn");
const detailBackBtn = document.querySelector("#detail-back-btn");
const accountDisplay = document.querySelector("#account-display");
const taskList = document.querySelector("#task-list");
const tabs = Array.from(document.querySelectorAll(".status-tabs button"));
const detailTaskTitle = document.querySelector("#detail-task-title");
const detailTaskSummary = document.querySelector("#detail-task-summary");
const detailPageList = document.querySelector("#detail-page-list");
const actionModal = document.querySelector("#action-modal");
const actionMask = document.querySelector("#action-modal-mask");
const actionTitle = document.querySelector("#action-title");
const actionForm = document.querySelector("#action-form");
const actionConfirm = document.querySelector("#action-confirm");
const toast = document.querySelector("#toast");

let activeFilter = "all";
let selectedTaskId = "RW-20260506-002";
let currentAction = "";

const tasks = [
  {
    id: "RW-20260506-001",
    status: "待接单",
    deliveryCount: 2,
    materialCount: 2,
    pointCount: 2,
    sourceType: "厂内资材库",
    executor: "张三",
    device: "",
    createdAt: "2026.05.06 08:20",
    acceptAt: "",
    startAt: "",
    finishAt: "",
    cancelAt: "",
    cancelReason: "",
    points: [
      { deliveryNo: "PSD-20260506-001", material: "1100000022", description: "BOG蒸发气 热值≥8800Kcal/NM3", storage: "3108", date: "2026.05.06", period: "上午", latestDate: "2026.05.06", quantity: 10, unit: "NM3", forkliftType: "平叉", forkliftLoadLimit: "3T", shortHaulType: "平板车", shortHaulLoadLimit: "10T" },
      { deliveryNo: "PSD-20260506-002", material: "1100000021", description: "LNG天然气 热值≥9200Kcal/NM3", storage: "3104", date: "2026.05.06", period: "下午", latestDate: "2026.05.07", quantity: 20, unit: "TO", forkliftType: "抱叉", forkliftLoadLimit: "5T", shortHaulType: "自卸车", shortHaulLoadLimit: "15T" }
    ]
  },
  {
    id: "RW-20260506-002",
    status: "待接单",
    deliveryCount: 3,
    materialCount: 2,
    pointCount: 3,
    sourceType: "厂内资材库",
    executor: "张三",
    device: "",
    createdAt: "2026.05.06 08:25",
    acceptAt: "",
    startAt: "",
    finishAt: "",
    cancelAt: "",
    cancelReason: "",
    points: [
      { deliveryNo: "PSD-20260506-003", material: "1100000021", description: "LNG天然气 热值≥9200Kcal/NM3", storage: "3108", date: "2026.05.06", period: "上午", latestDate: "2026.05.07", quantity: 8, unit: "TO" },
      { deliveryNo: "PSD-20260506-004", material: "20000002", description: "木片 桉木 中国 广西", storage: "3108", date: "2026.05.06", period: "下午", latestDate: "2026.05.07", quantity: 12, unit: "TO" },
      { deliveryNo: "PSD-20260506-005", material: "20000002", description: "木片 桉木 中国 广西", storage: "3112", date: "2026.05.07", period: "上午", latestDate: "2026.05.08", quantity: 6, unit: "TO" }
    ]
  },
  {
    id: "RW-20260506-003",
    status: "执行中",
    deliveryCount: 2,
    materialCount: 1,
    pointCount: 2,
    sourceType: "厂内资材库",
    executor: "王五",
    device: "5110100022018A9",
    createdAt: "2026.05.06 09:10",
    acceptAt: "2026.05.06 09:15",
    startAt: "2026.05.06 09:30",
    finishAt: "",
    cancelAt: "",
    cancelReason: "",
    points: [
      { deliveryNo: "PSD-20260506-006", material: "20000003", description: "木片 桉木 中国 海南", storage: "3108", date: "2026.05.06", period: "下午", latestDate: "2026.05.07", quantity: 14, unit: "TO" },
      { deliveryNo: "PSD-20260506-007", material: "1100000022", description: "BOG蒸发气 热值≥8800Kcal/NM3", storage: "3104", date: "2026.05.07", period: "上午", latestDate: "2026.05.08", quantity: 9, unit: "NM3" }
    ]
  },
  {
    id: "RW-20260506-004",
    status: "已完成",
    deliveryCount: 1,
    materialCount: 1,
    pointCount: 1,
    sourceType: "厂内资材库",
    executor: "李四",
    device: "5110100022018A0",
    createdAt: "2026.05.06 07:50",
    acceptAt: "2026.05.06 07:55",
    startAt: "2026.05.06 08:05",
    finishAt: "2026.05.06 08:45",
    cancelAt: "",
    cancelReason: "",
    points: [
      { deliveryNo: "PSD-20260506-008", material: "20000003", description: "木片 桉木 中国 海南", storage: "3108", date: "2026.05.06", period: "上午", latestDate: "2026.05.07", quantity: 12, unit: "TO" }
    ]
  },
  {
    id: "RW-20260506-005",
    status: "已取消",
    deliveryCount: 1,
    materialCount: 1,
    pointCount: 1,
    sourceType: "厂内资材库",
    executor: "张三",
    device: "",
    createdAt: "2026.05.06 08:10",
    acceptAt: "",
    startAt: "",
    finishAt: "",
    cancelAt: "2026.05.06 08:40",
    cancelReason: "现场取消，不需要该任务",
    points: [
      { deliveryNo: "PSD-20260506-009", material: "1100000021", description: "LNG天然气 热值≥9200Kcal/NM3", storage: "3104", date: "2026.05.06", period: "下午", latestDate: "2026.05.07", quantity: 5, unit: "TO" }
    ]
  }
];

function nowText() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.add("hidden"), 1600);
}

function demandNoForPoint(point) {
  const map = {
    "PSD-20260506-001": "DELREQ-20260506-001",
    "PSD-20260506-002": "DELREQ-20260506-002",
    "PSD-20260506-003": "DELREQ-20260506-003",
    "PSD-20260506-004": "DELREQ-20260506-004",
    "PSD-20260506-005": "DELREQ-20260506-005",
    "PSD-20260506-006": "DELREQ-20260506-006",
    "PSD-20260506-007": "DELREQ-20260506-007",
    "PSD-20260506-008": "DELREQ-20260506-008",
    "PSD-20260506-009": "DELREQ-20260506-009"
  };
  return point.demandNo || map[point.deliveryNo] || "-";
}

function requisitionNoForPoint(point) {
  return point.requisitionNo || "1000000137";
}

function lineNoForPoint(point, index) {
  return point.lineNo || index + 1;
}

function sourceTypeForPoint(point) {
  return point.sourceType || "厂内资材库";
}

function sourceTypeBadgeClass(sourceType) {
  if (sourceType === "厂内资材库") return "blue";
  if (sourceType === "供应商送货") return "green";
  if (sourceType === "码头仓库") return "amber";
  return "gray";
}

function forkliftTypeForPoint(point) {
  if (point.forkliftType) return point.forkliftType;
  return sourceTypeForPoint(point) === "厂内资材库" ? "平叉" : "-";
}

function forkliftLoadLimitForPoint(point) {
  if (point.forkliftLoadLimit) return point.forkliftLoadLimit;
  return sourceTypeForPoint(point) === "厂内资材库" ? "3T" : "-";
}

function shortHaulTypeForPoint(point) {
  if (point.shortHaulType) return point.shortHaulType;
  return sourceTypeForPoint(point) === "码头仓库" ? "平板车" : "-";
}

function shortHaulLoadLimitForPoint(point) {
  if (point.shortHaulLoadLimit) return point.shortHaulLoadLimit;
  return sourceTypeForPoint(point) === "码头仓库" ? "10T" : "-";
}

function summarizePointValues(task, getter) {
  const values = [...new Set(task.points.map(getter).filter((value) => value && value !== "-"))];
  return values.length ? values : ["-"];
}

function equipmentTypeBadge(value) {
  if (!value || value === "-") return `<i class="badge gray">-</i>`;
  return `<i class="badge cyan">${value}</i>`;
}

function equipmentTypeBadges(values) {
  return values.map(equipmentTypeBadge).join("");
}

function equipmentLoadText(values) {
  return values.join(" / ");
}

function taskEquipmentSummary(task) {
  return {
    forkliftTypes: summarizePointValues(task, forkliftTypeForPoint),
    forkliftLoads: summarizePointValues(task, forkliftLoadLimitForPoint),
    shortHaulTypes: summarizePointValues(task, shortHaulTypeForPoint),
    shortHaulLoads: summarizePointValues(task, shortHaulLoadLimitForPoint)
  };
}

function externalDocTypeForPoint(point) {
  const sourceType = sourceTypeForPoint(point);
  if (point.externalDocType) return point.externalDocType;
  if (sourceType === "厂内资材库") return "SAP拣配单";
  if (sourceType === "供应商送货") return "供应商预约号";
  if (sourceType === "码头仓库") return "短驳计划";
  return "-";
}

function externalDocNoForPoint(point, index) {
  return point.externalDocNo || `100289840${index + 3}`;
}

function badgeClass(status) {
  if (status === "执行中") return "green";
  if (status === "待接单") return "amber";
  if (status === "已完成") return "blue";
  return "gray";
}

function cardClass(task) {
  if (task.status === "执行中") return "running";
  if (task.status === "待接单") return "warning";
  if (task.status === "已取消") return "cancelled";
  return "";
}

function filteredTasks() {
  if (activeFilter === "all") return tasks;
  return tasks.filter((task) => task.status === activeFilter);
}

function getSelectedTask() {
  return tasks.find((task) => task.id === selectedTaskId) || tasks[0];
}

function renderCounts() {
  document.querySelectorAll("[data-count]").forEach((item) => {
    const status = item.dataset.count;
    item.textContent = status === "all"
      ? tasks.length
      : tasks.filter((task) => task.status === status).length;
  });
}

function renderTasks() {
  renderCounts();
  taskList.innerHTML = filteredTasks().map((task) => {
    const selected = task.id === selectedTaskId ? "selected" : "";
    const equipment = taskEquipmentSummary(task);
    return `
      <article class="task-card ${selected} ${cardClass(task)}" data-task-id="${task.id}">
        <div class="task-top">
          <span class="task-no">${task.id}</span>
          <span class="badge ${badgeClass(task.status)}">${task.status}</span>
        </div>
        <div class="task-stats">
          <div><span>配送单数</span><strong>${task.deliveryCount}</strong></div>
          <div><span>物料项数</span><strong>${task.materialCount}</strong></div>
          <div><span>叉车要求</span><strong class="equipment-line">${equipmentTypeBadges(equipment.forkliftTypes)} <em>${equipmentLoadText(equipment.forkliftLoads)}</em></strong></div>
          <div><span>短驳要求</span><strong class="equipment-line">${equipmentTypeBadges(equipment.shortHaulTypes)} <em>${equipmentLoadText(equipment.shortHaulLoads)}</em></strong></div>
        </div>
        <div class="task-card-actions">
          <button type="button" data-task-action="start" ${task.status === "待接单" ? "" : "disabled"}>开始</button>
          <button type="button" data-task-action="device" ${task.status === "执行中" ? "" : "disabled"}>变更设备</button>
          <button type="button" data-task-action="finish" ${task.status === "执行中" ? "" : "disabled"}>结束</button>
          <button type="button" data-task-action="detail">详情</button>
        </div>
      </article>
    `;
  }).join("");
}

function setActiveFilter(filter) {
  activeFilter = filter;
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.filter === filter));
  renderTasks();
}

function fillDetailPage(task) {
  detailTaskTitle.textContent = task.id;
  detailTaskSummary.textContent = `${task.status} · ${task.deliveryCount} 张配送单 · ${task.materialCount} 项物料`;
  detailPageList.innerHTML = task.points.map((point, index) => {
    const sourceType = sourceTypeForPoint(point);
    const actualQuantity = point.actualQuantity ?? (task.status === "已完成" ? point.quantity : "-");
    return `
    <article class="detail-delivery-card">
      <strong>${point.deliveryNo}</strong>
      <div class="detail-delivery-grid">
        <span>配送需求单号</span><b>${demandNoForPoint(point)}</b>
        <span>领料申请单号</span><b>${requisitionNoForPoint(point)}</b>
        <span>行项目</span><b>${lineNoForPoint(point, index)}</b>
        <span>物料</span><b>${point.material}</b>
        <span>描述</span><b>${point.description}</b>
        <span>批次</span><b>${point.batch || "-"}</b>
        <span>认证种类</span><b>${point.certType || "-"}</b>
        <span>库存地点</span><b>${point.inventoryLocation || point.storage || "-"}</b>
        <span>仓库号</span><b>${point.warehouseNo || "107"}</b>
        <span>仓储类型</span><b>${point.storageType || "A01"}</b>
        <span>仓位</span><b>${point.bin || "1210"}</b>
        <span>计划数量</span><b class="qty-highlight plan">${point.quantity}</b>
        <span>实际完成数量</span><b class="qty-highlight actual">${actualQuantity}</b>
        <span>基本单位</span><b>${point.unit}</b>
        <span>差异原因</span><b>${point.finishReason || "-"}</b>
        <span>货源类型</span><b><i class="badge ${sourceTypeBadgeClass(sourceType)}">${sourceType}</i></b>
        <span>货源标识</span><b>${point.sourceCode || `SUP-20260506-00${index + 1}`}</b>
        <span>收货库存地点</span><b>${point.storage}</b>
        <span>配送日期</span><b>${point.date}</b>
        <span>配送时段</span><b>${point.period}</b>
        <span>最后配送日期</span><b>${point.latestDate}</b>
        <span>叉车类型</span><b>${equipmentTypeBadge(forkliftTypeForPoint(point))}</b>
        <span>叉车载重限制</span><b>${forkliftLoadLimitForPoint(point)}</b>
        <span>短驳车类型</span><b>${equipmentTypeBadge(shortHaulTypeForPoint(point))}</b>
        <span>短驳载重限制</span><b>${shortHaulLoadLimitForPoint(point)}</b>
        <span>外部单据类型</span><b>${externalDocTypeForPoint(point)}</b>
        <span>外部单据号</span><b>${externalDocNoForPoint(point, index)}</b>
      </div>
    </article>
  `;
  }).join("");
}

function openDetailPage(task = getSelectedTask()) {
  selectedTaskId = task.id;
  fillDetailPage(task);
  taskView.classList.add("hidden");
  detailView.classList.remove("hidden");
  renderTasks();
}

function closeDetailPage() {
  detailView.classList.add("hidden");
  taskView.classList.remove("hidden");
}

function readonlyLine(label, value) {
  return `<div class="readonly-line"><span>${label}</span><strong>${value || "-"}</strong></div>`;
}

function actionTemplate(action, task) {
  if (action === "start") {
    return `
      ${readonlyLine("任务单号", task.id)}
      <label class="required"><span>设备号</span><input id="action-device" value="${task.device || "5110100022018A9"}" autocomplete="off" required></label>
      <label class="required"><span>设备类型</span><select id="action-device-type" required><option value="">请选择</option><option selected>抱叉</option><option>平叉</option><option>铲车</option></select></label>
      <label><span>备注</span><textarea id="action-remark" placeholder=""></textarea></label>
    `;
  }
  if (action === "finish") {
    return `
      ${readonlyLine("任务单号", task.id)}
      ${readonlyLine("设备号", task.device || "5110100022018A9")}
      <section class="finish-confirm-section">
        <h3>完成数量确认</h3>
        <div class="finish-confirm-list">
          ${task.points.map((point, index) => `
            <article class="finish-confirm-card">
              <strong>${point.deliveryNo}</strong>
              <div class="finish-confirm-info">
                <span>配送需求单号</span><b>${demandNoForPoint(point)}</b>
                <span>物料</span><b>${point.material}</b>
                <span>描述</span><b>${point.description}</b>
                <span>计划数量</span><b>${point.quantity} ${point.unit}</b>
              </div>
              <label class="required">
                <span>实际完成数量</span>
                <input class="finish-actual-input" data-point-index="${index}" value="${point.actualQuantity ?? point.quantity}" inputmode="decimal" required>
              </label>
              <label>
                <span>差异原因</span>
                <textarea class="finish-reason-input" data-point-index="${index}" placeholder="实际数量与计划不一致时填写">${point.finishReason || ""}</textarea>
              </label>
            </article>
          `).join("")}
        </div>
      </section>
      <label><span>备注</span><textarea id="action-remark" placeholder=""></textarea></label>
    `;
  }
  return `
    ${readonlyLine("任务单号", task.id)}
    ${readonlyLine("原设备号", task.device || "5110100022018A9")}
    <label class="required"><span>新设备号</span><input id="action-device" value="5110100022018A0" required></label>
    <label class="required"><span>设备类型</span><select id="action-device-type" required><option value="">请选择</option><option selected>抱叉</option><option>平叉</option><option>铲车</option></select></label>
    <label><span>变更原因</span><textarea id="action-remark">原设备故障，更换设备</textarea></label>
  `;
}

function openAction(action, task = getSelectedTask()) {
  selectedTaskId = task.id;
  currentAction = action;
  const titles = { start: "任务开始", finish: "任务结束", device: "变更设备" };
  actionTitle.textContent = titles[action] || "任务操作";
  actionForm.innerHTML = actionTemplate(action, task);
  actionMask.classList.remove("hidden");
  actionModal.classList.remove("hidden");
  actionModal.setAttribute("aria-hidden", "false");
}

function closeAction() {
  actionMask.classList.add("hidden");
  actionModal.classList.add("hidden");
  actionModal.setAttribute("aria-hidden", "true");
}

function requireActionValue(selector, message) {
  const field = actionForm.querySelector(selector);
  if (!field?.value) {
    showToast(message);
    field?.focus();
    return false;
  }
  return true;
}

function confirmAction() {
  const task = getSelectedTask();
  if (currentAction === "start") {
    if (!requireActionValue("#action-device", "请输入设备号")) return;
    if (!requireActionValue("#action-device-type", "请选择设备类型")) return;
    task.status = "执行中";
    task.startAt = nowText();
    task.device = document.querySelector("#action-device")?.value || task.device;
    showToast("任务已开始");
  } else if (currentAction === "finish") {
    const emptyQuantity = Array.from(document.querySelectorAll(".finish-actual-input")).find((input) => !input.value);
    if (emptyQuantity) {
      showToast("请输入实际完成数量");
      emptyQuantity.focus();
      return;
    }
    document.querySelectorAll(".finish-actual-input").forEach((input) => {
      const point = task.points[Number(input.dataset.pointIndex)];
      if (!point) return;
      point.actualQuantity = input.value;
    });
    document.querySelectorAll(".finish-reason-input").forEach((input) => {
      const point = task.points[Number(input.dataset.pointIndex)];
      if (!point) return;
      point.finishReason = input.value;
    });
    task.status = "已完成";
    task.finishAt = nowText();
    showToast("任务已结束");
  } else if (currentAction === "device") {
    if (!requireActionValue("#action-device", "请输入新设备号")) return;
    if (!requireActionValue("#action-device-type", "请选择设备类型")) return;
    task.device = document.querySelector("#action-device")?.value || task.device;
    showToast("设备变更已提交");
  }
  closeAction();
  if (!detailView.classList.contains("hidden")) {
    fillDetailPage(task);
  }
  renderTasks();
}

loginBtn.addEventListener("click", () => {
  const account = document.querySelector("#login-account").value;
  accountDisplay.textContent = account;
  loginView.classList.add("hidden");
  taskView.classList.remove("hidden");
  renderTasks();
});

logoutBtn.addEventListener("click", () => {
  taskView.classList.add("hidden");
  detailView.classList.add("hidden");
  loginView.classList.remove("hidden");
});

detailBackBtn.addEventListener("click", closeDetailPage);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveFilter(tab.dataset.filter));
});

taskList.addEventListener("click", (event) => {
  const card = event.target.closest(".task-card");
  if (!card) return;
  const task = tasks.find((item) => item.id === card.dataset.taskId);
  if (!task) return;
  selectedTaskId = task.id;
  const action = event.target.dataset.taskAction;
  if (action === "start") {
    openAction("start", task);
  } else if (action === "finish") {
    openAction("finish", task);
  } else if (action === "device") {
    openAction("device", task);
  } else if (action === "detail") {
    openDetailPage(task);
  }
  renderTasks();
});

document.querySelectorAll("[data-close-action]").forEach((button) => button.addEventListener("click", closeAction));
actionMask.addEventListener("click", closeAction);
actionConfirm.addEventListener("click", confirmAction);

renderTasks();
