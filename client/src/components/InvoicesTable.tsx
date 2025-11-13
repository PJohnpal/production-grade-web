import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

interface Invoice {
  id: string;
  vendor: string;
  date: string;
  invoiceNumber: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
}

interface InvoicesTableProps {
  invoices: Invoice[];
}

export function InvoicesTable({ invoices }: InvoicesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Invoice>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof Invoice) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredInvoices = invoices
    .filter(
      (invoice) =>
        invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const multiplier = sortDirection === "asc" ? 1 : -1;
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * multiplier;
      }
      return String(aValue).localeCompare(String(bValue)) * multiplier;
    });

  const getStatusVariant = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "overdue":
        return "destructive";
    }
  };

  return (
    <Card data-testid="card-invoices-table">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            data-testid="input-search-invoices"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover-elevate"
                onClick={() => handleSort("vendor")}
                data-testid="button-sort-vendor"
              >
                Vendor
              </TableHead>
              <TableHead
                className="cursor-pointer hover-elevate"
                onClick={() => handleSort("date")}
                data-testid="button-sort-date"
              >
                Date
              </TableHead>
              <TableHead
                className="cursor-pointer hover-elevate"
                onClick={() => handleSort("invoiceNumber")}
                data-testid="button-sort-invoice-number"
              >
                Invoice #
              </TableHead>
              <TableHead
                className="cursor-pointer hover-elevate"
                onClick={() => handleSort("amount")}
                data-testid="button-sort-amount"
              >
                Amount
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover-elevate" data-testid={`row-invoice-${invoice.id}`}>
                <TableCell className="font-medium" data-testid={`text-vendor-${invoice.id}`}>
                  {invoice.vendor}
                </TableCell>
                <TableCell data-testid={`text-date-${invoice.id}`}>{invoice.date}</TableCell>
                <TableCell data-testid={`text-invoice-number-${invoice.id}`}>
                  {invoice.invoiceNumber}
                </TableCell>
                <TableCell data-testid={`text-amount-${invoice.id}`}>
                  ${invoice.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(invoice.status)} data-testid={`badge-status-${invoice.id}`}>
                    {invoice.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
