const workbenchView = document.querySelector("#workbench-view");
const moduleView = document.querySelector("#module-view");
const taskView = document.querySelector("#task-view");
const detailView = document.querySelector("#detail-view");
const openPlatformBtn = document.querySelector("#open-platform-btn");
const moduleBackBtn = document.querySelector("#module-back-btn");
const openDeliveryTaskBtn = document.querySelector("#open-delivery-task");
const openReceiptTaskBtn = document.querySelector("#open-receipt-task");
const taskBackBtn = document.querySelector("#task-back-btn");
const logoutBtn = document.querySelector("#logout-btn");
const detailBackBtn = document.querySelector("#detail-back-btn");
const accountDisplay = document.querySelector("#account-display");
const taskPageTitle = document.querySelector("#task-page-title");
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
let currentTaskType = "delivery";

const deliveryTasks = [
  {
    id: "RW-20260506-001",
    status: "待接单",
    myRole: "叉车",
    needShuttle: true,
    forkliftDriver: "张三",
    shuttleDriver: "赵六",
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
    executor: "张三",
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
    executor: "张三",
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
  },
  {
    id: "RW-20260506-010",
    status: "待接单",
    myRole: "短驳",
    needShuttle: true,
    forkliftDriver: "王五",
    shuttleDriver: "张三",
    forkliftDone: false,
    deliveryCount: 1,
    materialCount: 1,
    pointCount: 1,
    sourceType: "厂内资材库",
    executor: "张三",
    device: "",
    deviceType: "",
    createdAt: "2026.05.06 08:30",
    acceptAt: "",
    startAt: "",
    finishAt: "",
    cancelAt: "",
    cancelReason: "",
    points: [
      { deliveryNo: "PSD-20260506-010", material: "1100000022", description: "BOG蒸发气 热值≥8800Kcal/NM3", storage: "3108", date: "2026.05.06", period: "上午", latestDate: "2026.05.06", quantity: 10, unit: "NM3", forkliftType: "平叉", forkliftLoadLimit: "3T", shortHaulType: "平板车", shortHaulLoadLimit: "10T" }
    ]
  },
  {
    id: "RW-20260506-011",
    status: "待接单",
    myRole: "短驳",
    needShuttle: true,
    forkliftDriver: "李四",
    shuttleDriver: "张三",
    forkliftDone: true,
    deliveryCount: 1,
    materialCount: 1,
    pointCount: 1,
    sourceType: "厂内资材库",
    executor: "张三",
    device: "",
    deviceType: "",
    createdAt: "2026.05.06 08:35",
    acceptAt: "",
    startAt: "",
    finishAt: "",
    cancelAt: "",
    cancelReason: "",
    points: [
      { deliveryNo: "PSD-20260506-011", material: "1100000021", description: "LNG天然气 热值≥9200Kcal/NM3", storage: "3104", date: "2026.05.06", period: "下午", latestDate: "2026.05.07", quantity: 20, unit: "TO", forkliftType: "抱叉", forkliftLoadLimit: "5T", shortHaulType: "自卸车", shortHaulLoadLimit: "15T" }
    ]
  }
];

const receiptTasks = [
  {
    id: "1000000098",
    status: "已派工",
    deliveryCount: 1,
    materialCount: 1,
    executor: "张三",
    device: "",
    deviceType: "",
    forkliftType: "平叉",
    forkliftLoadLimit: "3T",
    appointmentNo: "2411151642",
    deliveryNo: "018001300",
    deliveryItem: "000010",
    plant: "7003",
    warehouseNo: "104",
    inventoryLocation: "1101",
    storageType: "A01",
    bin: "A01-DSL03",
    platform: "-",
    stagingPoint: "-",
    area: "PM1",
    material: "30000103",
    description: "长纤化学浆(NBKP) 白云",
    unit: "TO",
    packageType: "A 散货类",
    taskQuantity: "12",
    driverName: "张三",
    vehicleName: "粤B8N0A2",
    vehicleType: "平板",
    createTime: "2026.05.06 08:10",
    logs: [
      { time: "2026.05.06 08:10:00", type: "生成任务", operator: "系统", description: "根据预约送货单生成采购收货任务" }
    ],
    devices: []
  },
  {
    id: "1000000099",
    status: "已派工",
    deliveryCount: 1,
    materialCount: 1,
    executor: "张三",
    device: "5110100022018A0",
    deviceType: "平叉",
    forkliftType: "平叉",
    forkliftLoadLimit: "3T",
    appointmentNo: "2411151642",
    deliveryNo: "018001300",
    deliveryItem: "000020",
    plant: "7003",
    warehouseNo: "104",
    inventoryLocation: "1101",
    storageType: "A01",
    bin: "A01-DSL01",
    platform: "-",
    stagingPoint: "-",
    area: "PM1",
    material: "30000102",
    description: "短纤化学浆(LBKP) LPPI 正品",
    unit: "TO",
    packageType: "B 包装袋类",
    taskQuantity: "8",
    driverName: "李四",
    vehicleName: "京A12345",
    vehicleType: "抱叉",
    createTime: "2026.05.06 08:18",
    logs: [
      { time: "2026.05.06 08:18:00", type: "生成任务", operator: "系统", description: "根据预约送货单生成采购收货任务" },
      { time: "2026.05.06 08:25:00", type: "派工", operator: "系统", description: "派给张三" },
      { time: "2026.05.06 08:30:00", type: "绑定设备", operator: "张三", description: "绑定平叉 5110100022018A0" }
    ],
    devices: [
      { device: "5110100022018A0", deviceType: "平叉", user: "张三", bindTime: "2026.05.06 08:30", reason: "-" }
    ]
  }
];

function activeTasks() {
  return currentTaskType === "receipt" ? receiptTasks : deliveryTasks;
}

function taskTypeTitle() {
  return currentTaskType === "receipt" ? "采购收货任务" : "厂内配送任务";
}

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
  if (status === "待接单" || status === "待派工") return "amber";
  if (status === "已派工") return "blue";
  if (status === "已完成") return "blue";
  return "gray";
}

function cardClass(task) {
  if (task.status === "执行中") return "running";
  if (task.status === "待接单" || task.status === "待派工") return "warning";
  if (task.status === "已取消") return "cancelled";
  return "";
}

// 当前登录司机在该任务上的角色：叉车 / 短驳（同一司机既可开叉车也可开短驳）
function taskMyRole(task) {
  return task.myRole === "短驳" ? "短驳" : "叉车";
}

// 短驳只能在叉车结束后开始（叉车先、短驳后）
function shuttleGated(task) {
  return taskMyRole(task) === "短驳" && task.status === "待接单" && !task.forkliftDone;
}

// 按角色给出设备类型下拉：叉车=抱叉/平叉/铲车，短驳=平板车/自卸车
function deviceTypeOptionsHtml(task) {
  const opts = taskMyRole(task) === "短驳" ? ["平板车", "自卸车"] : ["抱叉", "平叉", "铲车"];
  const current = task.deviceType || (taskMyRole(task) === "短驳" ? "平板车" : "平叉");
  return `<option value="">请选择</option>` + opts.map((opt) => `<option ${opt === current ? "selected" : ""}>${opt}</option>`).join("");
}

function defaultDeviceNo(task) {
  return task.device || (taskMyRole(task) === "短驳" ? "短驳-A08" : "5110100022018A9");
}

function changeDeviceNo(task) {
  return taskMyRole(task) === "短驳" ? "短驳-A09" : "5110100022018A0";
}

function filteredTasks() {
  const tasks = activeTasks();
  if (activeFilter === "all") return tasks;
  return tasks.filter((task) => task.status === activeFilter);
}

function getSelectedTask() {
  const tasks = activeTasks();
  return tasks.find((task) => task.id === selectedTaskId) || tasks[0];
}

function showView(viewName) {
  workbenchView.classList.toggle("hidden", viewName !== "workbench");
  moduleView.classList.toggle("hidden", viewName !== "module");
  taskView.classList.toggle("hidden", viewName !== "task");
  detailView.classList.toggle("hidden", viewName !== "detail");
  if (viewName === "task") {
    renderTasks();
  }
}

function renderCounts() {
  const tasks = activeTasks();
  const tabConfig = currentTaskType === "receipt"
    ? [["已派工", "已派工"]]
    : [["all", "全部"], ["待接单", "待接单"], ["执行中", "执行中"], ["已完成", "已完成"]];
  tabs.forEach((tab, index) => {
    const config = tabConfig[index];
    if (!config) {
      tab.classList.add("hidden");
      return;
    }
    tab.classList.remove("hidden");
    tab.dataset.filter = config[0];
    tab.innerHTML = `${config[1]} <strong data-count="${config[0]}">0</strong>`;
    tab.classList.toggle("active", activeFilter === config[0]);
  });
  document.querySelectorAll("[data-count]").forEach((item) => {
    const status = item.dataset.count;
    item.textContent = status === "all"
      ? tasks.length
      : tasks.filter((task) => task.status === status).length;
  });
}

function renderTasks() {
  if (!filteredTasks().length) {
    activeFilter = currentTaskType === "receipt" ? "已派工" : "all";
  }
  renderCounts();
  taskPageTitle.textContent = taskTypeTitle();
  taskList.innerHTML = filteredTasks().map((task) => {
    return currentTaskType === "receipt"
      ? renderReceiptTaskCard(task)
      : renderDeliveryTaskCard(task);
  }).join("");
}

function renderTaskHeader(task) {
  const selected = task.id === selectedTaskId ? "selected" : "";
  return `<article class="task-card ${selected} ${cardClass(task)}" data-task-id="${task.id}">
    <div class="task-top">
      <span class="task-no">${task.id}</span>
      <span class="badge ${badgeClass(task.status)}">${task.status}</span>
    </div>`;
}

function renderTaskStats(task, equipment) {
  return `<div class="task-stats">
    <div><span>配送单数</span><strong>${task.deliveryCount}</strong></div>
    <div><span>物料项数</span><strong>${task.materialCount}</strong></div>
    <div><span>叉车要求</span><strong class="equipment-line">${equipmentTypeBadges(equipment.forkliftTypes)} <em>${equipmentLoadText(equipment.forkliftLoads)}</em></strong></div>
    <div><span>短驳要求</span><strong class="equipment-line">${equipmentTypeBadges(equipment.shortHaulTypes)} <em>${equipmentLoadText(equipment.shortHaulLoads)}</em></strong></div>
  </div>`;
}

function renderReceiptTaskStats(task) {
  return `<div class="task-stats">
    <div><span>叉车要求</span><strong class="equipment-line">${equipmentTypeBadges([task.forkliftType || "-"])} <em>${equipmentLoadText([task.forkliftLoadLimit || "-"])}</em></strong></div>
  </div>`;
}

function renderDeliveryTaskCard(task) {
  const equipment = taskEquipmentSummary(task);
  const isShuttle = taskMyRole(task) === "短驳";
  const gated = shuttleGated(task);
  const roleBadge = `<span class="badge ${isShuttle ? "blue" : "cyan"}">我：${isShuttle ? "短驳司机" : "叉车司机"}</span>`;
  // 需短驳的任务额外显示对方角色的司机（我是叉车→显示短驳司机，反之亦然），同样高亮成徽标
  const peerName = isShuttle ? (task.forkliftDriver || "-") : (task.shuttleDriver || "-");
  const peerRole = isShuttle ? "叉车司机" : "短驳司机";
  const peerBadgeClass = isShuttle ? "cyan" : "blue";
  const peerLine = task.needShuttle
    ? `<span class="badge ${peerBadgeClass}">${peerName}：${peerRole}</span>`
    : "";
  return `
    ${renderTaskHeader(task)}
      <div class="task-role-line">${roleBadge}${peerLine}</div>
      ${renderTaskStats(task, equipment)}
      ${gated ? `<p class="shuttle-gate-hint">⚠ 需等叉车司机（${task.forkliftDriver || "-"}）结束后，短驳才能开始</p>` : ""}
      <div class="task-card-actions">
        <button type="button" data-task-action="start" ${task.status === "待接单" && !gated ? "" : "disabled"}>开始</button>
        <button type="button" data-task-action="device" ${task.status === "执行中" ? "" : "disabled"}>变更设备</button>
        <button type="button" data-task-action="finish" ${task.status === "执行中" ? "" : "disabled"}>结束</button>
        <button type="button" data-task-action="detail">详情</button>
      </div>
    </article>
  `;
}

function renderReceiptTaskCard(task) {
  return `
    ${renderTaskHeader(task)}
      ${renderReceiptTaskStats(task)}
      <div class="task-card-actions compact">
        <button type="button" data-task-action="bind" ${task.device ? "disabled" : ""}>绑定设备</button>
        <button type="button" data-task-action="device" ${task.device ? "" : "disabled"}>变更设备</button>
        <button type="button" data-task-action="detail">详情</button>
      </div>
    </article>
  `;
}

function setActiveFilter(filter) {
  activeFilter = filter;
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.filter === filter));
  renderTasks();
}

function fillDetailPage(task) {
  detailTaskTitle.textContent = task.id;
  detailTaskSummary.textContent = `${taskTypeTitle()} · ${task.status}`;
  if (currentTaskType === "receipt") {
    const fields = [
      ["任务单号", task.id],
      ["派工状态", task.status],
      ["叉车类型", task.forkliftType],
      ["叉车载重限制", task.forkliftLoadLimit],
      ["执行人", task.executor],
      ["当前设备号", task.device || "-"],
      ["当前设备类型", task.deviceType || "-"],
      ["预约送货单号", task.appointmentNo],
      ["交货单", task.deliveryNo],
      ["交货项目", task.deliveryItem],
      ["工厂", task.plant],
      ["仓库号", task.warehouseNo],
      ["库存地点", task.inventoryLocation],
      ["仓储类型", task.storageType],
      ["仓位", task.bin],
      ["卸货平台", task.platform],
      ["集散点", task.stagingPoint],
      ["区域", task.area],
      ["物料", task.material],
      ["描述", task.description],
      ["基本单位", task.unit],
      ["包装类型", task.packageType],
      ["任务数量", task.taskQuantity]
    ];
    detailPageList.innerHTML = `
      <article class="detail-delivery-card">
        <strong>${task.id}</strong>
        <div class="detail-delivery-grid">${fields.map(([label, value]) => {
          if (label === "叉车类型") return `<span>${label}</span><b>${equipmentTypeBadge(value)}</b>`;
          if (label === "任务数量") return `<span>${label}</span><b><em class="qty-highlight actual">${value || "-"}</em></b>`;
          return `<span>${label}</span><b>${value || "-"}</b>`;
        }).join("")}</div>
      </article>
    `;
    return;
  }
  const roleText = task.needShuttle ? ` · 我:${taskMyRole(task) === "短驳" ? "短驳司机" : "叉车司机"}` : "";
  detailTaskSummary.textContent = `${task.status} · ${task.deliveryCount} 张配送单 · ${task.materialCount} 项物料${roleText}`;
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
  showView("detail");
  renderTasks();
}

function closeDetailPage() {
  showView("task");
}

function readonlyLine(label, value) {
  return `<div class="readonly-line"><span>${label}</span><strong>${value || "-"}</strong></div>`;
}

function actionTemplate(action, task) {
  if (action === "start" || action === "bind") {
    return `
      ${readonlyLine("任务单号", task.id)}
      <label class="required"><span>设备号</span><input id="action-device" value="${defaultDeviceNo(task)}" autocomplete="off" required></label>
      <label class="required"><span>设备类型</span><select id="action-device-type" required>${deviceTypeOptionsHtml(task)}</select></label>
      <label><span>备注</span><textarea id="action-remark" placeholder=""></textarea></label>
    `;
  }
  if (action === "finish") {
    return `
      ${readonlyLine("任务单号", task.id)}
      ${readonlyLine("设备号", defaultDeviceNo(task))}
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
    ${readonlyLine("原设备号", defaultDeviceNo(task))}
    <label class="required"><span>新设备号</span><input id="action-device" value="${changeDeviceNo(task)}" required></label>
    <label class="required"><span>设备类型</span><select id="action-device-type" required>${deviceTypeOptionsHtml(task)}</select></label>
    <label><span>变更原因</span><textarea id="action-remark">原设备故障，更换设备</textarea></label>
  `;
}

function openAction(action, task = getSelectedTask()) {
  selectedTaskId = task.id;
  currentAction = action;
  const titles = { start: "任务开始", bind: "绑定设备", finish: "任务结束", device: "变更设备" };
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
  if (currentAction === "start" || currentAction === "bind") {
    if (currentAction === "start" && shuttleGated(task)) {
      showToast("需等叉车司机结束后再开始短驳");
      return;
    }
    if (!requireActionValue("#action-device", "请输入设备号")) return;
    if (!requireActionValue("#action-device-type", "请选择设备类型")) return;
    if (currentAction === "start") {
      task.status = "执行中";
      task.startAt = nowText();
    }
    task.device = document.querySelector("#action-device")?.value || task.device;
    task.deviceType = document.querySelector("#action-device-type")?.value || task.deviceType;
    showToast(currentAction === "bind" ? "设备绑定已提交" : "任务已开始");
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
    task.deviceType = document.querySelector("#action-device-type")?.value || task.deviceType;
    showToast("设备变更已提交");
  }
  closeAction();
  if (!detailView.classList.contains("hidden")) {
    fillDetailPage(task);
  }
  renderTasks();
}

openPlatformBtn.addEventListener("click", () => showView("module"));
moduleBackBtn.addEventListener("click", () => showView("workbench"));
openDeliveryTaskBtn.addEventListener("click", () => {
  currentTaskType = "delivery";
  activeFilter = "all";
  selectedTaskId = deliveryTasks[0].id;
  setActiveFilter("all");
  showView("task");
});
openReceiptTaskBtn.addEventListener("click", () => {
  currentTaskType = "receipt";
  activeFilter = "已派工";
  selectedTaskId = receiptTasks[0].id;
  setActiveFilter("已派工");
  showView("task");
});
taskBackBtn.addEventListener("click", () => showView("module"));

logoutBtn.addEventListener("click", () => {
  showView("workbench");
});

detailBackBtn.addEventListener("click", closeDetailPage);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveFilter(tab.dataset.filter));
});

taskList.addEventListener("click", (event) => {
  const card = event.target.closest(".task-card");
  if (!card) return;
  const task = activeTasks().find((item) => item.id === card.dataset.taskId);
  if (!task) return;
  selectedTaskId = task.id;
  const action = event.target.dataset.taskAction;
  if (action === "start") {
    openAction("start", task);
  } else if (action === "bind") {
    openAction("bind", task);
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
