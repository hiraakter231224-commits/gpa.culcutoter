const tbody = document.getElementById("tbody");
const addRowBtn = document.getElementById("addRowBtn");
const calcBtn = document.getElementById("calcBtn");
const resetBtn = document.getElementById("resetBtn");
const totalCoursesEl = document.getElementById("totalCourses");
const avgPointEl = document.getElementById("avgPoint");
const gpaResultEl = document.getElementById("gpaResult");

// Grade logic based on marks
function getGradeAndPoint(marks) {
  if (marks >= 80 && marks <= 100) return { grade: "A+", point: 4.0 };
  if (marks >= 70 && marks < 80) return { grade: "A", point: 3.7 };
  if (marks >= 60 && marks < 70) return { grade: "A-", point: 3.3 };
  if (marks >= 50 && marks < 60) return { grade: "B", point: 3.0 };
  if (marks >= 40 && marks < 50) return { grade: "C", point: 2.5 };
  if (marks >= 33 && marks < 40) return { grade: "D", point: 2.0 };
  return { grade: "F", point: 0.0 };
}

function createRow(course = "", marks = "") {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input type="text" class="course" placeholder="Course Name" value="${course}"></td>
    <td><input type="number" class="marks" min="0" max="100" value="${marks}"></td>
    <td class="grade">-</td>
    <td class="point">-</td>
    <td><button class="remove-btn">✕</button></td>
  `;
  tr.querySelector(".remove-btn").addEventListener("click", () => tr.remove());
  tbody.appendChild(tr);
}

addRowBtn.addEventListener("click", () => createRow());

function calculateGPA() {
  const rows = tbody.querySelectorAll("tr");
  let totalPoint = 0;
  let count = 0;

  rows.forEach(row => {
    const marks = parseFloat(row.querySelector(".marks").value);
    const gradeCell = row.querySelector(".grade");
    const pointCell = row.querySelector(".point");

    if (!isNaN(marks)) {
      const { grade, point } = getGradeAndPoint(marks);
      gradeCell.textContent = grade;
      pointCell.textContent = point.toFixed(2);
      totalPoint += point;
      count++;
    } else {
      gradeCell.textContent = "-";
      pointCell.textContent = "-";
    }
  });

  const avgPoint = count ? totalPoint / count : 0;

  totalCoursesEl.textContent = count;
  avgPointEl.textContent = avgPoint.toFixed(2);
  gpaResultEl.textContent = avgPoint.toFixed(2);
}

calcBtn.addEventListener("click", calculateGPA);

resetBtn.addEventListener("click", () => {
  tbody.innerHTML = "";
  totalCoursesEl.textContent = "0";
  avgPointEl.textContent = "0.00";
  gpaResultEl.textContent = "0.00";
});

// Default rows
createRow("Programming", 85);
createRow("Math", 74);
createRow("English", 63);