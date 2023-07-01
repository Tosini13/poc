import { Page, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Table, TableCell, TableHeader, TableRow, tableStyles } from "./Table";
import { Translation, Text } from "./TextFormat";
import { formatPrice } from "./utils";
import { ReductionType } from "./types";

const getDayBefore = (date: Date) => {
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

export const dateFormat = (date: Date) => {
  return date.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const getNext14Days = (date: Date) => {
  const next14Days = new Date(date);
  next14Days.setDate(next14Days.getDate() + 14);
  return next14Days;
};

const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const getLastDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getInvoiceNumberByMonth = (date: Date) => date.getMonth() + 1;

const formatUSDPrice = formatPrice("us-US", "USD");
const formatPLNPrice = (price: number) =>
  formatPrice("pl-PL", "PLN")(price).replace("zł", "PLN");

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: "10px",
  },
  section: {
    margin: 10,
  },
  header: {
    width: "10%",
    textAlign: "center",
  },
  cell: {
    width: "10%",
    textAlign: "center",
  },
  tableVatCell: {
    width: "25%",
  },
});

const addReduction = (acc: number, { value }: ReductionType) => +value + acc;

type InvoicePropsType = {
  plnPerHour: number;
  workedHours: number;
  reduction: ReductionType[];
  dateOfIssue: string;
  nbpRate: number;
};

const Invoice: React.FC<InvoicePropsType> = ({
  plnPerHour,
  workedHours,
  reduction,
  nbpRate,
  dateOfIssue,
}) => {
  const totalReduction = reduction.reduce(addReduction, 0);

  const pln = plnPerHour * workedHours - totalReduction;
  const usd = Number((pln / nbpRate).toFixed(2));

  const rateDate = dateFormat(getDayBefore(new Date(dateOfIssue)));

  const workingRangeDates = `${dateFormat(
    getFirstDayOfMonth(new Date(dateOfIssue))
  )} - ${dateFormat(getLastDayOfMonth(new Date(dateOfIssue)))}.`;

  const WORK_DESCRIPTION = `Working days ${workingRangeDates}`;
  const WORK_DESCRIPTION_PL = `Praca wykonana w dniach ${workingRangeDates}`;
  const ISSUE_DATE = dateFormat(new Date(dateOfIssue));
  const TRANSACTION_DATE = dateFormat(getNext14Days(new Date(dateOfIssue)));
  const invoiceNumber = getInvoiceNumberByMonth(new Date(dateOfIssue));

  const data = {
    from: {
      name: "Jakub Bartosik APPS",
      address: "ul. Himalajska 47/2, 71-497 Szczecin, Poland",
      nip: "8513251941",
    },
    to: {
      name: "Skygate, Inc.",
      address:
        "2035 Sunset Lake Road, Suite B-2, 19702 Newark, Delaware, United States",
      ein: "61-1932415",
    },
    placeOfIssue: "Szczecin, Poland",
    dateOfSale: ISSUE_DATE,
    dateOfIssue: ISSUE_DATE,
    invoiceNumber: `FS ${invoiceNumber}/2023`,
    items: [
      {
        name: `Coding service accordingly to the agreement on coding services in day 10th of March 2023. ${WORK_DESCRIPTION}`,
        nameTranslation: `Usluga informatyczna zgodnie z umowa o swiadczenie uslug programistycznych z dnia 10 Marca 2023 ${WORK_DESCRIPTION_PL}`,
        quantity: 1,
        discount: 0,
        netPrice: formatUSDPrice(usd),
        netValue: formatUSDPrice(usd),
        vat: "untaxed",
        vaValue: 0,
        grossValue: formatUSDPrice(usd),
      },
    ],
    plnTable: {
      vatRateName: "untaxed",
      netValue: formatPLNPrice(pln),
      vatAmount: 0,
      grossValue: formatPLNPrice(pln),
    },
    totalDue: formatUSDPrice(usd),
    description: {
      transactionDueTime: TRANSACTION_DATE,
      account: {
        number: "63 1140 2004 0000 3912 1861 3086",
        swift: "BREXPLPWMBK",
        bank: "mBank",
        currency: "USD",
      },
      rate: {
        date: rateDate,
        rate: nbpRate,
      },
    },
    issuer: "Jakub Bartosik",
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ width: "50%", marginLeft: "auto" }}>
          <Table>
            <TableRow>
              <TableHeader style={{ width: "50%" }}>
                <Text>Place of Issue</Text>
                <Translation>Miejsce wystawienia</Translation>
              </TableHeader>
              <TableCell style={{ border: 0 }}>
                <Text>{data.placeOfIssue}</Text>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHeader style={{ width: "50%" }}>
                <Text>Date of Sell</Text>
                <Translation>Data sprzedazy</Translation>
              </TableHeader>
              <TableCell style={{ border: 0 }}>
                <Text>{data.dateOfSale}</Text>
              </TableCell>
            </TableRow>
            <TableRow style={{ border: 0 }}>
              <TableHeader style={{ width: "50%" }}>
                <Text>Date of Issue</Text>
                <Translation>Data wystawienia</Translation>
              </TableHeader>
              <TableCell style={{ border: 0 }}>
                <Text>{data.dateOfIssue}</Text>
              </TableCell>
            </TableRow>
          </Table>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            textAlign: "center",
          }}
        >
          <View style={{ width: "50%" }}>
            <TableHeader style={{ border: 0 }}>
              <Text style={{ width: "100%", textAlign: "center" }}>Seller</Text>
              <Translation style={{ width: "100%", textAlign: "center" }}>
                Sprzedawca
              </Translation>
            </TableHeader>
            <View style={{ width: "100%", textAlign: "left" }}>
              <Text>{data.from.name}</Text>
              <Text>{data.from.address}</Text>
              <Text>{data.from.nip}</Text>
            </View>
          </View>
          <View style={{ width: "50%" }}>
            <TableHeader style={{ border: 0 }}>
              <Text style={{ width: "100%", textAlign: "center" }}>Buyer</Text>
              <Translation style={{ width: "100%", textAlign: "center" }}>
                Nabywca
              </Translation>
            </TableHeader>
            <View style={{ width: "100%", textAlign: "left" }}>
              <Text>{data.to.name}</Text>
              <Text>{data.to.address}</Text>
              <Text>{data.to.ein}</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={{ fontSize: "18px", textAlign: "center" }}>
            Invoice {data.invoiceNumber}
          </Text>
        </View>
        <Table>
          <TableRow>
            <TableHeader style={{ ...styles.header, width: "7.5%" }}>
              <Text>No.</Text>
              <Translation>Lp.</Translation>
            </TableHeader>
            <View
              style={{
                ...tableStyles.tableHeader,
                ...styles.header,
                width: "30%",
              }}
            >
              <Text>Item</Text>
              <Translation>Nazwa</Translation>
            </View>
            <TableHeader style={{ ...styles.header, width: "7.5%" }}>
              <Text>Quantity</Text>
              <Translation>Ilosc</Translation>
            </TableHeader>
            <TableHeader style={{ ...styles.header, width: "7.5%" }}>
              <Text>Discount</Text>
              <Translation>Rabat</Translation>
            </TableHeader>
            <TableHeader style={styles.header}>
              <Text>Net Price</Text>
              <Translation>Cena netto</Translation>
              <Text>(USD)</Text>
            </TableHeader>
            <TableHeader style={styles.header}>
              <Text>VAT</Text>
              <Translation>VAT</Translation>
            </TableHeader>
            <TableHeader style={styles.header}>
              <Text>Net Value</Text>
              <Translation>Wartosc netto</Translation>
              <Text>(USD)</Text>
            </TableHeader>
            <TableHeader style={{ ...styles.header, width: "7.5%" }}>
              <Text>VAT</Text>
              <Text>Value</Text>
              <Translation>Wartosc VAT</Translation>
              <Text>(USD)</Text>
            </TableHeader>
            <TableHeader style={{ ...styles.header, borderRight: 0 }}>
              <Text>Gross Value</Text>
              <Translation>Wartosc brutto</Translation>
              <Text>(USD)</Text>
            </TableHeader>
          </TableRow>
          {data.items.map((item, index) => (
            <TableRow key={index} style={{ border: 0 }}>
              <TableCell style={{ ...styles.cell, width: "7.5%" }}>
                <Text>{index + 1}</Text>
              </TableCell>
              <TableCell
                style={{
                  ...tableStyles.tableCell,
                  width: "30%",
                }}
              >
                <Text>{item.name}</Text>
                <Translation>{item.nameTranslation}</Translation>
              </TableCell>
              <TableCell style={{ ...styles.cell, width: "7.5%" }}>
                <Text>{item.quantity}</Text>
              </TableCell>
              <TableCell style={{ ...styles.cell, width: "7.5%" }}>
                <Text>{item.discount}</Text>
              </TableCell>
              <TableCell style={styles.cell}>
                <Text>{item.netPrice}</Text>
              </TableCell>
              <TableCell style={styles.cell}>
                <Text>{item.vat}</Text>
              </TableCell>
              <TableCell style={styles.cell}>
                <Text>{item.netValue}</Text>
              </TableCell>
              <TableCell style={{ ...styles.cell, width: "7.5%" }}>
                <Text>{item.vaValue}</Text>
              </TableCell>
              <TableCell style={{ ...styles.cell, borderRight: 0 }}>
                <Text>{item.grossValue}</Text>
              </TableCell>
            </TableRow>
          ))}
        </Table>

        <View style={{ width: "70%", marginLeft: "auto" }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ marginRight: 4 }}>VAT - PLN Table</Text>
            <Translation>Tabela VAT - PLN</Translation>
          </View>
          <Table>
            <TableRow>
              <TableHeader style={styles.tableVatCell}>
                <Text>VAT</Text>
                <Translation>Nazwa stawki VAT</Translation>
              </TableHeader>
              <TableHeader style={styles.tableVatCell}>
                <Text>VAT (PLN)</Text>
                <Translation>Wartosc netto</Translation>
              </TableHeader>
              <TableHeader style={styles.tableVatCell}>
                <Text>VAT (PLN)</Text>
                <Translation>Kwota netto</Translation>
              </TableHeader>
              <TableHeader style={{ ...styles.tableVatCell, border: 0 }}>
                <Text>VAT (PLN)</Text>
                <Translation>Wartosc brutto</Translation>
              </TableHeader>
            </TableRow>
            <TableRow style={{ border: 0 }}>
              <TableCell style={styles.tableVatCell}>
                <Text>Untaxed</Text>
                <Translation>Nieopodatkowane</Translation>
              </TableCell>
              <TableCell style={styles.tableVatCell}>
                <Text>{data.plnTable.netValue}</Text>
              </TableCell>
              <TableCell style={styles.tableVatCell}>
                <Text>{data.plnTable.vatAmount}</Text>
              </TableCell>
              <TableCell style={{ ...styles.tableVatCell, border: 0 }}>
                <Text>{data.plnTable.grossValue}</Text>
              </TableCell>
            </TableRow>
          </Table>
        </View>

        <Table style={{ width: "70%", marginLeft: "auto" }}>
          <TableRow>
            <TableHeader style={{ width: "50%" }}>
              <Text>Total due (USD)</Text>
              <Translation>Razem do zaplaty</Translation>
            </TableHeader>
            <TableCell style={{ width: "50%", border: 0 }}>
              <Text>{data.totalDue}</Text>
            </TableCell>
          </TableRow>
          <TableRow style={{ borderBottom: 0.3 }}>
            <TableCell style={{ width: "50%", border: 0 }}>
              <Text>Transaction</Text>
              <Translation>Przelew</Translation>
            </TableCell>
            <TableCell
              style={{
                width: "50%",
                textAlign: "left",
                flexDirection: "row",
                alignItems: "center",
                border: 0,
              }}
            >
              <View>
                <Text>until</Text>
                <Translation>do dnia</Translation>
              </View>
              <Text style={{ textAlign: "center", margin: "auto" }}>
                {data.description.transactionDueTime}
              </Text>
            </TableCell>
          </TableRow>
          <TableRow style={{ borderBottom: 0.3 }}>
            <TableCell style={{ width: "50%", border: 0 }}>
              <Text>Total due</Text>
              <Translation>Na rachunek</Translation>
            </TableCell>
            <TableCell style={{ width: "50%", textAlign: "left", border: 0 }}>
              <Text>{data.description.account.currency}</Text>
              <Text>{data.description.account.bank}</Text>
              <Text>(SWIFT: {data.description.account.swift})</Text>
              <Text>{data.description.account.number}</Text>
            </TableCell>
          </TableRow>
          <TableRow style={{ border: 0 }}>
            <TableCell style={{ width: "50%", border: 0 }}>
              <Text>NBP rate</Text>
              <Translation>kurs NBP</Translation>
            </TableCell>
            <TableCell style={{ width: "50%", textAlign: "left", border: 0 }}>
              <Text>
                {data.description.rate.date} 1 USD ={" "}
                {data.description.rate.rate} PLN
              </Text>
            </TableCell>
          </TableRow>
        </Table>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
          }}
        >
          <View style={{ width: "50%" }}>
            <Table>
              <TableRow>
                <TableHeader>
                  <Text>Issuer</Text>
                  <Translation>Wystawil</Translation>
                </TableHeader>
                <TableCell style={{ border: 0, fontSize: "13px" }}>
                  <Text>{data.issuer}</Text>
                </TableCell>
              </TableRow>
              <TableRow style={{ height: "50px" }}>{null}</TableRow>
            </Table>
            <Text style={{ fontSize: "8px", margin: "auto" }}>
              Signature of the person authorized to issue the document
            </Text>
            <Translation
              style={{ fontSize: "8px", margin: "auto", color: "gray" }}
            >
              Podpis osoby upowaznionej do wystawienia dokumentu
            </Translation>
          </View>

          <View style={{ width: "50%" }}>
            <Table>
              <TableRow>
                <TableHeader>
                  <Text>Acquirer</Text>
                  <Translation>Odebral(a)</Translation>
                </TableHeader>
                <TableCell style={{ border: 0 }}>
                  <Text>{null}</Text>
                </TableCell>
              </TableRow>
              <TableRow style={{ height: "50px" }}>{null}</TableRow>
            </Table>
            <Text style={{ fontSize: "8px", margin: "auto" }}>
              Signature of the person authorized to issue the document
            </Text>
            <Translation
              style={{ fontSize: "8px", margin: "auto", color: "gray" }}
            >
              Podpis osoby upowaznionej do wystawienia dokumentu
            </Translation>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
