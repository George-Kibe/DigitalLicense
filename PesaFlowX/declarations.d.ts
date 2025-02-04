// Define the Loan type
interface Loan {
    name: string;
    amount: number;
    dateDisbursed: Date;
    notes: string;
    dueDate: Date;
    expenses: number;
    status: "Paid" | "Pending" | "Rolled Over";
    totalDue: number;
    totalPaid: number;
    netInterest: number;
  }