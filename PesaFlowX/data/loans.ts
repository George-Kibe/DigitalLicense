
  
  // Sample loan data
  export const loans: Loan[] = [
    {
      name: "John Doe",
      amount: 5000,
      dateDisbursed: new Date("2024-01-10"),
      notes: "Personal loan",
      dueDate: new Date("2024-02-10"),
      expenses: 100,
      status: "Paid",
      totalDue: 5100,
      totalPaid: 5100,
      netInterest: 100,
    },
    {
      name: "Alice Smith",
      amount: 3000,
      dateDisbursed: new Date("2024-01-05"),
      notes: "Car repair loan",
      dueDate: new Date("2024-02-05"),
      expenses: 50,
      status: "Pending",
      totalDue: 3150,
      totalPaid: 0,
      netInterest: 150,
    },
    {
      name: "Michael Brown",
      amount: 7000,
      dateDisbursed: new Date("2023-12-15"),
      notes: "Home renovation",
      dueDate: new Date("2024-01-15"),
      expenses: 200,
      status: "Rolled Over",
      totalDue: 7300,
      totalPaid: 2000,
      netInterest: 300,
    },
    {
      name: "James Anderson",
      amount: 6000,
      dateDisbursed: new Date("2023-10-10"),
      notes: "Debt consolidation",
      dueDate: new Date("2023-11-10"),
      expenses: 200,
      status: "Rolled Over",
      totalDue: 6400,
      totalPaid: 3000,
      netInterest: 400,
    }
  ];
  