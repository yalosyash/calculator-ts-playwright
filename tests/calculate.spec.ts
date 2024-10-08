import { test, expect } from "@playwright/test";
import { calculate } from "../src/calculate";

test.describe("Negative tests", () => {
  test("Send 'zxc', should return Error", () => {
    expect(() => {
      calculate("zxc");
    }).toThrow();
  });

  test("Send '3(+2', should return Error", () => {
    expect(() => {
      calculate("3(+ 2");
    }).toThrow();
  });

  test("Send '3)+2', should return Error", () => {
    expect(() => {
      calculate("3)+2");
    }).toThrow();
  });

  test("Send '(3+2()', should return Error", () => {
    expect(() => {
      calculate("(3+2()");
    }).toThrow();
  });

  test("Send '3+(-2-)', should return Error", () => {
    expect(() => {
      calculate("3 + (-2-)");
    }).toThrow();
  });

  test("Send '(3+2)()', should return Error", () => {
    expect(() => {
      calculate("(3+2)()");
    }).toThrow();
  });

  test("Should solve 4,5+5=9.5", () => {
    expect(calculate("4,5+5")).toBe(9.5);
  });

  test("Should solve 4.5+5=9.5", () => {
    expect(calculate("4.5+5")).toBe(9.5);
  });

  test("Should solve 5 + 5=10", () => {
    expect(calculate("5 + 5")).toBe(10);
  });
});

test.describe("Positive tests", () => {
  test("Should solve 1+2+3+4+5+6+7+8+9+0=45", () => {
    expect(calculate("1+2+3+4+5+6+7+8+9+0")).toBe(45);
  });

  test("Should solve 0-0.1-0.2-0.3-0.4-0.5-0.6-0.7-0.8-0.9=-4.5", () => {
    expect(calculate("0-0.1-0.2-0.3-0.4-0.5-0.6-0.7-0.8-0.9")).toBe(-4.5);
  });

  test("Should solve 3+2=5", () => {
    expect(calculate("3+2")).toBe(5);
  });

  test("Should solve 3-2=1", () => {
    expect(calculate("3-2")).toBe(1);
  });

  test("Should solve 3*2=6", () => {
    expect(calculate("3*2")).toBe(6);
  });

  test("Should solve 10/2=5", () => {
    expect(calculate("10/2")).toBe(5);
  });

  test("Should solve 10.7/2=5.35", () => {
    expect(calculate("10.7/2")).toBe(5.35);
  });

  test("Should solve 10.7*2=21.4", () => {
    expect(calculate("10.7*2")).toBe(21.4);
  });

  test("Should solve -3+2=-1", () => {
    expect(calculate("-3+2")).toBe(-1);
  });

  test("Should solve -3+(-2)=-5", () => {
    expect(calculate("-3+(-2)")).toBe(-5);
  });

  test("Should solve 5+5+5+5+5=25", () => {
    expect(calculate("5+5+5+5+5")).toBe(25);
  });

  test("Should solve 40-5-5-5-5=20", () => {
    expect(calculate("40-5-5-5-5")).toBe(20);
  });

  test("Should solve 5*5*5*5*5=3125", () => {
    expect(calculate("5*5*5*5*5")).toBe(3125);
  });

  test("Should solve 3125/5/5/5/5=5", () => {
    expect(calculate("3125/5/5/5/5")).toBe(5);
  });

  test("Should solve 4+4+2-2-3/3/5*5*5=3", () => {
    expect(calculate("4+4+2-2-3/3/5*5*5")).toBe(3);
  });

  test("Should solve (5+2)=7", () => {
    expect(calculate("(5+2)")).toBe(7);
  });

  test("Should solve (5+2)-1=6", () => {
    expect(calculate("(5+2)-1")).toBe(6);
  });

  test("Should solve 14-(5+2)-1=7", () => {
    expect(calculate("14-(5+2)")).toBe(7);
  });

  test("Should solve 14-((5+3)-1)=7", () => {
    expect(calculate("14-((5+3)-1)")).toBe(7);
  });

  test("Should solve 14-(5+(5-3))=7", () => {
    expect(calculate("14-(5+(5-3))")).toBe(7);
  });

  test("Should solve ((5+3)-5)+4=7", () => {
    expect(calculate("((5+3)-5)+4")).toBe(7);
  });

  test("Should solve (5+(5-3))=7", () => {
    expect(calculate("(10-(5+3))+5")).toBe(7);
  });

  test("Should solve (5+2)/(5+2)=1", () => {
    expect(calculate("(5+2)/(5+2)")).toBe(1);
  });

  test("Should solve ((5+2)/(5+2)*(5-2)*(5-2))+1=10", () => {
    expect(calculate("((5+2)/(5+2)*(5-2)*(5-2))+1")).toBe(10);
  });

  test("Should solve 10-((5+2)/(5+2)*(5-2)*(5-2))=1", () => {
    expect(calculate("10-((5+2)/(5+2)*(5-2)*(5-2))")).toBe(1);
  });

  test("Should solve 3636+4848*3626-7447/2626+(2526-4777*(3626+4663))-2773*(3737-2727)=-24812275.83587205", () => {
    expect(
      calculate(
        "3636+4848*3626-7447/2626+(2526-4777*(3626+4663))-2773*(3737-2727)"
      )
    ).toBe(-24812275.83587205);
  });
});
