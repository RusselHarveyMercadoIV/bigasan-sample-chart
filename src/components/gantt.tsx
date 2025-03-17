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

const chartData = [
  {
    milestone: "UI/UX Design",
    start: new Date(2025, 3, 1),
    end: new Date(2025, 3, 20),
  },
  {
    milestone: "Base Shared Features",
    start: new Date(2025, 3, 21),
    end: new Date(2025, 3, 29),
  },
  {
    milestone: "Customer Module",
    start: new Date(2025, 3, 30),
    end: new Date(2025, 4, 14),
  },
  {
    milestone: "Admin Module",
    start: new Date(2025, 4, 15),
    end: new Date(2025, 4, 30),
  },
  {
    milestone: "System Integration and Testing",
    start: new Date(2025, 4, 31),
    end: new Date(2025, 5, 12),
  },
];

const chartConfig = {
  task: {
    label: "Task Duration",
    color: "hsl(210, 100%, 40%)",
  },
};

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

const allDates = chartData.flatMap((d) => [d.start.getTime(), d.end.getTime()]);
const minDate = Math.min(...allDates);
const maxDate = Math.max(...allDates);

// Formatter function for X-axis ticks
const formatMonth = (timestamp: any) => {
  return tickLabels[timestamp] || "";
};

// Define the tick labels mapping
const tickLabels = {
  [new Date(2025, 3, 1).getTime()]: "Month 1", // April 1, 2025
  [new Date(2025, 4, 1).getTime()]: "Month 2", // May 1, 2025
  [new Date(2025, 5, 1).getTime()]: "Month 3", // June 1, 2025
  [new Date(2025, 6, 1).getTime()]: "Month 4", // July 1, 2025
};

export default function Gantt() {
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
                  new Date(2025, 3, 1).getTime(), // April 1
                  new Date(2025, 4, 1).getTime(), // May 1
                  new Date(2025, 5, 1).getTime(), // June 1
                  new Date(2025, 6, 1).getTime(), // July 1
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
