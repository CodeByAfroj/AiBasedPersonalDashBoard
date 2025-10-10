import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Helper: compute moving average
function movingAverage(data, windowSize = 7) {
  return data.map((_, idx, arr) => {
    if (idx < windowSize - 1) return null; // not enough data yet
    const slice = arr.slice(idx - windowSize + 1, idx + 1);
    return slice.reduce((sum, val) => sum + val, 0) / windowSize;
  });
}

export default function Chart({ newEntry }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Daily Performance",
        data: [],
        borderColor: "rgb(99, 102, 241)", // Indigo
        backgroundColor: "rgba(99, 102, 241, 0.15)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: "white",
        pointBorderColor: "rgb(99, 102, 241)",
        borderWidth: 3,
        fill: true,
      },
      {
        label: "7-Day Avg",
        data: [],
        borderColor: "rgb(239, 68, 68)", // Red
        borderDash: [6, 6], // dashed line
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        fill: false,
      },
    ],
  });

  // Update chart when newEntry changes
  useEffect(() => {
    if (newEntry !== undefined) {
      const today = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });

      setChartData((prev) => {
        const labels = [...prev.labels];
        const dailyData = [...prev.datasets[0].data];
        const idx = labels.indexOf(today);

        if (idx !== -1) {
          dailyData[idx] = newEntry;
        } else {
          labels.push(today);
          dailyData.push(newEntry);
        }

        const avgData = movingAverage(dailyData, 7);

        return {
          ...prev,
          labels,
          datasets: [
            { ...prev.datasets[0], data: dailyData },
            { ...prev.datasets[1], data: avgData },
          ],
        };
      });
    }
  }, [newEntry]);

  return (
   <div className="p-6 dark:text-white outline  rounded-xl shadow-lg h-[400px]">
  <h2 className="text-lg font-semibold mb-4 dark:text-gray-200  text-gray-700">
    Performance Trend
  </h2>
  <Line
   className="dark:text-gray-200"
    data={chartData}
    options={{
      responsive: true,
      maintainAspectRatio: false, // allows chart to fill container
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: true, position: "top" },
        tooltip: {
          callbacks: {
            label: (context) =>
              context.dataset.label === "7-Day Avg"
                ? ` ${context.dataset.label}: ${Number(context.raw).toFixed(2)}`
                : ` ${context.dataset.label}: ${context.formattedValue}`,
          },
        },
      },
      scales: {
        x: { title: { display: true, text: "Day" }, grid: { display: false } },
        y: {
          title: { display: true, text: "Entries" },
          beginAtZero: true,
          ticks: { stepSize: 1 },
          grid: { color: "rgba(0,0,0,0.05)" },
        },
      },
      animation: { duration: 800, easing: "easeOutQuart" },
    }}
    height={400} // ensures chart height stays fixed
  />
</div>

  );
}
