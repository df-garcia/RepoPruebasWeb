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
          backgroundColor: ["green", "blue", "gray", "red", "purple", "orange"],
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
          backgroundColor: ["green", "blue", "gray", "red", "purple", "orange"],
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

  var ctx3 = $("#chart-line3");
  var myLineChart3 = new Chart(ctx3, {
    type: "doughnut",
    data: {
      labels: ["No date", "Started", "Completed", "Late"],
      datasets: [
        {
          data: [2, 5, 4, 1],
          backgroundColor: ["gray", "blue", "green", "red"],
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
          backgroundColor: ["gray", "orange", "blue", "green", "red"],
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
