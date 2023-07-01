import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Table, TableCell, TableRow } from "../components/pdf/Table";
import Invoice, {
  dateFormat,
  getInvoiceNumberByMonth,
} from "../components/pdf/invoice";
import { DATE_OF_ISSUE } from "../components/pdf/INVOICE_INPUT";
import InvoiceForm from "../components/pdf/InvoiceForm";
import { useForm } from "react-hook-form";
import { FormType } from "../components/pdf/types";
import { useNbpRate } from "../components/pdf/useNbpRate";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 3,
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
});

const MyDocument = () => {
  const tableData = [
    ["Name", "Age", "Gender"],
    ["John", "30", "Male"],
    ["Jane", "25", "Female"],
    ["Bob", "45", "Male"],
    ["Alice", "50", "Female"],
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Table Example</Text>
        </View>
        <Table>
          {tableData.map((rowData, index) => (
            <TableRow key={index}>
              {rowData.map((cellData, cellIndex) => (
                <TableCell key={cellIndex}>
                  <Text>{cellData}</Text>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </Table>
      </Page>
    </Document>
  );
};

const DEFAULT_FORM_DATA: FormType = {
  dateOfIssue: new Date().toLocaleDateString("en-CA"),
  workedHours: 160,
  reduction: [
    {
      title: "Medicover Sport",
      value: 77,
    },
  ],
  plnPerHour: 90,
};

type PdfModulePropsType = {};

const PdfModule: React.FC<PdfModulePropsType> = ({}) => {
  const { data } = useNbpRate("USD");
  const nbpRate = data?.rates[0].mid ?? 0;
  /**
   * @todo increase lib to es2021 - to use replaceAll
   * 14 651,00 PLN
   */
  const invoiceNumber = getInvoiceNumberByMonth(new Date(DATE_OF_ISSUE));

  const { register, handleSubmit, watch } = useForm<FormType>({
    defaultValues: DEFAULT_FORM_DATA,
  });

  const plnPerHour = watch("plnPerHour");
  const workedHours = watch("workedHours");
  const reduction = watch("reduction");
  const dateOfIssue = watch("dateOfIssue");

  return (
    <div
      data-testid="pdf_module"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <div>
        <InvoiceForm
          register={register}
          handleSubmit={handleSubmit}
          reductionDefaultQty={1}
        />
        <PDFDownloadLink
          document={
            <Invoice
              reduction={reduction}
              plnPerHour={plnPerHour}
              workedHours={workedHours}
              nbpRate={nbpRate}
              dateOfIssue={dateOfIssue}
            />
          }
          fileName={`Jakub_Bartosik_FS_${invoiceNumber}_invoice_${dateFormat(
            new Date(dateOfIssue)
          )
            .replace(".", "_")
            .replace(".", "_")}.pdf`}
        >
          {({ loading }) => {
            return loading ? "Loading document..." : "Download now!";
          }}
        </PDFDownloadLink>
      </div>
      <div>
        <p>PDF View:</p>
        <div
          style={{
            height: "100%",
            width: "100%",
            aspectRatio: "1/1",
          }}
        >
          <PDFViewer height={"100%"} width={"100%"}>
            <Invoice
              reduction={reduction}
              plnPerHour={plnPerHour}
              workedHours={workedHours}
              nbpRate={nbpRate}
              dateOfIssue={dateOfIssue}
            />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
};

export default PdfModule;
