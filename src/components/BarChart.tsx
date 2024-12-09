import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from "chart.js";
import { User } from "./Table";
import { useMemo } from "react";
import "../assets/bar-chart.scss";

interface Props {
    data: User[];
}
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
);

const options: any = {
    plugins: {
        legend: {
            display: false,
        },
    },
};

function BarChart(props: Props) {
    const { data } = props;

    const chartData = useMemo(() => {
        const labelMap = new Map();
        data.forEach((d) =>
            labelMap.set(d.age, (labelMap.get(d.age) || 0) + 1)
        );
        const labels: string[] = [];
        const values: number[] = [];
        Array.from(labelMap, ([key, value]) => {
            labels.push(key);
            values.push(value);
        });
        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: "Age Distribution",
                    data: values,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(255, 205, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(201, 203, 207, 0.2)",
                    ],
                    borderColor: [
                        "rgb(255, 99, 132)",
                        "rgb(255, 159, 64)",
                        "rgb(255, 205, 86)",
                        "rgb(75, 192, 192)",
                        "rgb(54, 162, 235)",
                        "rgb(153, 102, 255)",
                        "rgb(201, 203, 207)",
                    ],
                    borderWidth: 1,
                },
            ],
        };
        return chartData;
    }, [data]);

    return (
        <div className="chart-container">
            <Bar data={chartData} options={options} />
        </div>
    );
}

export default BarChart;
