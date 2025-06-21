document.addEventListener("DOMContentLoaded", function () {
  const scheduleBody = document.getElementById("schedule-body");
  const storageKey = "gam3eya_progress_interactive_v6";

  const scheduleData = [
    { id: 1, date: "2025-04-11" },
    { id: 2, date: "2025-04-18" },
    { id: 3, date: "2025-04-25" },
    { id: 4, date: "2025-05-02" },
    { id: 5, date: "2025-05-09" },
    { id: 6, date: "2025-05-16" },
    { id: 7, date: "2025-05-23" },
    { id: 8, date: "2025-05-30" },
    { id: 9, date: "2025-06-06" },
    { id: 10, date: "2025-06-13" },
    { id: 11, date: "2025-06-20" },
    { id: 12, date: "2025-06-27" },
    { id: 13, date: "2025-07-04" },
    { id: 14, date: "2025-07-11" },
    { id: 15, date: "2025-07-18" },
    { id: 16, date: "2025-07-25" },
    { id: 17, date: "2025-08-01" },
    { id: 18, date: "2025-08-08" },
    { id: 19, date: "2025-08-15" },
    { id: 20, date: "2025-08-22" },
    { id: 21, date: "2025-08-29" },
    { id: 22, date: "2025-09-05" },
    { id: 23, date: "2025-09-12" },
    { id: 24, date: "2025-09-19" },
    { id: 25, date: "2025-09-26" },
    { id: 26, date: "2025-10-03" },
    { id: 27, date: "2025-10-10" },
    { id: 28, date: "2025-10-17" },
    { id: 29, date: "2025-10-24" },
    { id: 30, date: "2025-10-31" },
    { id: 31, date: "2025-11-07" },
  ];

  let savedState = JSON.parse(localStorage.getItem(storageKey));

  if (savedState === null) {
    savedState = {};
    for (let i = 1; i <= 11; i++) {
      savedState[i] = true;
    }
  }

  const today = new Date();
  let progressChart = null;

  function renderOrUpdateChart() {
    const completedCount = Object.values(savedState).filter(Boolean).length;
    const remainingCount = scheduleData.length - completedCount;

    // Get CSS variables for colors
    const rootStyles = getComputedStyle(document.documentElement);
    const chartCompletedColor = rootStyles
      .getPropertyValue("--chart-completed")
      .trim();
    const chartRemainingColor = rootStyles
      .getPropertyValue("--chart-remaining")
      .trim();
    const chartCompletedHoverColor = rootStyles
      .getPropertyValue("--chart-completed-hover")
      .trim();
    const chartRemainingHoverColor = rootStyles
      .getPropertyValue("--chart-remaining-hover")
      .trim();

    const chartData = {
      labels: ["تم الاستلام", "متبقي"],
      datasets: [
        {
          data: [completedCount, remainingCount],
          backgroundColor: [chartCompletedColor, chartRemainingColor],
          hoverBackgroundColor: [
            chartCompletedHoverColor,
            chartRemainingHoverColor,
          ],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    };

    const ctx = document.getElementById("progressChart").getContext("2d");
    if (progressChart) {
      progressChart.data = chartData;
      progressChart.update();
    } else {
      progressChart = new Chart(ctx, {
        type: "doughnut",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: { font: { family: "'Tajawal', sans-serif", size: 14 } },
            },
            title: {
              display: true,
              text: "ملخص تقدم الجمعية",
              font: { family: "'Tajawal', sans-serif", size: 18 },
            },
          },
          cutout: "70%",
        },
      });
    }
  }

  function renderTable() {
    scheduleBody.innerHTML = "";
    let nextPaymentFound = false;

    scheduleData.forEach((item) => {
      const row = document.createElement("tr");
      row.id = `row-${item.id}`;

      const isChecked = savedState[item.id] || false;
      const itemDate = new Date(item.date + "T00:00:00");

      let statusText,
        statusClass,
        rowClass = "";
      if (isChecked) {
        statusText = "تم الاستلام";
        statusClass = "status-done";
        rowClass = "completed-row";
      } else {
        if (itemDate < today) {
          statusText = "فات موعده";
          statusClass = "status-past";
          rowClass = "row-past";
        } else if (!nextPaymentFound) {
          statusText = "هو التالي";
          statusClass = "status-next";
          rowClass = "row-next";
          nextPaymentFound = true;
        } else {
          statusText = "قادم";
          statusClass = "status-upcoming";
        }
      }
      if (rowClass) row.classList.add(rowClass);

      const displayDate = new Date(item.date)
        .toLocaleDateString("ar-EG-u-nu-latn", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-");

      row.innerHTML = `
                <td><strong>${item.id}</strong></td>
                <td>${item.id} من 31</td>
                <td>${displayDate}</td>
                <td><span class="status ${statusClass}">${statusText}</span></td>
                <td><input type="checkbox" id="check-${item.id}" data-id="${
        item.id
      }" ${isChecked ? "checked" : ""}></td>
            `;
      scheduleBody.appendChild(row);
    });

    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener("change", handleCheckChange);
    });
    renderOrUpdateChart();
  }

  function handleCheckChange(event) {
    savedState[event.target.dataset.id] = event.target.checked;
    localStorage.setItem(storageKey, JSON.stringify(savedState));
    renderTable();
  }

  renderTable();
});
