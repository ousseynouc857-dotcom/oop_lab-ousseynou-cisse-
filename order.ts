class Customer {
  private name: string;
  private phone: string;

  constructor(name: string, phone: string) {
    this.name = name;
    this.phone = phone;
  }

  getName(): string {
    return this.name;
  }
}

abstract class MenuItem {
  private name: string;
  private price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  getPrice(): number {
    return this.price;
  }

  describe(): string {
    return `${this.name} (${this.category()}) — ${this.price} FCFA`;
  }

  protected abstract category(): string;
}

class Dish extends MenuItem {
  private spicy: boolean;

  constructor(name: string, price: number, spicy: boolean) {
    super(name, price);
    this.spicy = spicy;
  }

  protected category(): string {
    return this.spicy ? "spicy dish" : "dish";
  }
}

class Drink extends MenuItem {
  private volumeCl: number;

  constructor(name: string, price: number, volumeCl: number) {
    super(name, price);
    this.volumeCl = volumeCl;
  }

  protected category(): string {
    return "drink, " + this.volumeCl + " cl";
  }
}

class OrderLine {
  private item: MenuItem;
  private quantity: number;

  constructor(item: MenuItem, quantity: number) {
    this.item = item;
    this.quantity = quantity;
  }

  subtotal(): number {
    return this.item.getPrice() * this.quantity;
  }

  getItem(): MenuItem {
    return this.item;
  }

  getQuantity(): number {
    return this.quantity;
  }

  changeQuantity(quantity: number): void {
    this.quantity = quantity;
  }
}

class Order {
  private customer: Customer;
  private lines: OrderLine[] = [];

  constructor(customer: Customer) {
    this.customer = customer;
  }

  addLine(item: MenuItem, quantity: number): boolean {
    if (!Number.isInteger(quantity) || quantity < 1) return false;
    this.lines.push(new OrderLine(item, quantity));
    return true;
  }

  lineCount(): number {
    return this.lines.length;
  }

  total(): number {
    let sum = 0;
    for (const line of this.lines) sum += line.subtotal();
    return sum;
  }

  summary(): string {
    return `${this.customer.getName()}: ${this.lineCount()} lines, ${this.total()} FCFA`;
  }

  copyFrom(other: Order): void {
    for (const line of other.lines) {
      this.lines.push(new OrderLine(line.getItem(), line.getQuantity()));
    }
  }

  changeQuantity(index: number, quantity: number): boolean {
    if (!Number.isInteger(index) || index < 0 || index >= this.lines.length) return false;
    if (!Number.isInteger(quantity) || quantity < 1) return false;
    this.lines[index].changeQuantity(quantity);
    return true;
  }
}

// ---------- Tests ----------
const awa = new Customer("Awa", "77 000 00 01");
console.log(awa.getName());

const thieb = new Dish("Thieboudienne", 2500, false);
const yassa = new Dish("Yassa poulet", 2000, true);
const bissap = new Drink("Bissap", 500, 33);

console.log(thieb.describe());
console.log(yassa.describe());
console.log(bissap.describe());

const order = new Order(awa);
console.log(order.addLine(thieb, 2), order.addLine(bissap, 3), order.addLine(yassa, 0), order.addLine(yassa, 1.5));
console.log(order.lineCount(), order.total());
console.log(order.summary());

const fatou = new Customer("Fatou", "77 000 00 02");
const copy = new Order(fatou);
copy.copyFrom(order);
console.log(order.total(), copy.total());
console.log(order.changeQuantity(0, 10), order.changeQuantity(5, 1));
console.log(order.total(), copy.total());
