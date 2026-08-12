const navItems = document.querySelectorAll(".nav-item");
const pagePanels = document.querySelectorAll(".page-panel");
const toastButtons = document.querySelectorAll("[data-toast]");
const splitModal = document.querySelector("#split-modal");
const trialModal = document.querySelector("#trial-modal");
const employeeModal = document.querySelector("#employee-modal");
const employeeDutyImportModal = document.querySelector("#employee-duty-import-modal");
const taskRankModal = document.querySelector("#task-rank-modal");
const skillRankModal = document.querySelector("#skill-rank-modal");
const skillMetricRankModal = document.querySelector("#skill-metric-rank-modal");
const operationCostModal = document.querySelector("#operation-cost-modal");
const operationCostImportModal = document.querySelector("#operation-cost-import-modal");
const loadingLimitModal = document.querySelector("#loading-limit-modal");
const loadingLimitImportModal = document.querySelector("#loading-limit-import-modal");
const shortHaulModal = document.querySelector("#short-haul-modal");
const shortHaulImportModal = document.querySelector("#short-haul-import-modal");
const deviceSkillModal = document.querySelector("#device-skill-modal");
const paperMachineMapModal = document.querySelector("#paper-machine-map-modal");
const paperMachineMapImportModal = document.querySelector("#paper-machine-map-import-modal");
const sourceResultModal = document.querySelector("#source-result-modal");
const taskAssignModal = document.querySelector("#task-assign-modal");
const taskCancelModal = document.querySelector("#task-cancel-modal");
const taskStartModal = document.querySelector("#task-start-modal");
const taskFinishModal = document.querySelector("#task-finish-modal");
const taskDeviceModal = document.querySelector("#task-device-modal");
const taskDetailModal = document.querySelector("#task-detail-modal");
const receiptDetailModal = document.querySelector("#receipt-detail-modal");
const operationCostTitle = document.querySelector("#operation-cost-title");
const loadingLimitTitle = document.querySelector("#loading-limit-title");
const shortHaulTitle = document.querySelector("#short-haul-title");
const deviceSkillTitle = document.querySelector("#device-skill-title");
const paperMachineMapTitle = document.querySelector("#paper-machine-map-title");
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
const paperMachineMapTaskType = document.querySelector("[data-paper-machine-task-type]");
const paperMachineMapBasis = document.querySelector("[data-paper-machine-map-basis]");
const trialBatchAction = document.querySelector("[data-trial-batch-action]");
const taskGenerationAction = document.querySelector("[data-confirm-task-generation]");
const taskAssignConfirm = document.querySelector("[data-confirm-task-assign]");
const taskStartConfirm = document.querySelector("[data-confirm-task-start]");
const taskDeviceConfirm = document.querySelector("[data-confirm-task-device]");

window.prototypeAppVersion = "20260728-factory-columns";

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

function updatePaperMachineMapBasis() {
  if (!paperMachineMapModal || !paperMachineMapBasis) return;
  const isReceipt = paperMachineMapTaskType?.value === "receipt";
  paperMachineMapModal.querySelectorAll("[data-paper-machine-delivery-field]").forEach((field) => {
    field.hidden = isReceipt;
  });
  paperMachineMapModal.querySelectorAll("[data-paper-machine-receipt-field]").forEach((field) => {
    field.hidden = !isReceipt;
  });
  const deptInput = paperMachineMapModal.querySelector("[data-paper-machine-dept]");
  const mesInput = paperMachineMapModal.querySelector("[data-paper-machine-mes]");
  const storageTypeInput = paperMachineMapModal.querySelector("[data-paper-machine-storage-type]");
  const binInput = paperMachineMapModal.querySelector("[data-paper-machine-bin]");
  const useDept = paperMachineMapBasis.value === "dept";
  if (deptInput) {
    deptInput.disabled = isReceipt || !useDept;
    if (isReceipt || !useDept) deptInput.value = "";
  }
  if (mesInput) {
    mesInput.disabled = isReceipt || useDept;
    if (isReceipt || useDept) mesInput.value = "";
  }
  if (storageTypeInput) {
    storageTypeInput.disabled = !isReceipt;
    if (!isReceipt) storageTypeInput.value = "";
  }
  if (binInput) {
    binInput.disabled = !isReceipt;
    if (!isReceipt) binInput.value = "";
  }
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

document.querySelectorAll("[data-open-employee-duty-import]").forEach((button) => {
  button.addEventListener("click", () => openModal(employeeDutyImportModal));
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
      shortHaulTitle.textContent = cells.length ? "修改厂内作业设备配置" : "新增厂内作业设备配置";
    }
    if (shortHaulMaterialInput) {
      shortHaulMaterialInput.value = button.dataset.shortHaulRowMaterial || (cells.length ? cells[0].textContent.trim() : "");
      updateShortHaulMaterialInfo();
    }
    openModal(shortHaulModal);
  });
});

document.querySelectorAll("[data-open-device-skill]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const cells = row ? Array.from(row.children) : [];
    const factoryField = deviceSkillModal?.querySelector("[data-device-skill-factory]");
    const categoryField = deviceSkillModal?.querySelector("[data-device-skill-category]");
    const typeField = deviceSkillModal?.querySelector("[data-device-skill-type]");
    const skillField = deviceSkillModal?.querySelector("[data-device-skill-required]");
    const remarkField = deviceSkillModal?.querySelector("textarea");
    if (deviceSkillTitle) {
      deviceSkillTitle.textContent = cells.length ? "修改设备技能要求" : "新增设备技能要求";
    }
    if (factoryField) factoryField.value = cells.length ? cells[0].textContent.trim() : "2200";
    if (categoryField) categoryField.value = cells.length ? cells[1].textContent.trim() : "叉车";
    if (typeField) typeField.value = cells.length ? cells[2].textContent.trim() : "平叉";
    if (skillField) skillField.value = cells.length ? cells[3].textContent.trim() : "平叉";
    if (remarkField) remarkField.value = cells.length ? cells[4].textContent.trim() : "";
    openModal(deviceSkillModal);
  });
});

document.querySelectorAll("[data-open-paper-machine-map]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const cells = row ? Array.from(row.children) : [];
    const taskTypeField = paperMachineMapModal?.querySelector("[data-paper-machine-task-type]");
    const paperMachine = paperMachineMapModal?.querySelector("[data-paper-machine]");
    const deptInput = paperMachineMapModal?.querySelector("[data-paper-machine-dept]");
    const mesInput = paperMachineMapModal?.querySelector("[data-paper-machine-mes]");
    const storageTypeInput = paperMachineMapModal?.querySelector("[data-paper-machine-storage-type]");
    const binInput = paperMachineMapModal?.querySelector("[data-paper-machine-bin]");
    const remarkInput = paperMachineMapModal?.querySelector("[data-paper-machine-remark]");
    if (paperMachineMapTitle) {
      paperMachineMapTitle.textContent = cells.length ? "修改作业区域映射" : "新增作业区域映射";
    }
    const taskTypeValue = cells.length ? cells[0].textContent.trim() : "厂内配送任务";
    if (taskTypeField) taskTypeField.value = taskTypeValue === "采购收货任务" ? "receipt" : "delivery";
    if (paperMachine) paperMachine.value = cells.length ? cells[1].textContent.trim() : "宁波亚浆PM1区域";
    const deptValue = cells.length ? cells[2].textContent.trim() : "";
    const mesValue = cells.length ? cells[3].textContent.trim() : "NB0004";
    const storageTypeValue = cells.length ? cells[4].textContent.trim() : "";
    const binValue = cells.length ? cells[5].textContent.trim() : "";
    if (paperMachineMapBasis) {
      paperMachineMapBasis.value = deptValue && deptValue !== "-" ? "dept" : "mes";
    }
    if (deptInput) deptInput.value = deptValue === "-" ? "" : deptValue;
    if (mesInput) mesInput.value = mesValue === "-" ? "" : mesValue;
    if (storageTypeInput) storageTypeInput.value = storageTypeValue === "-" ? "" : storageTypeValue;
    if (binInput) binInput.value = binValue === "-" ? "" : binValue;
    if (remarkInput) remarkInput.value = cells.length ? cells[6].textContent.trim() : "PM1GCC";
    updatePaperMachineMapBasis();
    openModal(paperMachineMapModal);
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

document.querySelectorAll("[data-open-paper-machine-map-import]").forEach((button) => {
  button.addEventListener("click", () => openModal(paperMachineMapImportModal));
});

document.querySelectorAll("[data-confirm-paper-machine-map]").forEach((button) => {
  button.addEventListener("click", () => {
    const taskTypeField = paperMachineMapModal?.querySelector("[data-paper-machine-task-type]");
    const paperMachine = paperMachineMapModal?.querySelector("[data-paper-machine]");
    const deptInput = paperMachineMapModal?.querySelector("[data-paper-machine-dept]");
    const mesInput = paperMachineMapModal?.querySelector("[data-paper-machine-mes]");
    const storageTypeInput = paperMachineMapModal?.querySelector("[data-paper-machine-storage-type]");
    const binInput = paperMachineMapModal?.querySelector("[data-paper-machine-bin]");
    const isReceipt = taskTypeField?.value === "receipt";
    const hasDept = Boolean(deptInput?.value.trim());
    const hasMes = Boolean(mesInput?.value.trim());
    if (!taskTypeField?.value) {
      showToast("请选择任务类型");
      taskTypeField?.focus();
      return;
    }
    if (!paperMachine?.value) {
      showToast("请选择区域");
      paperMachine?.focus();
      return;
    }
    if (isReceipt) {
      if (!storageTypeInput?.value.trim()) {
        showToast("请输入仓储类型");
        storageTypeInput?.focus();
        return;
      }
      if (!binInput?.value.trim()) {
        showToast("请输入仓位");
        binInput?.focus();
        return;
      }
      showToast("作业区域映射已保存");
      closeModal(paperMachineMapModal);
      return;
    }
    if (hasDept === hasMes) {
      showToast("申请部门和MES仓位必须且只能填写一个");
      (paperMachineMapBasis?.value === "dept" ? deptInput : mesInput)?.focus();
      return;
    }
    showToast("作业区域映射已保存");
    closeModal(paperMachineMapModal);
  });
});

document.querySelectorAll("[data-confirm-device-skill]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!requireModalValue(deviceSkillModal, "[data-device-skill-factory]", "请输入工厂代码")) return;
    if (!requireModalValue(deviceSkillModal, "[data-device-skill-category]", "请选择设备大类")) return;
    if (!requireModalValue(deviceSkillModal, "[data-device-skill-type]", "请选择设备类型")) return;
    if (!requireModalValue(deviceSkillModal, "[data-device-skill-required]", "请选择所需技能")) return;
    closeModal(deviceSkillModal);
    showToast("设备技能要求已保存");
  });
});

document.querySelectorAll("[data-open-source-result]").forEach((button) => {
  button.addEventListener("click", () => openModal(sourceResultModal));
});

document.querySelectorAll("[data-open-task-assign]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.taskAction || "派工";
    const role = button.dataset.role;
    if (taskAssignTitle) {
      taskAssignTitle.textContent =
        action === "改派" && role ? `任务改派（${role}）` : `任务${action}`;
    }
    const row = button.closest("tr");
    const taskNo = row?.children[0]?.textContent.trim() || "";
    const taskNoField = taskAssignModal?.querySelector("[data-task-no]");
    if (taskNoField) {
      taskNoField.textContent = taskNo;
    }
    // 决定显示哪些司机下拉：
    // 派工 → 叉车（+需短驳则短驳）；改派（叉车）→ 只叉车；改派（短驳）→ 只短驳
    let config;
    if (action === "改派") {
      config = role === "短驳" ? { forklift: false, shuttle: true } : { forklift: true, shuttle: false };
    } else {
      config = { forklift: true, shuttle: row?.dataset.needShuttle === "1" };
    }
    configureAssignFields(config);
    openModal(taskAssignModal);
  });
});

// 配置派工/改派弹窗里的司机下拉显隐（叉车 / 短驳）
function configureAssignFields({ forklift, shuttle }) {
  const forkliftField = taskAssignModal?.querySelector("[data-forklift-assign-field]");
  const forkliftSelect = taskAssignModal?.querySelector("[data-task-assignee]");
  const shuttleField = taskAssignModal?.querySelector("[data-shuttle-assign-field]");
  const shuttleHint = taskAssignModal?.querySelector("[data-shuttle-assign-hint]");
  const shuttleSelect = taskAssignModal?.querySelector("[data-task-shuttle-assignee]");
  if (forkliftSelect) {
    forkliftSelect.value = "";
  }
  if (shuttleSelect) {
    shuttleSelect.value = "";
  }
  if (forkliftField) {
    forkliftField.hidden = !forklift;
  }
  if (shuttleField) {
    shuttleField.hidden = !shuttle;
  }
  // 提示只在派工同时派两个角色时显示
  if (shuttleHint) {
    shuttleHint.hidden = !(forklift && shuttle);
  }
}

taskAssignConfirm?.addEventListener("click", () => {
  const forkliftField = taskAssignModal?.querySelector("[data-forklift-assign-field]");
  const forkliftSelect = taskAssignModal?.querySelector("[data-task-assignee]");
  const shuttleField = taskAssignModal?.querySelector("[data-shuttle-assign-field]");
  const shuttleSelect = taskAssignModal?.querySelector("[data-task-shuttle-assignee]");
  if (forkliftField && !forkliftField.hidden && !forkliftSelect?.value) {
    showToast("请选择叉车司机");
    forkliftSelect?.focus();
    return;
  }
  if (shuttleField && !shuttleField.hidden && !shuttleSelect?.value) {
    showToast("请选择短驳司机");
    shuttleSelect?.focus();
    return;
  }
  showToast(`${taskAssignTitle?.textContent || "任务"}已提交`);
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

// 按角色重建设备类型下拉：叉车=抱叉/平叉/铲车，短驳=平板车/自卸车
function setDeviceTypeSelect(select, role) {
  if (!select) return;
  const opts = role === "短驳" ? ["平板车", "自卸车"] : ["抱叉", "平叉", "铲车"];
  select.innerHTML =
    '<option value="">请选择</option>' +
    opts.map((opt, i) => `<option ${i === 0 ? "selected" : ""}>${opt}</option>`).join("");
}

const bindTaskNoModal = (selector, modal, inputSelector) => {
  document.querySelectorAll(selector).forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      const taskNo = row?.children[0]?.textContent.trim() || "";
      const role = button.dataset.role === "短驳" ? "短驳" : "叉车";
      const taskInput = modal?.querySelector(inputSelector);
      setFieldText(taskInput, taskNo);
      if (modal === taskStartModal) {
        const taskStartTitle = document.querySelector("#task-start-title");
        const startDeviceInput = taskStartModal?.querySelector("[data-task-start-device]");
        const startDeviceTypeSelect = taskStartModal?.querySelector("[data-task-start-device-type]");
        if (taskStartTitle) {
          taskStartTitle.textContent = role === "短驳" ? "开始任务（短驳）" : "开始任务";
        }
        if (taskStartModal) {
          taskStartModal.dataset.taskStartAction = "开始任务";
        }
        if (startDeviceInput) {
          startDeviceInput.value = role === "短驳" ? "短驳-A09" : "5110100022018A9";
        }
        setDeviceTypeSelect(startDeviceTypeSelect, role);
      }
      if (modal === taskDeviceModal) {
        const taskDeviceTitle = document.querySelector("#task-device-title");
        const originalField = taskDeviceModal?.querySelector("[data-task-device-original]");
        const newDeviceInput = taskDeviceModal?.querySelector("[data-task-new-device]");
        const deviceTypeSelect = taskDeviceModal?.querySelector("[data-task-device-type]");
        if (taskDeviceTitle) {
          taskDeviceTitle.textContent = role === "短驳" ? "变更设备（短驳）" : "变更设备";
        }
        if (taskDeviceModal) {
          taskDeviceModal.dataset.taskDeviceAction = "变更设备";
        }
        if (originalField) {
          originalField.textContent = role === "短驳" ? "短驳-A08" : "5110100022018A9";
        }
        if (newDeviceInput) {
          newDeviceInput.value = role === "短驳" ? "短驳-A09" : "5110100022018A0";
        }
        setDeviceTypeSelect(deviceTypeSelect, role);
      }
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
  showToast(taskStartModal?.dataset.taskStartAction === "绑定设备" ? "设备绑定已提交" : "任务已开始");
  closeModal(taskStartModal);
});

taskDeviceConfirm?.addEventListener("click", () => {
  if (!requireModalValue(taskDeviceModal, "[data-task-new-device]", "请输入新设备号")) return;
  if (!requireModalValue(taskDeviceModal, "[data-task-device-type]", "请选择设备类型")) return;
  showToast(taskDeviceModal?.dataset.taskDeviceAction === "绑定设备" ? "设备绑定已提交" : "设备变更已提交");
  closeModal(taskDeviceModal);
});

// 领用配送任务管理：厂内配送任务 / 采购收货任务 顶部 tab 切换
document.querySelectorAll("[data-task-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.taskTab;
    const page = button.closest(".page-panel");
    page?.querySelectorAll("[data-task-tab]").forEach((tab) => {
      tab.classList.toggle("active", tab === button);
    });
    page?.querySelectorAll(".task-page-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === targetId);
    });
  });
});

// 采购收货任务派工（复用叉车司机派工弹窗）
const taskAssignModalForReceipt = document.getElementById("task-assign-modal");
document.querySelectorAll("[data-open-receipt-assign]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const taskNo = row?.children[0]?.textContent.trim() || "";
    const taskNoField = taskAssignModalForReceipt?.querySelector("[data-task-no]");
    const assigneeSelect = taskAssignModalForReceipt?.querySelector("[data-task-assignee]");
    if (taskAssignTitle) {
      taskAssignTitle.textContent = `${button.dataset.taskAction || "派工"}`;
    }
    if (taskNoField) {
      taskNoField.textContent = taskNo;
    }
    if (assigneeSelect) {
      assigneeSelect.value = "";
    }
    // 采购收货任务不涉及短驳，只显示叉车司机
    configureAssignFields({ forklift: true, shuttle: false });
    openModal(taskAssignModalForReceipt);
  });
});

document.querySelectorAll("[data-open-receipt-device]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const action = button.dataset.deviceAction || "变更设备";
    const taskNo = row?.children[0]?.textContent.trim() || "";
    if (action === "绑定设备") {
      const taskStartTitle = document.querySelector("#task-start-title");
      const taskNoField = taskStartModal?.querySelector("[data-task-start-no]");
      const deviceInput = taskStartModal?.querySelector("[data-task-start-device]");
      const deviceTypeSelect = taskStartModal?.querySelector("[data-task-start-device-type]");
      if (taskStartTitle) {
        taskStartTitle.textContent = "绑定设备";
      }
      if (taskStartModal) {
        taskStartModal.dataset.taskStartAction = "绑定设备";
      }
      if (taskNoField) {
        taskNoField.textContent = taskNo;
      }
      if (deviceInput) {
        deviceInput.value = "";
      }
      // 采购收货为叉车作业，重置设备类型下拉为叉车（避免残留短驳选项）
      setDeviceTypeSelect(deviceTypeSelect, "叉车");
      if (deviceTypeSelect) {
        deviceTypeSelect.value = "平叉";
      }
      openModal(taskStartModal);
      return;
    }
    const originalDevice = row?.children[5]?.textContent.trim() || "-";
    const taskNoField = taskDeviceModal?.querySelector("[data-task-device-no]");
    const originalDeviceField = taskDeviceModal?.querySelector("[data-task-device-original]");
    const newDeviceInput = taskDeviceModal?.querySelector("[data-task-new-device]");
    const deviceTypeSelect = taskDeviceModal?.querySelector("[data-task-device-type]");
    const taskDeviceTitle = document.querySelector("#task-device-title");
    if (taskDeviceTitle) {
      taskDeviceTitle.textContent = action;
    }
    if (taskDeviceModal) {
      taskDeviceModal.dataset.taskDeviceAction = action;
    }
    if (taskNoField) {
      taskNoField.textContent = taskNo;
    }
    if (originalDeviceField) {
      originalDeviceField.textContent = action === "绑定设备" ? "-" : originalDevice;
    }
    if (newDeviceInput) {
      newDeviceInput.value = action === "绑定设备" ? "" : "5110100022018A0";
    }
    // 采购收货为叉车作业，重置设备类型下拉为叉车（避免残留短驳选项）
    setDeviceTypeSelect(deviceTypeSelect, "叉车");
    if (deviceTypeSelect) {
      deviceTypeSelect.value = "平叉";
    }
    openModal(taskDeviceModal);
  });
});

document.querySelectorAll("[data-open-receipt-detail]").forEach((button) => {
  button.addEventListener("click", () => {
    receiptDetailModal?.querySelectorAll("[data-receipt-detail-tab]").forEach((tab, index) => {
      tab.classList.toggle("active", index === 0);
    });
    receiptDetailModal?.querySelectorAll(".task-detail-tab-panel").forEach((panel, index) => {
      panel.classList.toggle("active", index === 0);
    });
    openModal(receiptDetailModal);
  });
});

document.querySelectorAll("[data-receipt-detail-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.receiptDetailTab;
    const modal = button.closest(".modal-backdrop");
    modal?.querySelectorAll("[data-receipt-detail-tab]").forEach((tab) => {
      tab.classList.toggle("active", tab === button);
    });
    modal?.querySelectorAll(".task-detail-tab-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === targetId);
    });
  });
});

document.querySelectorAll("[data-open-receipt-appointment]").forEach((button) => {
  button.addEventListener("click", () => {
    const title = document.querySelector("[data-receipt-page-title]");
    if (title) {
      title.textContent = `预约送货单明细 - ${button.textContent.trim()}`;
    }
    showPage("receipt-appointment-page");
    if (currentTabTitle) {
      currentTabTitle.textContent = "预约送货单明细";
    }
  });
});

document.querySelectorAll("[data-return-receipt-task]").forEach((button) => {
  button.addEventListener("click", () => {
    showPage("task-management");
    const receiptTab = document.querySelector('[data-task-tab="task-receipt"]');
    receiptTab?.click();
  });
});

const occupationDetailModal = document.getElementById("occupation-detail-modal");
document.querySelectorAll("[data-open-occupation-detail]").forEach((button) => {
  button.addEventListener("click", () => {
    openModal(occupationDetailModal);
  });
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

if (paperMachineMapBasis) {
  paperMachineMapBasis.addEventListener("change", updatePaperMachineMapBasis);
  updatePaperMachineMapBasis();
}

if (paperMachineMapTaskType) {
  paperMachineMapTaskType.addEventListener("change", updatePaperMachineMapBasis);
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

// nav-group-collapse:start
const collapsibleNavTitleIds = ["workflow-nav-title", "master-data-nav-title", "employee-settings-nav-title", "query-tools-nav-title"];

collapsibleNavTitleIds.forEach((titleId) => {
  const title = document.getElementById(titleId);
  const group = title?.closest(".nav-tree-group");
  const items = group?.querySelector(".nav-tree-items");
  if (!title || !group || !items) return;

  const itemsId = `${titleId}-items`;
  items.id = itemsId;
  title.dataset.navCollapsible = "";
  title.setAttribute("role", "button");
  title.setAttribute("tabindex", "0");
  title.setAttribute("aria-controls", itemsId);
  title.setAttribute("aria-expanded", "true");

  const toggleGroup = () => {
    const collapsed = group.classList.toggle("collapsed");
    title.setAttribute("aria-expanded", String(!collapsed));
  };

  title.addEventListener("click", toggleGroup);
  title.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggleGroup();
  });
});
// nav-group-collapse:end




