const barChart = document.querySelector(".bar-chart");

async function fetchExpenses() {
  try {
    const res = await fetch("./data.json");
    const expensesData = await res.json();

    let greatestAmount = 0;

    expensesData.forEach((expense) => {
      const amount = expense.amount;
      if (typeof amount === "number" && amount > greatestAmount) {
        greatestAmount = amount;
      }
    });

    expensesData.forEach((expense) => {
      const chart = document.createElement("div");
      chart.classList.add("chart"); // Use classList.add to add a class
      const height = expense.amount * 3;
      if (expense.amount === greatestAmount) {
        chart.innerHTML = `
        <label class="amount ${expense.day} hidden">$${expense.amount}</label>
        <div class="box great" onmouseenter="handleHover('${expense.day}')" onmouseleave="removeHover('${expense.day}')" style="height: ${height}px;"></div>
        <p>${expense.day}</p>
      `;
      } else {
        chart.innerHTML = `
        <label class="amount ${expense.day} hidden">$${expense.amount}</label>
        <div class="box" onmouseenter="handleHover('${expense.day}')" onmouseleave="removeHover('${expense.day}')" style="height: ${height}px;"></div>
        <p>${expense.day}</p>
      `;
      }
      barChart.appendChild(chart);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchExpenses();

function handleHover(day) {
  const amount = document.querySelector(`.${day}`);
  amount.classList.remove("hidden");
}

function removeHover(day) {
  const amount = document.querySelector(`.${day}`);
  amount.classList.add("hidden");
}
