import { Serializable } from './serializable';
export class DemoModel implements Serializable<DemoModel> {
  id: number;
  name?: string;
  birthday?: string;
  salary?: number;
  type1?: number;
  type2?: number;
  type3?: number;
  type4?: number;
  type5?: number;

  deserialize(input: any): DemoModel {
    this.id = input.id;
    this.name = input.name;
    this.birthday = input.birthday;
    this.salary = input.salary;
    this.type1 = input.type1;
    this.type2 = input.type2;
    this.type3 = input.type3;
    this.type4 = input.type4;
    this.type5 = input.type5;
    return this;
  }
}

