import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface VendorData {
  vendor: string;
  spend: number;
}

interface VendorSpendChartProps {
  data: VendorData[];
}

export function VendorSpendChart({ data }: VendorSpendChartProps) {
  return (
    <Card data-testid="card-vendor-spend">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Top 10 Vendors by Spend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis
              type="category"
              dataKey="vendor"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              width={120}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Bar
              dataKey="spend"
              fill="hsl(var(--chart-1))"
              radius={[0, 4, 4, 0]}
              name="Spend ($K)"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
