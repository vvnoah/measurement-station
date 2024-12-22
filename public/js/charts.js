function initializeDetailsChart(data) {
  const chartElement = document.getElementById("details-popup-chart");

  if (chartElement.chartInstance) {
    // Update bestaande grafiek
    chartElement.chartInstance.data.labels = data.timestamps;
    chartElement.chartInstance.data.datasets[0].data = data.values;
    chartElement.chartInstance.update();
  } else {
    // Maak een nieuwe grafiek
    chartElement.chartInstance = new Chart(chartElement, {
      type: "line",
      data: {
        labels: data.timestamps,
        datasets: [{
          label: "Sensor Waarden",
          data: data.values,
          borderColor: "blue",
          backgroundColor: "lightblue",
          fill: true,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: "Sensor Data" },
        },
      },
    });
  }
}

