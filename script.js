// 綁定按鈕
document.getElementById("calculateBtn").addEventListener("click", calculateAge);

// 頁面載入時還原資料
window.addEventListener("DOMContentLoaded", loadSavedData);

function calculateAge() {
  const input = document.getElementById("birthDate").value;
  const errorDiv = document.getElementById("error");
  const resultDiv = document.getElementById("result");

  errorDiv.textContent = "";
  resultDiv.textContent = "";

  if (!input) {
    errorDiv.textContent = "請選擇出生日期";
    return;
  }

  const birthDate = new Date(input);
  const today = new Date();

  if (birthDate > today) {
    errorDiv.textContent = "日期不能是未來";
    return;
  }

  const diffMs = today - birthDate;
  const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);

  if (diffYears <= 0) {
    errorDiv.textContent = "年齡錯誤";
    return;
  }

  const dogAge = diffYears.toFixed(1);

  let humanText = "";
  let humanAgeValue = null;

  if (diffYears < 1) {
    humanText = "幼犬不適用此公式";
  } else {
    const humanAge = 16 * Math.log(diffYears) + 31;
    humanAgeValue = humanAge.toFixed(1);
    humanText = humanAgeValue + " 歲";
  }

  // 顯示結果
  resultDiv.innerHTML = `
    妙麗現在大約 ${dogAge} 歲 🐾<br>
    換算成人類年齡約為 ${humanText}
  `;

  // ✅ 存進 localStorage
  const data = {
    birthDate: input,
    dogAge: dogAge,
    humanText: humanText
  };

  localStorage.setItem("dogAgeData", JSON.stringify(data));
}

// 🔄 載入時還原
function loadSavedData() {
  const saved = localStorage.getItem("dogAgeData");

  if (!saved) return;

  const data = JSON.parse(saved);

  // 還原 input
  document.getElementById("birthDate").value = data.birthDate;

  // 還原結果
  document.getElementById("result").innerHTML = `
    妙麗現在大約 ${data.dogAge} 歲 🐾<br>
    換算成人類年齡約為 ${data.humanText}
  `;
}