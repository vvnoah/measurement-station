// er is eigenlijk maar 1 chart nodig
//dus moet nog nagekeken worden wat weg moet en wat niet

function create_line_chart(chart_element_id, chart_title) {
  const config = {
    type: 'line',
    data: {
      datasets: []
    },
    options: {
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index',
      },

      plugins: {
        title: {
          display: true,
          text: chart_title,
          position: "left",
        }
      }
    }
  };

  const chart = new Chart(
    document.getElementById(chart_element_id),
    config
  );

  return chart;
}

// Add datasets to all charts
//dees moet toch beter kunnen
function addDatasetToCharts(station) {
  addDatasetToChart(temperature_chart, station, 'temperature');
  addDatasetToChart(windspeed_chart, station, 'windspeed');
  addDatasetToChart(rainfall_chart, station, 'rainfall');
  addDatasetToChart(airquality_chart, station, 'airquality');
}

// Remove datasets from all charts
//dees moet toch beter kunnen
function removeDatasetFromCharts(stationId) {
  removeDatasetFromChart(temperature_chart, stationId);
  removeDatasetFromChart(windspeed_chart, stationId);
  removeDatasetFromChart(rainfall_chart, stationId);
  removeDatasetFromChart(airquality_chart, stationId);
}

// Chart helper functions
function create_line_chart(elementId, title) {
  return new Chart(document.getElementById(elementId).getContext('2d'), {
    type: 'line',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: title
      }
    }
  });
}

function addDatasetToChart(chart, station, dataType) {
  chart.data.datasets.push({
    id: station.id,
    label: station.location,
    data: station[dataType],
  });
  chart.update();
}

function removeDatasetFromChart(chart, stationId) {
  chart.data.datasets = chart.data.datasets.filter(dataset => dataset.id !== stationId);
  chart.update();
}

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

