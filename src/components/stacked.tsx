import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Data for the chart
const chartData = [
  { milestone: "UI/UX Design", design: 100, integration: 50 }, // Total: 248 hours
  {
    milestone: "Base Shared Features",
    development: 64,
  }, // Total: 112 hours
  {
    milestone: "Customer Module",
    development: 116,
  }, // Total: 212 hours
  { milestone: "Admin Module", development: 116 }, // Total: 328 hours
  { milestone: "System Integration and Testing", integration: 50, testing: 50 }, // Total: 56 hours
];

// Configuration for stages
const chartConfig = {
  development: { label: "Development", color: "hsl(210, 100%, 40%)" },
  integration: { label: "Integration", color: "hsl(210, 100%, 60%)" },
  testing: { label: "Testing", color: "hsl(210, 100%, 80%)" },
  design: { label: "Design", color: "hsl(210, 50%, 70%)" },
};

export default function Stacked() {
  return (
    <Card className="w-full md:w-[50%] mx-auto my-20">
      <CardHeader>
        <CardTitle>Development Stages by Milestone</CardTitle>
        <CardDescription>
          Hours Breakdown for Online Bigasan System App
        </CardDescription>
        <CardDescription>X - hours, Y - Milestones</CardDescription>
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
              margin={{ left: 20 }}
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
              <XAxis type="number" />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="development"
                stackId="a"
                fill={chartConfig.development.color}
              />
              <Bar
                dataKey="integration"
                stackId="a"
                fill={chartConfig.integration.color}
              />
              <Bar
                dataKey="testing"
                stackId="a"
                fill={chartConfig.testing.color}
              />
              <Bar
                dataKey="design"
                stackId="a"
                fill={chartConfig.design.color}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
