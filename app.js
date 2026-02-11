"use strict";

const $ = (sel) => document.querySelector(sel);

// تحديث النقاط حسب طلبك
const LANES = [
  { id: "hotel", title: "نقاط وحدات أعلى الأوتيل" },
  { id: "paleto", title: "نقاط وحدات نقطة بوليتو" },
  { id: "loss", title: "نقاط وحدات نقطة لوس" },
  { id: "electricity", title: "نقاط وحدات نقطة الكهرب" },
  { id: "grapeseed", title: "نقاط وحدات ثغرة قرابسيد" }
];

function initApp() {
  const lanesContainer = $("#lanes");
  lanesContainer.innerHTML = "";

  LANES.forEach(lane => {
    const laneDiv = document.createElement("div");
    laneDiv.className = "lane";
    laneDiv.innerHTML = `
      <h3 class="lane-title">${lane.title}</h3>
      <div id="units-${lane.id}" class="unit-list">
        <input type="text" placeholder="أضف وحدة هنا..." 
               onkeypress="if(event.key==='Enter') addUnit('${lane.id}', this.value); if(event.key==='Enter') this.value='';" 
               style="width:100%; background:#222; border:1px solid #444; color:#fff; padding:5px;">
        <ul id="list-${lane.id}" style="list-style:none; margin-top:10px; color:#ccc;"></ul>
      </div>
    `;
    lanesContainer.appendChild(laneDiv);
  });
}

function addUnit(laneId, unitName) {
  if(!unitName) return;
  const list = $(`#list-${laneId}`);
  const li = document.createElement("li");
  li.textContent = `- ${unitName}`;
  li.style.padding = "3px 0";
  list.appendChild(li);
  updateReport();
}

function updateReport() {
  let report = "📋 **تقرير تحديث مركز العمليات للجيش**\n\n";
  LANES.forEach(lane => {
    const units = Array.from($(`#list-${lane.id}`).children).map(li => li.textContent).join(" ");
    report += `🔹 ${lane.title}: ${units || "لا يوجد"}\n`;
  });
  
  const handover = $("#handoverTo").value;
  if(handover) report += `\n👤 المستلم: ${handover}`;
  
  $("#finalText").value = report;
}

function copyReport() {
  const textArea = $("#finalText");
  textArea.select();
  document.execCommand("copy");
  alert("تم نسخ التقرير بنجاح!");
}

// تشغيل عند التحميل
document.addEventListener("DOMContentLoaded", () => {
  initApp();
  $("#handoverTo").addEventListener("input", updateReport);
});
