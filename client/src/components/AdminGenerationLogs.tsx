import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface GenerationLog {
  id: string;
  timestamp: Date;
  templateName: string;
  tokensUsed: number;
}

interface AdminGenerationLogsProps {
  logs: GenerationLog[];
}

export default function AdminGenerationLogs({ logs }: AdminGenerationLogsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-logs-title">
          Generation Logs
        </h1>
        <p className="text-muted-foreground">
          View all image generation activity
        </p>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Tokens Used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} data-testid={`row-log-${log.id}`}>
                <TableCell>
                  {format(log.timestamp, "MMM d, yyyy h:mm a")}
                </TableCell>
                <TableCell className="font-medium">{log.templateName}</TableCell>
                <TableCell>{log.tokensUsed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
