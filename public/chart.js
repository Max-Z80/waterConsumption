"use strict";

var myChart;

function renderChart() {
  api.getValues().then(response => {
    const data = response.data;

    Chart.defaults.global.defaultFontSize = 18;

    function clickHandler(evt) {
      const firstPoint = myChart.getElementAtEvent(evt)[0];
      if (firstPoint) {
        const value =
          myChart.data.datasets[firstPoint._datasetIndex].data[
            firstPoint._index
          ];

        consumptionFormPanel.setDateInputValue(
          moment(value.x).format("YYYY-MM-DD")
        );
        consumptionFormPanel.setM3InputValue(value.y);
        consumptionFormPanel.editConsumption();
      }
    }
    if (myChart instanceof Chart) {
      myChart.destroy();
    }

    const ctx = document.getElementById("myChart").getContext("2d");
    myChart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "m3",
            data: data
              .sort((a, b) => {
                if (new Date(a.date) > new Date(b.date)) {
                  return 1;
                }
                if (new Date(a.date) < new Date(b.date)) {
                  return -1;
                }
                if (new Date(a.date) === new Date(b.date)) {
                  return 0;
                }
              })
              .map(item => ({
                x: new Date(item.date),
                y: parseInt(item.m3, 10)
              }))
          }
        ]
      },
      options: {
        onClick: clickHandler,
        legend: {
          display: false
        },

        scales: {
          xAxes: [
            {
              type: "time"
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "water counter [m3]    "
              },

              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  });
}
