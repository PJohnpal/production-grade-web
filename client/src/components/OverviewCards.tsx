import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, FileText, Upload, TrendingUp } from "lucide-react";

interface OverviewCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
}

function OverviewCard({ title, value, trend, icon }: OverviewCardProps) {
  return (
    <Card data-testid={`card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold" data-testid={`text-${title.toLowerCase().replace(/\s+/g, '-')}-value`}>
          {value}
        </div>
        {trend && (
          <p className="text-xs text-muted-foreground mt-2" data-testid={`text-${title.toLowerCase().replace(/\s+/g, '-')}-trend`}>
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface OverviewCardsProps {
  totalSpend: number;
  totalInvoices: number;
  documentsUploaded: number;
  averageInvoiceValue: number;
}

export function OverviewCards({
  totalSpend,
  totalInvoices,
  documentsUploaded,
  averageInvoiceValue,
}: OverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <OverviewCard
        title="Total Spend (YTD)"
        value={`$${totalSpend.toLocaleString()}`}
        trend="+12.5% from last year"
        icon={<DollarSign className="h-4 w-4" />}
      />
      <OverviewCard
        title="Total Invoices"
        value={totalInvoices.toLocaleString()}
        trend="+8.2% from last month"
        icon={<FileText className="h-4 w-4" />}
      />
      <OverviewCard
        title="Documents Uploaded"
        value={documentsUploaded.toLocaleString()}
        trend="+5.1% from last month"
        icon={<Upload className="h-4 w-4" />}
      />
      <OverviewCard
        title="Avg Invoice Value"
        value={`$${averageInvoiceValue.toLocaleString()}`}
        trend="+3.8% from last month"
        icon={<TrendingUp className="h-4 w-4" />}
      />
    </div>
  );
}
