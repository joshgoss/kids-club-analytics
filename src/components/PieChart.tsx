import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  headers: string[];
  height?: string;
  data: (string | number)[];
  style?: object;
  title?: string;
  width?: string;
};

export default function PieChart({
  className,
  data,
  headers,
  height,
  style,
  title,
  width,
}: Props) {
  const ref = useRef(null);

  useEffect(() => {
    const drawChart = () => {
      const gData = google.visualization.arrayToDataTable([headers, ...data]);
      const chart = new google.visualization.PieChart(ref.current);
      chart.draw(gData, {
        title: title,
        width: width || "500px",
        height: height || "500px",
      });
    };

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
  }, [data, headers, height, title, width]);

  return <div className={className} ref={ref} style={style}></div>;
}
