import { UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form";
import { FormType } from "./types";
import { useState } from "react";

type InvoiceFormPropsType = {
  register: UseFormRegister<FormType>;
  handleSubmit: UseFormHandleSubmit<FormType>;
  reductionDefaultQty: number;
};

const InvoiceForm: React.FC<InvoiceFormPropsType> = ({
  register,
  handleSubmit,
  reductionDefaultQty,
}) => {
  const [reductionQty, setReductionQty] = useState(reductionDefaultQty);
  return (
    <form
      data-testid="invoice_form"
      onSubmit={handleSubmit((data) => console.log("data", data))}
    >
      <label htmlFor="dateOfIssue">Date of issue</label>
      <input id="dateOfIssue" {...register("dateOfIssue")} type="date" />
      <br />
      <label htmlFor="workedHours">Worked hours</label>
      <input id="workedHours" {...register("workedHours")} type="number" />
      <br />
      <label htmlFor="plnPerHour">PLN per Hour</label>
      <input id="plnPerHour" {...register("plnPerHour")} type="number" />
      <br />
      <div>
        <label htmlFor="reduction">Reductions</label>
        {Array(reductionQty)
          .fill(0)
          .map((_, index) => (
            <div key={index}>
              <input
                id="reduction"
                {...register(`reduction.${index}.title`)}
                type="text"
              />
              <input
                id="reduction"
                {...register(`reduction.${index}.value`)}
                type="number"
              />
            </div>
          ))}
        <button onClick={() => setReductionQty(reductionQty + 1)}>
          Add reduction
        </button>
      </div>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default InvoiceForm;
