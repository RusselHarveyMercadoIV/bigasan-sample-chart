import { BarChart, XAxis, YAxis, CartesianGrid, Customized } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Updated data for the Gantt chart
const chartData = [
  {
    milestone: "UI/UX Design",
    start: new Date(2025, 3, 1), // April 1, 2025
    end: new Date(2025, 4, 2), // May 2, 2025
  },
  {
    milestone: "Base Shared Features",
    start: new Date(2025, 3, 3), // May 3, 2025
    end: new Date(2025, 3, 17), // May 17, 2025
  },
  {
    milestone: "Guest Module",
    start: new Date(2025, 3, 18), // May 18, 2025
    end: new Date(2025, 3, 22), // May 22, 2025
  },
  {
    milestone: "Customer Module",
    start: new Date(2025, 3, 22), // May 22, 2025
    end: new Date(2025, 5, 24), // June 24, 2025
  },
  {
    milestone: "Retailer Module",
    start: new Date(2025, 5, 24), // June 21, 2025
    end: new Date(2025, 6, 7), // July 24, 2025
  },
  {
    milestone: "Admin Module",
    start: new Date(2025, 6, 8), // July 25, 2025
    end: new Date(2025, 7, 18), // August 14, 2025
  },
  {
    milestone: "System Integration and Testing",
    start: new Date(2025, 7, 19), // August 15, 2025
    end: new Date(2025, 7, 26), // August 21, 2025
  },
];

// Chart configuration (unchanged)
const chartConfig = {
  task: {
    label: "Task Duration",
    color: "hsl(210, 100%, 40%)",
  },
};

// Custom component to render Gantt bars (unchanged)
const GanttBars = ({
  data,
  xScale,
  yScale,
  height,
}: {
  data: any;
  xScale: any;
  yScale: any;
  height: number;
}) => {
  return data.map((entry: any, index: number) => {
    const xStart = xScale(entry.start.getTime());
    const xEnd = xScale(entry.end.getTime());
    const y = yScale(entry.milestone);
    const barWidth = xEnd - xStart;
    const barHeight = (height / data.length) * 0.8;
    return (
      <rect
        key={index}
        x={xStart}
        y={y + 2}
        width={barWidth}
        height={barHeight}
        fill={chartConfig.task.color}
      />
    );
  });
};

export default function Gantt() {
  // Determine the time range for the X-axis
  const allDates = chartData.flatMap((d) => [
    d.start.getTime(),
    d.end.getTime(),
  ]);
  const minDate = Math.min(...allDates);
  const maxDate = Math.max(...allDates);

  // Custom tick formatter for months (unchanged)
  const formatMonth = (timestamp: any) => {
    const date = new Date(timestamp);
    return date.toLocaleString("default", { month: "short" });
  };

  return (
    <Card className="w-full md:w-[50%] mx-auto mt-20">
      <CardHeader>
        <CardTitle>Project Milestones Timeline</CardTitle>
        <CardDescription>
          Gantt Chart for Online Bigasan System App
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] md:h-[600px]">
          <ChartContainer
            config={chartConfig}
            style={{ width: "100%", height: "100%" }}
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{ left: 20, right: 20, top: 20, bottom: 20 }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="milestone"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="cursor-pointer"
              />
              <XAxis
                type="number"
                domain={[minDate, maxDate]}
                tickFormatter={formatMonth}
                ticks={[
                  new Date(2025, 3, 1).getTime(), // Apr
                  new Date(2025, 4, 1).getTime(), // May
                  new Date(2025, 5, 1).getTime(), // Jun
                  new Date(2025, 6, 1).getTime(), // Jul
                  new Date(2025, 7, 1).getTime(), // Aug
                  new Date(2025, 8, 1).getTime(), // Sep
                ]}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(payload) => payload[0]?.payload.milestone}
                  />
                }
              />
              <Customized
                component={(props: any) => (
                  <GanttBars
                    data={chartData}
                    xScale={props.xAxisMap[0].scale}
                    yScale={props.yAxisMap[0].scale}
                    height={props.height}
                  />
                )}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
