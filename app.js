"use strict";

const LANES = [
  { id: "hotel", title: "نقاط وحدات أعلى الأوتيل" },
  { id: "paleto", title: "نقاط وحدات نقطة بوليتو" },
  { id: "loss", title: "نقاط وحدات نقطة لوس" },
  { id: "electricity", title: "نقاط وحدات نقطة الكهرب" },
  { id: "grapeseed", title: "نقاط وحدات ثغرة قرابسيد" }
];

function init() {
  const container = document.getElementById("lanesContainer");
  container.innerHTML = "";

  LANES.forEach(lane => {
    const div = document.createElement("div");
    div.className = "lane";
    div.innerHTML = `
      <h3 class="lane-title">${lane.title}</h3>
      <input type="text" placeholder="اسم الوحدة + الرقم..." onkeypress="handleEntry(event, '${lane.id}')">
      <div id="list-${lane.id}" style="margin-top:10px"></div>
    `;
    container.appendChild(div);
  });
}

function handleEntry(e, laneId) {
  if (e.key === "Enter" && e.target.value.trim() !== "") {
    const val = e.target.value.trim();
    const list = document.getElementById(`list-${laneId}`);
    const item = document.createElement("div");
    item.style.padding = "5px";
    item.style.borderBottom = "1px solid rgba(216,178,74,0.1)";
    item.innerHTML = `• ${val} <span style="color:red; cursor:pointer; float:left" onclick="this.parentElement.remove(); updateReport();">✖</span>`;
    list.appendChild(item);
    e.target.value = "";
    updateReport();
  }
}

function updateReport() {
  let report = "🪖 **تقرير تحديث مركز عمليات الجيش**\n";
  report += "----------------------------------\n";
  
  LANES.forEach(lane => {
    const items = Array.from(document.getElementById(`list-${lane.id}`).children);
    const names = items.map(i => i.innerText.replace("✖", "").trim()).join(" - ");
    report += `🔹 ${lane.title}: ${names || "لا يوجد"}\n`;
  });

  const officer = document.getElementById("officerName").value;
  if (officer) report += `\n👤 المستلم: ${officer}`;
  
  document.getElementById("finalReport").value = report;
}

function copyReport() {
  const copyText = document.getElementById("finalReport");
  copyText.select();
  document.execCommand("copy");
  alert("تم نسخ التقرير العسكري!");
}

document.getElementById("officerName").addEventListener("input", updateReport);
window.onload = init;
