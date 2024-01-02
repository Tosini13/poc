export type PDFComponentProps = {
  children: React.ReactNode;
  style?: Object;
};

export type ReductionType = {
  id: string;
  value: number;
  title: string;
};

export type FormType = {
  invoiceNumber: number;
  dateOfIssue: string;
  workedHours: number;
  reductions: ReductionType[];
  // plnPerHour: number;
  eurPerHour: number;
};
