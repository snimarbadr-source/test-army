"use strict";

// الأسماء الجديدة للنقاط حسب طلبك
const LANES = [
  { id: "hotel", title: "نقاط وحدات أعلى الأوتيل" },
  { id: "paleto", title: "نقاط وحدات نقطة بوليتو" },
  { id: "loss", title: "نقاط وحدات نقطة لوس" },
  { id: "electricity", title: "نقاط وحدات نقطة الكهرب" },
  { id: "grapeseed", title: "نقاط وحدات ثغرة قرابسيد" }
];

let unitsData = JSON.parse(localStorage.getItem('armyUnits')) || [];

function init() {
  const container = document.getElementById("lanesContainer");
  container.innerHTML = "";

  LANES.forEach(lane => {
    const laneDiv = document.createElement("div");
    laneDiv.className = "lane";
    laneDiv.setAttribute("ondrop", `drop(event, '${lane.id}')`);
    laneDiv.setAttribute("ondragover", "allowDrop(event)");
    
    laneDiv.innerHTML = `
      <h3 class="lane-title">${lane.title}</h3>
      <div id="list-${lane.id}" class="unit-list"></div>
    `;
    container.appendChild(laneDiv);
  });
  
  renderUnits();
  updateReport();
}

function renderUnits() {
  // مسح القوائم أولاً
  LANES.forEach(l => document.getElementById(`list-${l.id}`).innerHTML = "");

  unitsData.forEach(unit => {
    const list = document.getElementById(`list-${unit.laneId}`);
    if (list) {
      const card = document.createElement("div");
      card.className = "unit-card";
      card.draggable = true;
      card.id = unit.id;
      card.setAttribute("ondragstart", "drag(event)");
      card.innerHTML = `
        <span>• ${unit.name}</span>
        <span style="color:#ff4444; cursor:pointer;" onclick="deleteUnit('${unit.id}')">✖</span>
      `;
      list.appendChild(card);
    }
  });
}

// وظائف السحب والإفلات
function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function drop(ev, laneId) {
  ev.preventDefault();
  const unitId = ev.dataTransfer.getData("text");
  const unitIndex = unitsData.findIndex(u => u.id == unitId);
  if (unitIndex !== -1) {
    unitsData[unitIndex].laneId = laneId;
    saveAndRefresh();
  }
}

function handleNewUnit(e) {
  if (e.key === "Enter" && e.target.value.trim() !== "") {
    const newUnit = {
      id: "u_" + Date.now(),
      name: e.target.value.trim(),
      laneId: LANES[0].id // تضاف لأول نقطة افتراضياً
    };
    unitsData.push(newUnit);
    e.target.value = "";
    saveAndRefresh();
  }
}

function deleteUnit(id) {
  unitsData = unitsData.filter(u => u.id !== id);
  saveAndRefresh();
}

function saveAndRefresh() {
  localStorage.setItem('armyUnits', JSON.stringify(unitsData));
  renderUnits();
  updateReport();
}

function updateReport() {
  const officer = document.getElementById("officerName").value || "لم يحدد";
  let report = `📋 **تقرير تحديث مركز عمليات الجيش**\n`;
  report += `━━━━━━━━━━━━━━━━━\n`;
  
  LANES.forEach(lane => {
    const laneUnits = unitsData.filter(u => u.laneId === lane.id).map(u => u.name).join(" - ");
    report += `🔹 ${lane.title}:\n   [ ${laneUnits || "لا يوجد وحدات"} ]\n\n`;
  });

  report += `━━━━━━━━━━━━━━━━━\n`;
  report += `👤 الضابط المستلم: ${officer}\n`;
  report += `⏰ تاريخ التحديث: ${new Date().toLocaleString('ar-EG')}`;
  
  document.getElementById("finalReport").value = report;
}

function copyReport() {
  const reportText = document.getElementById("finalReport");
  reportText.select();
  document.execCommand("copy");
  alert("✅ تم نسخ التقرير العسكري بنجاح!");
}

function clearAll() {
  if(confirm("هل أنت متأكد من تصفير جميع الوحدات؟")) {
    unitsData = [];
    saveAndRefresh();
  }
}

document.getElementById("officerName").addEventListener("input", updateReport);
window.onload = init;
