export type PDFComponentProps = {
  children: React.ReactNode;
  style?: Object;
};

export type ReductionType = {
  value: number;
  title: string;
};

export type FormType = {
  dateOfIssue: string;
  workedHours: number;
  reduction: ReductionType[];
  plnPerHour: number;
};
