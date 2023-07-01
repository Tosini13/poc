import { View, StyleSheet } from "@react-pdf/renderer";

export const tableStyles = StyleSheet.create({
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginBottom: 10,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottom: 1,
    justifyContent: "space-between",
    padding: 1,
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
    paddingTop: 2,
    paddingBottom: 2,
    borderRight: 1,
    borderColor: "lightgray",
    textAlign: "center",
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
    textAlign: "center",
    padding: 3,
    borderRight: 1,
    borderColor: "lightgray",
    height: "100%",
  },
});

type TablePropsType = {
  children: React.ReactNode;
  style?: Object;
};

export const Table: React.FC<TablePropsType> = ({
  children,
  style: customStyle,
}) => {
  return (
    <View style={{ ...tableStyles.table, ...customStyle }}>{children}</View>
  );
};

type TableRowPropsType = {
  children: React.ReactNode;
  style?: Object;
};

export const TableRow: React.FC<TableRowPropsType> = ({
  children,
  style: customStyle,
}) => {
  return (
    <View style={{ ...tableStyles.tableRow, ...customStyle }}>{children}</View>
  );
};

type TableCellPropsType = {
  children: React.ReactNode;
  style?: Object;
};

export const TableCell: React.FC<TableCellPropsType> = ({
  children,
  style: customStyle,
}) => {
  return (
    <View style={{ ...tableStyles.tableCell, ...customStyle }}>{children}</View>
  );
};

type TableHeaderPropsType = {
  children: React.ReactNode;
  style?: Object;
};

export const TableHeader: React.FC<TableHeaderPropsType> = ({
  children,
  style: customStyle,
}) => {
  return (
    <View style={{ ...tableStyles.tableHeader, ...customStyle }}>
      {children}
    </View>
  );
};
