$(document).ready(function () {
  var ctx = $("#chart-line");
  var myLineChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [
        "En Edición",
        "En Plataforma",
        "Escaleta en Cons.",
        "Para montaje",
        "Para Revisión",
        "Pendiente",
      ],
      datasets: [
        {
          data: [2, 4, 3, 2, 3, 4],
          backgroundColor: ["rgba(59,131, 189, 0.9)", "rgba(60, 160, 60, 0.9)", "rgba(229,190, 1, 0.9)", "rgba(87,35, 100, 0.8)", "rgba(255,128,0, 0.9)", "rgba(203,50, 52, 0.9)"],
        },
      ],
    },
    options: {
      title: {
        display: false,
      },
      legend: {
        position: "left",
        onClick: function (evt, item) {
          console.log(item.text);
          $("#exampleModalLabel").text("Mine Tasks - " + item.text);
          $("#exampleModal").modal("show");
        },
        onHover: function (e) {
          e.target.style.cursor = "pointer";
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  var ctx2 = $("#chart-line2");
  var myLineChart2 = new Chart(ctx2, {
    type: "doughnut",
    data: {
      labels: [
        "En Edición",
        "En Plataforma",
        "Escaleta en Cons.",
        "Para montaje",
        "Para Revisión",
        "Pendiente",
      ],
      datasets: [
        {
          data: [5, 6, 11, 4, 2, 5],
          backgroundColor: ["rgba(59,131, 189, 0.9)", "rgba(60, 160, 60, 0.9)", "rgba(229,190, 1, 0.9)", "rgba(87,35, 100, 0.8)", "rgba(255,128,0, 0.9)", "rgba(203,50, 52, 0.9)"],
        },
      ],
    },
    options: {
      title: {
        display: false,
      },
      legend: {
        position: "left",
        onClick: function (evt, item) {
          console.log(item.text);
          $("#exampleModalLabel").text("All Tasks - " + item.text);
          $("#exampleModal").modal("show");
        },
        onHover: function (e) {
          e.target.style.cursor = "pointer";
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  var ctx3 = $("#chart-line3");
  var myLineChart3 = new Chart(ctx3, {
    type: "doughnut",
    data: {
      labels: ["No date", "Started", "Completed", "Late"],
      datasets: [
        {
          data: [2, 5, 4, 1],
          backgroundColor: ["gray", "rgba(59,131, 189, 0.9)", "rgba(60, 160, 60, 0.9)", "rgba(203,50, 52, 0.9)"],
        },
      ],
    },
    options: {
      title: {
        display: false,
      },
      legend: {
        position: "left",
        onClick: function (evt, item) {
          console.log(item.text);
          $("#exampleModal").modal("show");
        },
        onHover: function (e) {
          e.target.style.cursor = "pointer";
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  var ctx4 = $("#chart-line4");
  var myLineChart4 = new Chart(ctx4, {
    type: "doughnut",
    data: {
      labels: ["No date", "Assigned", "Started", "Completed", "Late"],
      datasets: [
        {
          data: [2, 4, 5, 4, 1],
          backgroundColor: ["gray", "rgba(229,190, 1, 0.9)", "rgba(59,131, 189, 0.9)", "rgba(60, 160, 60, 0.9)", "rgba(203,50, 52, 0.9)"],
        },
      ],
    },
    options: {
      title: {
        display: false,
      },
      legend: {
        position: "left",
        onClick: function (evt, item) {
          console.log(item.text);
          $("#exampleModal").modal("show");
        },
        onHover: function (e) {
          e.target.style.cursor = "pointer";
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
});
