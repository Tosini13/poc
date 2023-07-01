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
  dateOfIssue: string;
  workedHours: number;
  reductions: ReductionType[];
  plnPerHour: number;
};
