import { IBuyer, payment } from "../../types";

export class CustomerData implements IBuyer {
  payment: payment;
  email: string;
  phone: string;
  address: string;
  errorsObject: {
    address?: string;
    email?: string;
    phone?: string;
    payment?: string;
  };

  constructor() {
    this.address = "";
    this.email = "";
    this.phone = "";
    this.payment = "";
    this.errorsObject = {};
  }

  setAddress(address: string): void {
    this.address = address;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setPayment(payment: payment): void {
    this.payment = payment;
  }

  cleanData(): void {
    this.address = "";
    this.email = "";
    this.phone = "";
    this.payment = "";
    this.errorsObject = {};
  }

  getData(): IBuyer {
    return {
      address: this.address,
      email: this.email,
      phone: this.phone,
      payment: this.payment,
    };
  }

  validateData():
    | { address?: string; email?: string; phone?: string; payment?: string }
    | true {
    const errorsMessage = {
      address: "Не указан адрес",
      email: "Не указан email",
      phone: "Не указан телефон",
      payment: "Не указан способ оплаты",
    };
    this.errorsObject = {};
    const fields = ["address", "email", "phone", "payment"] as const;

    for (let field of fields) {
      if (this[field] === "") {
        this.errorsObject[field] = errorsMessage[field];
      }
    }

    if (
      !this.errorsObject.address &&
      !this.errorsObject.email &&
      !this.errorsObject.phone &&
      !this.errorsObject.payment
    )
      return true;
    return this.errorsObject;
  }
}
