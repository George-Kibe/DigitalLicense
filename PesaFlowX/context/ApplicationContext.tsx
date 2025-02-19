import React, { createContext, useContext, useState, ReactNode } from "react";

// Define Loan and Person Types
interface Loan {
  name: string;
  amount: number;
  dateDisbursed: Date;
  notes: string;
  dueDate: Date;
  expenses: number;
  status: "Paid" | "Unpaid" | "Pending" | "Overdue" | "Rolled-Over";
  totalDue: number;
  totalPaid: number;
  netInterest: number;
}

interface Person {
  name: string;
  phone: string;
}

// Define Context Type
interface LoanContextType {
  loans: Loan[];
  people: Person[];
  addLoan: (loan: Loan) => void;
  addPerson: (person: Person) => void;
}

// Create Context with Default Values
const LoanContext = createContext<LoanContextType | undefined>(undefined);

// Provider Component
export const MainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [people, setPeople] = useState<Person[]>([]);

  // Add Loan Function
  const addLoan = (loan: Loan) => {
    setLoans((prevLoans) => [...prevLoans, loan]);
  };

  // Add Person Function
  const addPerson = (person: Person) => {
    setPeople((prevPeople) => [...prevPeople, person]);
  };

  return (
    <LoanContext.Provider value={{ loans, people, addLoan, addPerson }}>
      {children}
    </LoanContext.Provider>
  );
};

// Custom Hook to Use the Context
export const useLoanContext = (): LoanContextType => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error("useLoanContext must be used within a MainProvider");
  }
  return context;
};
