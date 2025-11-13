import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface TrendData {
  month: string;
  invoiceCount: number;
  totalValue: number;
}

interface InvoiceTrendChartProps {
  data: TrendData[];
}

export function InvoiceTrendChart({ data }: InvoiceTrendChartProps) {
  return (
    <Card data-testid="card-invoice-trend">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Invoice Volume + Value Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              yAxisId="left"
              stroke="hsl(var(--chart-1))"
              fontSize={12}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--chart-2))"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="invoiceCount"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              name="Invoice Count"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="totalValue"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              name="Total Value ($K)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
