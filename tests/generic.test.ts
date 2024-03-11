describe("Generic", () => {
  class GenericData<T> {
    value: T;

    constructor(value: T) {
      this.value = value;
    }

    get(): T {
      return this.value;
    }

    set(value: T): void {
      this.value = value;
    }
  }

  function create<T>(value: T): T {
    return value;
  }

  it("should support mutliple data type", () => {
    const dataNumber = new GenericData<number>(100);
    // dataNumber.value = "Otong"; // error
    // dataNumber.value = true; // error
    expect(dataNumber.value).toBe(100);

    const dataString = new GenericData<string>("Otong");
    // dataString.value = 132; // error
    // dataString.value = true; // error
    const upper = dataString.value.toUpperCase();
    expect(upper).toBe("OTONG");
  });

  it("should support function generic", () => {
    const result: string = create<string>("Otong");
    expect(result).toBe("Otong");

    const result2: number = create<number>(100);
    expect(result2).toBe(100);
  });

  class Entry<K, V> {
    constructor(public key: K, public value: V) {}
  }

  class Triple<K, V, T> {
    constructor(public key: K, public value: V, public third: T) {}
  }

  it("should support multiple generic type", () => {
    const entry = new Entry<number, string>(1, "Otong");
    expect(entry.key).toBe(1);
    expect(entry.value).toBe("Otong");

    const triple = new Triple<number, string, boolean>(1, "Otong", true);
    expect(triple.key).toBe(1);
    expect(triple.value).toBe("Otong");
    expect(triple.third).toBe(true);
  });

  it("should support optional generic type", () => {
    const entry = new Entry(1, "Aloo");
    expect(entry.key).toBe(1);
    expect(entry.value).toBe("Aloo");
  });

  class SimpleGeneric<T = number> {
    private value?: T;

    setValue(value: T): void {
      this.value = value;
    }

    getValue(): T | undefined {
      return this.value;
    }
  }

  it("should create simple generic", () => {
    const simpleString = new SimpleGeneric<string>();
    simpleString.setValue("Ucup");
    // simple.setValue(100); // error
    // simple.setValue(true); // error

    expect(simpleString.getValue()!.toUpperCase()).toBe("UCUP");

    const simpleDefault = new SimpleGeneric();
    simpleDefault.setValue(100);

    expect(simpleDefault.getValue()!).toBe(100);
  });

  interface Employee {
    id: string;
    name: string;
  }

  interface Manager extends Employee {
    totalEmployee: number;
  }

  interface VP extends Manager {
    totalManager: number;
  }

  class EmployeeData<T extends Employee> {
    constructor(public employee: T) {}
  }

  it("should support constraint", () => {
    const data = new EmployeeData<Employee>({
      id: "1",
      name: "Otong",
    });

    const data2 = new EmployeeData<Manager>({
      id: "1",
      name: "Otong",
      totalEmployee: 12,
    });

    const data3 = new EmployeeData<VP>({
      id: "1",
      name: "Otong",
      totalEmployee: 12,
      totalManager: 5,
    });

    // const data4 = new EmployeeData<string>("Otong"); // error
    // const data5 = new EmployeeData<number>(123); // error
  });

  it("should support array", () => {
    const array = new Array<string>();
    array.push("Otong");
    array.push("Surotong");

    expect(array[0]).toBe("Otong");
    expect(array[1]).toBe("Surotong");
  });

  it("should support set", () => {
    const set = new Set<string>();
    set.add("Otong");
    set.add("Ucup");
    set.add("Otong");

    expect(set.size).toBe(2);
    expect(set.has("Otong")).toBe(true);
    expect(set.has("Ucup")).toBe(true);
  });

  it("should support map", () => {
    const map = new Map<string, number>();
    map.set("Otong", 80);
    map.set("Ucup", 90);

    expect(map.get("Otong")).toBe(80);
    expect(map.get("Ucup")).toBe(90);
  });

  async function fetchData(value: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (value === "Otong") {
          resolve("Hello " + value);
        } else {
          reject("Not found");
        }
      }, 1000);
    });
  }

  it("should support promise", async () => {
    const result = await fetchData("Otong");
    expect(result).toBe("Hello Otong");

    try {
      await fetchData("Ucup");
    } catch (e) {
      expect(e).toBe("Not found");
    }
  });
});
