import { IBuyer } from "../../../types";

export class CustomerData implements IBuyer {
  payment: "card" | "cash" | "";
  email: string;
  phone: string;
  address: string;
  validObject: {
    address: string;
    email: string;
    phone: string;
    payment: string;
  };

  constructor() {
    this.address = "";
    this.email = "";
    this.phone = "";
    this.payment = "";
    this.validObject = {
      address: "Не заполнено поле адрес",
      email: "Не запонлено поле email",
      phone: "Не заполнено поле телефон",
      payment: "Не выбран вид оплаты",
    };
  }

  setAddress(address: string): void {
    this.address = address;
    this.validObject.address = "";
  }

  setEmail(email: string): void {
    this.email = email;
    this.validObject.email = "";
  }

  setPhone(phone: string): void {
    this.phone = phone;
    this.validObject.phone = "";
  }

  setPayment(payment: "card" | "cash" | ""): void {
    this.payment = payment;
    this.validObject.payment = "";
  }

  cleanData(): void {
    this.address = "";
    this.email = "";
    this.phone = "";
    this.payment = "";
    this.validObject = {
      address: "Не заполнено поле адрес",
      email: "Не заполнено поле email",
      phone: "Не заполнено поле телефон",
      payment: "Не выбран вид оплаты",
    };
  }

  getData(): IBuyer {
    return { address: this.address, email: this.email, phone: this.phone, payment: this.payment };
  }

  validateData(): { address?: string; email?: string; phone?: string; payment?: string } | true {
    if (
      this.validObject.address === "" &&
      this.validObject.email === "" &&
      this.validObject.phone === "" &&
      this.validObject.payment === ""
    )
      return true;
    const res: { address?: string; email?: string; phone?: string; payment?: string } = {};
    for (let [key, value] of Object.entries(this.validObject)) {
      if (value === "") continue;
      res[key as keyof typeof this.validObject] = value;
    }
    return res;
  }
}
