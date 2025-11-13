import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CashOutflowData {
  period: string;
  amount: number;
}

interface CashOutflowChartProps {
  data: CashOutflowData[];
}

export function CashOutflowChart({ data }: CashOutflowChartProps) {
  return (
    <Card data-testid="card-cash-outflow">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Cash Outflow Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="period"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Bar
              dataKey="amount"
              fill="hsl(var(--chart-3))"
              radius={[4, 4, 0, 0]}
              name="Amount ($K)"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
