describe("No Generic", () => {
  class Data {
    value: any;

    constructor(value: any) {
      this.value = value;
    }
  }

  it("should accept all values", () => {
    const data = new Data("Otong");
    // data.value = 1200;

    console.info(data.value.toUpperCase());
  });
});
