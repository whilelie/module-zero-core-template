const navItems = document.querySelectorAll(".nav-item");
const pagePanels = document.querySelectorAll(".page-panel");
const toastButtons = document.querySelectorAll("[data-toast]");
const splitModal = document.querySelector("#split-modal");
const trialModal = document.querySelector("#trial-modal");
const employeeModal = document.querySelector("#employee-modal");
const taskRankModal = document.querySelector("#task-rank-modal");
const skillRankModal = document.querySelector("#skill-rank-modal");
const skillMetricRankModal = document.querySelector("#skill-metric-rank-modal");
const operationCostModal = document.querySelector("#operation-cost-modal");
const operationCostImportModal = document.querySelector("#operation-cost-import-modal");
const loadingLimitModal = document.querySelector("#loading-limit-modal");
const loadingLimitImportModal = document.querySelector("#loading-limit-import-modal");
const shortHaulModal = document.querySelector("#short-haul-modal");
const shortHaulImportModal = document.querySelector("#short-haul-import-modal");
const sourceResultModal = document.querySelector("#source-result-modal");
const taskAssignModal = document.querySelector("#task-assign-modal");
const taskCancelModal = document.querySelector("#task-cancel-modal");
const taskStartModal = document.querySelector("#task-start-modal");
const taskFinishModal = document.querySelector("#task-finish-modal");
const taskDeviceModal = document.querySelector("#task-device-modal");
const taskDetailModal = document.querySelector("#task-detail-modal");
const operationCostTitle = document.querySelector("#operation-cost-title");
const loadingLimitTitle = document.querySelector("#loading-limit-title");
const shortHaulTitle = document.querySelector("#short-haul-title");
const taskAssignTitle = document.querySelector("#task-assign-title");
const employeeTitle = document.querySelector("#employee-title");
const currentTabTitle = document.querySelector("#current-tab-title");
const toast = document.querySelector("#toast");
const shiftSelect = document.querySelector("[data-shift-select]");
const businessSlots = document.querySelectorAll("[data-business-slot]");
const costMaterialInput = document.querySelector("[data-cost-material]");
const costDescriptionInput = document.querySelector("[data-cost-description]");
const costUnitInput = document.querySelector("[data-cost-unit]");
const costFactoryInput = document.querySelector("[data-cost-factory]");
const limitMaterialInput = document.querySelector("[data-limit-material]");
const limitDescriptionInput = document.querySelector("[data-limit-description]");
const limitUnitInput = document.querySelector("[data-limit-unit]");
const shortHaulMaterialInput = document.querySelector("[data-short-haul-material]");
const shortHaulDescriptionInput = document.querySelector("[data-short-haul-description]");
const shortHaulUnitInput = document.querySelector("[data-short-haul-unit]");
const trialBatchAction = document.querySelector("[data-trial-batch-action]");
const taskGenerationAction = document.querySelector("[data-confirm-task-generation]");
const taskAssignConfirm = document.querySelector("[data-confirm-task-assign]");
const taskStartConfirm = document.querySelector("[data-confirm-task-start]");
const taskDeviceConfirm = document.querySelector("[data-confirm-task-device]");

window.prototypeAppVersion = "20260708-task-log-device-type1";

const shiftBusinessSlots = {
  "夜班": ["0:00~4:00", "4:00~8:00"],
  "中班": ["16:00~20:00", "20:00~24:00"],
  "早班": ["8:00~12:00", "12:00~16:00"]
};

const materialInfo = {
  "1100000021": {
    description: "LNG天然气 热值≥9200Kcal/NM3",
    unit: "TO"
  },
  "20000002": {
    description: "木片 桉木 中国 广西",
    unit: "TO"
  },
  "20000003": {
    description: "木片 桉木 中国 海南",
    unit: "TO"
  },
  "1000000067": {
    description: "阴离子聚丙烯酰胺（工业用）",
    unit: "KG"
  },
  "1000000023": {
    description: "聚合氯化铝PAC AL2O3含量≥10% 工业级",
    unit: "KG"
  },
  "1200000001": {
    description: "化学浆用生石灰 CAO含量≥90% 二氧化硅含量≤1.2%",
    unit: "KG"
  }
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

function setFieldText(field, value) {
  if (!field) return;
  if ("value" in field) {
    field.value = value;
  } else {
    field.textContent = value;
  }
}

function requireModalValue(modal, selector, message) {
  const field = modal?.querySelector(selector);
  if (!field?.value) {
    showToast(message);
    field?.focus();
    return false;
  }
  return true;
}

function updateBusinessSlots() {
  if (!shiftSelect || businessSlots.length < 2) return;
  const slots = shiftBusinessSlots[shiftSelect.value] || shiftBusinessSlots["夜班"];
  businessSlots[0].textContent = slots[0];
  businessSlots[1].textContent = slots[1];
}

function updateMaterialInfo() {
  if (!costMaterialInput || !costDescriptionInput || !costUnitInput) return;
  const info = materialInfo[costMaterialInput.value.trim()];
  setElementValue(costDescriptionInput, info?.description || "");
  setElementValue(costUnitInput, info?.unit || "");
}

function updateLimitMaterialInfo() {
  if (!limitMaterialInput || !limitDescriptionInput || !limitUnitInput) return;
  const info = materialInfo[limitMaterialInput.value.trim()];
  setElementValue(limitDescriptionInput, info?.description || "");
  setElementValue(limitUnitInput, info?.unit || "");
}

function updateShortHaulMaterialInfo() {
  if (!shortHaulMaterialInput || !shortHaulDescriptionInput || !shortHaulUnitInput) return;
  const info = materialInfo[shortHaulMaterialInput.value.trim()];
  setElementValue(shortHaulDescriptionInput, info?.description || "");
  setElementValue(shortHaulUnitInput, info?.unit || "");
}

function setElementValue(element, value) {
  if ("value" in element) {
    element.value = value;
  } else {
    element.textContent = value;
  }
}

const buttonIcons = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"></path><path d="m7 8 5-5 5 5"></path><path d="M5 21h14"></path></svg>',
  reset: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 4v7h7"></path></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m20 6-11 11-5-5"></path></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
  save: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"></path><path d="M17 21v-8H7v8"></path><path d="M7 3v5h8"></path></svg>',
  play: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 5v14l11-7Z"></path></svg>'
};

function getButtonIconName(text) {
  if (text.includes("查询")) return "search";
  if (text.includes("新增")) return "plus";
  if (text.includes("下载")) return "download";
  if (text.includes("导入")) return "upload";
  if (text.includes("重置") || text.includes("重新")) return "reset";
  if (text.includes("保存")) return "save";
  if (text.includes("取消") || text.includes("关闭")) return "close";
  if (text.includes("执行") || text.includes("拆分") || text.includes("绑定")) return "play";
  if (text.includes("确认") || text.includes("确定")) return "check";
  return "";
}

function decorateButtonIcons() {
  document.querySelectorAll(".btn").forEach((button) => {
    if (button.querySelector(".btn-icon")) return;
    const iconName = getButtonIconName(button.textContent.trim());
    if (!iconName) return;
    const icon = document.createElement("span");
    icon.className = "btn-icon";
    icon.innerHTML = buttonIcons[iconName];
    button.prepend(icon);
  });
}

function parseAmount(value) {
  const parsed = Number(String(value || "").replace(/,/g, "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function updateAllocationRowStatus() {
  const demandRows = document.querySelectorAll("#trial-modal .trial-demand-table tbody tr");
  const allocationRows = document.querySelectorAll("#trial-modal .trial-allocation-table tbody tr.allocation-main-row");
  if (!demandRows.length || !allocationRows.length) return;

  const demandByLine = new Map();

  demandRows.forEach((row) => {
    const cells = row.children;
    const lineNo = cells[4]?.textContent.trim();
    const qty = parseAmount(cells[7]?.textContent);
    demandByLine.set(lineNo, qty);
  });

  allocationRows.forEach((row) => {
    const cells = row.children;
    const lineNo = cells[3]?.textContent.trim();
    const input = cells[10]?.querySelector("input");
    const confirmed = parseAmount(input?.value);
    const demand = demandByLine.get(lineNo) || 0;
    const satisfied = demand > 0 && confirmed >= demand;
    row.classList.toggle("allocation-satisfied", satisfied);
    row.classList.toggle("allocation-unsatisfied", !satisfied);
  });
}

function updateDeliverySplitBox(box) {
  if (!box) return;
  const inputs = box.querySelectorAll(".split-qty-input");
  const sum = Array.from(inputs).reduce((total, input) => total + parseAmount(input.value), 0);
  const limit = parseAmount(box.querySelector("[data-split-limit]")?.textContent);
  const sumNode = box.querySelector("[data-split-sum]");
  const totalNode = box.querySelector("[data-split-total]");
  const targetNode = box.querySelector("[data-split-target]");
  inputs.forEach((input) => {
    const tipCell = input.closest("tr")?.children[2];
    if (!tipCell) return;
    tipCell.innerHTML = limit > 0 && parseAmount(input.value) > limit ? '<span class="split-warning">超上限</span>' : "";
  });
  if (sumNode) sumNode.textContent = sum;
  if (totalNode) totalNode.textContent = sum;
  if (targetNode && !targetNode.textContent.trim()) targetNode.textContent = sum;
}

function createDeliverySplitRow(index) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>配送单${index}</td><td><input class="split-qty-input" value=""></td><td></td><td><button class="link-btn danger" data-remove-delivery-split>删除</button></td>`;
  return row;
}

function updateSplitRowStatus() {
  const splitRows = document.querySelectorAll("#split-modal .split-current-table tbody tr");
  splitRows.forEach((row) => {
    const cells = row.children;
    const input = cells[5]?.querySelector("input");
    const satisfied = parseAmount(input?.value) > 0;
    row.classList.toggle("split-satisfied", satisfied);
    row.classList.toggle("split-unsatisfied", !satisfied);
  });
}

function getTrialRowCheckboxes() {
  return Array.from(document.querySelectorAll("#demand-trial tbody .select-col input[type='checkbox']"));
}

function updateTrialBatchActionLabel() {
  if (!trialBatchAction) return;
  const selectedCount = getTrialRowCheckboxes().filter((checkbox) => checkbox.checked).length;
  const label = selectedCount > 0 ? `执行试算+${selectedCount}` : "执行试算";
  const icon = trialBatchAction.querySelector(".btn-icon");
  trialBatchAction.textContent = label;
  if (icon) {
    trialBatchAction.prepend(icon);
  }
}

function updateTrialSelectAllState() {
  const selectAll = document.querySelector("#demand-trial thead .select-col input[type='checkbox']");
  const rowCheckboxes = getTrialRowCheckboxes();
  if (!selectAll || !rowCheckboxes.length) return;
  const selectedCount = rowCheckboxes.filter((checkbox) => checkbox.checked).length;
  selectAll.checked = selectedCount === rowCheckboxes.length;
  selectAll.indeterminate = selectedCount > 0 && selectedCount < rowCheckboxes.length;
}

function updateTrialSelectionUi() {
  updateTrialBatchActionLabel();
  updateTrialSelectAllState();
}

function getTaskGenerationCheckboxes() {
  return Array.from(document.querySelectorAll("#delivery-binding tbody .select-col input[type='checkbox']"));
}

function updateTaskGenerationActionLabel() {
  if (!taskGenerationAction) return;
  const selectedCount = getTaskGenerationCheckboxes().filter((checkbox) => checkbox.checked).length;
  const label = selectedCount > 0 ? `生成任务+${selectedCount}` : "生成任务";
  const icon = taskGenerationAction.querySelector(".btn-icon");
  taskGenerationAction.textContent = label;
  if (icon) {
    taskGenerationAction.prepend(icon);
  }
}

function updateTaskGenerationSelectAllState() {
  const selectAll = document.querySelector("#delivery-binding thead .select-col input[type='checkbox']");
  const rowCheckboxes = getTaskGenerationCheckboxes();
  if (!selectAll || !rowCheckboxes.length) return;
  const selectedCount = rowCheckboxes.filter((checkbox) => checkbox.checked).length;
  selectAll.checked = selectedCount === rowCheckboxes.length;
  selectAll.indeterminate = selectedCount > 0 && selectedCount < rowCheckboxes.length;
}

function updateTaskGenerationSelectionUi() {
  updateTaskGenerationActionLabel();
  updateTaskGenerationSelectAllState();
}

navItems.forEach((item) => {
  item.addEventListener("click", () => showPage(item.dataset.page));
});

document.querySelectorAll("[data-switch-trial]").forEach((button) => {
  button.addEventListener("click", () => showPage("demand-trial"));
});

document.querySelectorAll("[data-expand-row]").forEach((button) => {
  button.addEventListener("click", () => {
    const summaryRow = button.closest("tr");
    const detailRow = summaryRow?.nextElementSibling;
    if (!detailRow || !detailRow.classList.contains("detail-row")) return;
    const expanded = !detailRow.hidden;
    detailRow.hidden = expanded;
    summaryRow.classList.toggle("expanded", !expanded);
    button.textContent = expanded ? "＋" : "－";
  });
});

function setAllDetailRows(expanded) {
  document.querySelectorAll(".summary-row").forEach((summaryRow) => {
    const detailRow = summaryRow.nextElementSibling;
    const button = summaryRow.querySelector("[data-expand-row]");
    if (!detailRow || !detailRow.classList.contains("detail-row") || !button) return;
    detailRow.hidden = !expanded;
    summaryRow.classList.toggle("expanded", expanded);
    button.textContent = expanded ? "－" : "＋";
  });
}

document.querySelectorAll("[data-toggle-all-expanded]").forEach((button) => {
  button.addEventListener("click", () => {
    const expandAll = button.textContent.trim() === "＋";
    setAllDetailRows(expandAll);
    button.textContent = expandAll ? "－" : "＋";
    button.setAttribute("aria-label", expandAll ? "全部收起" : "全部展开");
  });
});

document.querySelectorAll("[data-open-split]").forEach((button) => {
  button.addEventListener("click", () => {
    openModal(splitModal);
    updateSplitRowStatus();
  });
});

document.querySelectorAll("[data-open-employee]").forEach((button) => {
  button.addEventListener("click", () => {
    if (employeeTitle) {
      employeeTitle.textContent = button.closest("tr") ? "修改员工" : "新增员工";
    }
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

document.querySelectorAll("[data-dispatch-rule-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.dispatchRuleTab;
    document.querySelectorAll("[data-dispatch-rule-tab]").forEach((tab) => {
      tab.classList.toggle("active", tab === button);
    });
    document.querySelectorAll(".dispatch-rule-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === targetId);
    });
  });
});

document.querySelectorAll("[data-open-operation-cost]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const cells = row ? Array.from(row.children) : [];
    if (operationCostTitle) {
      operationCostTitle.textContent = cells.length ? "修改作业成本" : "新增作业成本";
    }
    if (costMaterialInput) {
      costMaterialInput.value = cells.length ? cells[0].textContent.trim() : "";
      updateMaterialInfo();
    }
    if (costFactoryInput) {
      costFactoryInput.value = cells.length ? cells[3].textContent.trim() : "200A";
    }
    openModal(operationCostModal);
  });
});

document.querySelectorAll("[data-open-loading-limit]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const cells = row ? Array.from(row.children) : [];
    if (loadingLimitTitle) {
      loadingLimitTitle.textContent = cells.length ? "修改装载限制" : "新增装载限制";
    }
    if (limitMaterialInput) {
      limitMaterialInput.value = cells.length ? cells[0].textContent.trim() : "";
      updateLimitMaterialInfo();
    }
    openModal(loadingLimitModal);
  });
});

document.querySelectorAll("[data-open-short-haul]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const cells = row ? Array.from(row.children) : [];
    if (shortHaulTitle) {
      shortHaulTitle.textContent = cells.length ? "修改厂内作业车辆配置" : "新增厂内作业车辆配置";
    }
    if (shortHaulMaterialInput) {
      shortHaulMaterialInput.value = button.dataset.shortHaulRowMaterial || (cells.length ? cells[0].textContent.trim() : "");
      updateShortHaulMaterialInfo();
    }
    openModal(shortHaulModal);
  });
});

document.querySelectorAll("[data-open-operation-cost-import]").forEach((button) => {
  button.addEventListener("click", () => openModal(operationCostImportModal));
});

document.querySelectorAll("[data-open-loading-limit-import]").forEach((button) => {
  button.addEventListener("click", () => openModal(loadingLimitImportModal));
});

document.querySelectorAll("[data-open-short-haul-import]").forEach((button) => {
  button.addEventListener("click", () => openModal(shortHaulImportModal));
});

document.querySelectorAll("[data-open-source-result]").forEach((button) => {
  button.addEventListener("click", () => openModal(sourceResultModal));
});

document.querySelectorAll("[data-open-task-assign]").forEach((button) => {
  button.addEventListener("click", () => {
    if (taskAssignTitle) {
      taskAssignTitle.textContent = `任务${button.dataset.taskAction || "派工"}`;
    }
    const row = button.closest("tr");
    const taskNo = row?.children[0]?.textContent.trim() || "";
    const taskNoField = taskAssignModal?.querySelector("[data-task-no]");
    const assigneeSelect = taskAssignModal?.querySelector("[data-task-assignee]");
    if (taskNoField) {
      taskNoField.textContent = taskNo;
    }
    if (assigneeSelect) {
      assigneeSelect.value = "";
    }
    openModal(taskAssignModal);
  });
});

taskAssignConfirm?.addEventListener("click", () => {
  const assigneeSelect = taskAssignModal?.querySelector("[data-task-assignee]");
  if (!assigneeSelect?.value) {
    showToast("请选择执行人");
    assigneeSelect?.focus();
    return;
  }
  showToast("任务派工已提交");
  closeModal(taskAssignModal);
});

document.querySelectorAll("[data-open-task-cancel]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const taskNo = row?.children[0]?.textContent.trim() || "";
    setFieldText(taskCancelModal?.querySelector("[data-task-cancel-no]"), taskNo);
    openModal(taskCancelModal);
  });
});

const bindTaskNoModal = (selector, modal, inputSelector) => {
  document.querySelectorAll(selector).forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      const taskNo = row?.children[0]?.textContent.trim() || "";
      const taskInput = modal?.querySelector(inputSelector);
      setFieldText(taskInput, taskNo);
      openModal(modal);
    });
  });
};

bindTaskNoModal("[data-open-task-start]", taskStartModal, "[data-task-start-no]");
bindTaskNoModal("[data-open-task-finish]", taskFinishModal, "[data-task-finish-no]");
bindTaskNoModal("[data-open-task-device]", taskDeviceModal, "[data-task-device-no]");

taskStartConfirm?.addEventListener("click", () => {
  if (!requireModalValue(taskStartModal, "[data-task-start-device]", "请输入设备号")) return;
  if (!requireModalValue(taskStartModal, "[data-task-start-device-type]", "请选择设备类型")) return;
  showToast("任务已开始");
  closeModal(taskStartModal);
});

taskDeviceConfirm?.addEventListener("click", () => {
  if (!requireModalValue(taskDeviceModal, "[data-task-new-device]", "请输入新设备号")) return;
  if (!requireModalValue(taskDeviceModal, "[data-task-device-type]", "请选择设备类型")) return;
  showToast("设备变更已提交");
  closeModal(taskDeviceModal);
});

document.querySelectorAll("[data-open-task-detail]").forEach((button) => {
  button.addEventListener("click", () => {
    taskDetailModal?.querySelectorAll("[data-task-detail-tab]").forEach((tab, index) => {
      tab.classList.toggle("active", index === 0);
    });
    taskDetailModal?.querySelectorAll(".task-detail-tab-panel").forEach((panel, index) => {
      panel.classList.toggle("active", index === 0);
    });
    openModal(taskDetailModal);
  });
});

document.querySelectorAll("[data-task-detail-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.taskDetailTab;
    const modal = button.closest(".modal-backdrop");
    modal?.querySelectorAll("[data-task-detail-tab]").forEach((tab) => {
      tab.classList.toggle("active", tab === button);
    });
    modal?.querySelectorAll(".task-detail-tab-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === targetId);
    });
  });
});

document.querySelectorAll("[data-confirm-task-generation]").forEach((button) => {
  button.addEventListener("click", () => {
    if (window.confirm("确定要生成任务吗？")) {
      showToast("已生成仓储任务");
    }
  });
});

if (shiftSelect) {
  shiftSelect.addEventListener("change", updateBusinessSlots);
  updateBusinessSlots();
}

if (costMaterialInput) {
  costMaterialInput.addEventListener("input", updateMaterialInfo);
  costMaterialInput.addEventListener("change", updateMaterialInfo);
  updateMaterialInfo();
}

if (limitMaterialInput) {
  limitMaterialInput.addEventListener("input", updateLimitMaterialInfo);
  limitMaterialInput.addEventListener("change", updateLimitMaterialInfo);
  updateLimitMaterialInfo();
}

if (shortHaulMaterialInput) {
  shortHaulMaterialInput.addEventListener("input", updateShortHaulMaterialInfo);
  shortHaulMaterialInput.addEventListener("change", updateShortHaulMaterialInfo);
  updateShortHaulMaterialInfo();
}

decorateButtonIcons();

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
    updateAllocationRowStatus();
    showToast("已执行试算，货源分配结果已更新");
  });
});

document.querySelectorAll("#demand-trial tbody .select-col input[type='checkbox']").forEach((checkbox) => {
  checkbox.addEventListener("change", updateTrialSelectionUi);
});

document.querySelectorAll("#demand-trial thead .select-col input[type='checkbox']").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    getTrialRowCheckboxes().forEach((rowCheckbox) => {
      rowCheckbox.checked = checkbox.checked;
    });
    updateTrialSelectionUi();
  });
});

document.querySelectorAll("#delivery-binding tbody .select-col input[type='checkbox']").forEach((checkbox) => {
  checkbox.addEventListener("change", updateTaskGenerationSelectionUi);
});

document.querySelectorAll("#delivery-binding thead .select-col input[type='checkbox']").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    getTaskGenerationCheckboxes().forEach((rowCheckbox) => {
      rowCheckbox.checked = checkbox.checked;
    });
    updateTaskGenerationSelectionUi();
  });
});

document.querySelectorAll("#trial-modal .trial-allocation-table input").forEach((input) => {
  input.addEventListener("input", updateAllocationRowStatus);
});

document.querySelectorAll(".delivery-split-box").forEach(updateDeliverySplitBox);

document.querySelectorAll("[data-toggle-delivery-split]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const detailRow = row?.nextElementSibling;
    if (!detailRow?.classList.contains("delivery-split-row")) return;
    const collapsed = detailRow.classList.toggle("is-hidden");
    button.textContent = collapsed ? "+" : "-";
    button.setAttribute("aria-expanded", String(!collapsed));
  });
});

document.querySelectorAll("#trial-modal [data-toggle-trial-section]").forEach((header) => {
  header.addEventListener("click", () => {
    const panel = header.closest("[data-collapsible-section]");
    if (!panel) return;
    const collapsed = panel.classList.toggle("is-collapsed");
    const button = header.querySelector(".collapse-toggle");
    if (button) {
      button.textContent = collapsed ? "+" : "-";
      button.setAttribute("aria-label", collapsed ? "展开内容" : "折叠内容");
    }
  });
});

document.querySelectorAll("#split-modal [data-toggle-split-section]").forEach((header) => {
  header.addEventListener("click", () => {
    const section = header.closest("[data-split-collapsible-section]");
    if (!section) return;
    const collapsed = section.classList.toggle("is-collapsed");
    const button = header.querySelector(".collapse-toggle");
    if (button) {
      button.textContent = collapsed ? "+" : "-";
      button.setAttribute("aria-label", collapsed ? "展开内容" : "折叠内容");
    }
  });
});

document.querySelectorAll(".delivery-split-box").forEach((box) => {
  box.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add-delivery-split]");
    const removeButton = event.target.closest("[data-remove-delivery-split]");
    if (addButton) {
      const tbody = box.querySelector(".delivery-split-table tbody");
      if (!tbody) return;
      tbody.appendChild(createDeliverySplitRow(tbody.children.length + 1));
      updateDeliverySplitBox(box);
    }
    if (removeButton) {
      const row = removeButton.closest("tr");
      row?.remove();
      box.querySelectorAll(".delivery-split-table tbody tr").forEach((splitRow, index) => {
        splitRow.children[0].textContent = `配送单${index + 1}`;
      });
      updateDeliverySplitBox(box);
    }
  });

  box.addEventListener("input", (event) => {
    if (event.target.matches(".split-qty-input")) updateDeliverySplitBox(box);
  });
});

document.querySelectorAll("#split-modal .split-current-table input").forEach((input) => {
  input.addEventListener("input", updateSplitRowStatus);
});

toastButtons.forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});

updateAllocationRowStatus();
updateTrialSelectionUi();
updateTaskGenerationSelectionUi();
updateSplitRowStatus();




