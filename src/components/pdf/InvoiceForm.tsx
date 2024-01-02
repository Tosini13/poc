import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { FormType, ReductionType } from "./types";

type InvoiceFormPropsType = {
  register: UseFormRegister<FormType>;
  handleSubmit: UseFormHandleSubmit<FormType>;
  addNewReduction: () => void;
  removeReduction: (id: string) => void;
  reductions: ReductionType[];
};

const InvoiceForm: React.FC<InvoiceFormPropsType> = ({
  register,
  handleSubmit,
  addNewReduction,
  removeReduction,
  reductions,
}) => (
  <form
    data-testid="invoice_form"
    onSubmit={handleSubmit((data) => console.log("data", data))}
  >
    <label htmlFor="dateOfIssue">Date of issue</label>
    <input id="dateOfIssue" {...register("dateOfIssue")} type="date" />
    <br />
    <label htmlFor="invoiceNumber">Invoice Number</label>
    <input id="invoiceNumber" {...register("invoiceNumber")} type="number" />
    <br />
    <label htmlFor="workedHours">Worked hours</label>
    <input id="workedHours" {...register("workedHours")} type="number" />
    <br />
    {/* <label htmlFor="plnPerHour">PLN per Hour</label>
    <input id="plnPerHour" {...register("plnPerHour")} type="number" /> */}
    <label htmlFor="eurPerHour">EUR per Hour</label>
    <input id="eurPerHour" {...register("eurPerHour")} type="number" />
    <br />
    <div>
      <label htmlFor="reduction">Reductions</label>
      {reductions.map(({ id }, index) => (
        <div key={id}>
          <input
            id="reduction"
            {...register(`reductions.${index}.title`)}
            type="text"
          />
          <input
            id="reduction"
            {...register(`reductions.${index}.value`)}
            type="number"
          />
          <button onClick={() => removeReduction(id)}>Remove</button>
        </div>
      ))}
      <button onClick={addNewReduction}>Add reduction</button>
    </div>
    <br />
    <button type="submit">Submit</button>
  </form>
);

export default InvoiceForm;
