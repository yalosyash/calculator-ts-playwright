export function calculate(example: string): number {
  if (example.search(/[^0-9() +\-\/*\.\,]/g) !== -1) {
    throw new Error("Некорректное значение!");
  }

  const replacedCharsExample: string = example
    .replaceAll(",", ".")
    .replaceAll(" ", "");

  const separatedArr: string[] = separateStrToArr(replacedCharsExample);
  if (!bracketsIsMatch(separatedArr)) {
    errorOfBrackets();
  }

  return solveExample(separatedArr);
}

function bracketsIsMatch(arr: string[]): boolean {
  let bracketsCount: number = 0;

  for (const el of arr) {
    if (el === "(") {
      bracketsCount++;
    } else if (el === ")") {
      bracketsCount--;
    }
    if (bracketsCount < 0) {
      return false;
    }
  }
  return bracketsCount === 0;
}

function errorOfBrackets(): void {
  throw new Error("Скобки расставлены неверно!");
}

function separateStrToArr(str: string): string[] {
  let arr: string[] = [];
  let listOfSeparatorChars: string[] = ["(", ")", "*", "/", "-", "+"];
  let currentElement: string = "";

  for (let i: number = 0; i < str.length; i++) {
    if (listOfSeparatorChars.includes(str[i])) {
      if (currentElement !== "") {
        arr.push(currentElement);
      }
      arr.push(str[i]);
      currentElement = "";
    } else {
      currentElement += str[i];
    }
  }
  if (currentElement !== "") {
    arr.push(currentElement);
  }
  return arr;
}

function solveExample(arr: string[]): number {
  let currentIndex: number = 0;
  let answer: number = num();

  function num(): number {
    let result: number = last();

    while (currentIndex < arr.length) {
      if (arr[currentIndex] === "+") {
        currentIndex++;
        result += last();
      } else if (arr[currentIndex] === "-") {
        currentIndex++;
        result -= last();
      } else if (arr[currentIndex] === "(") {
        errorOfBrackets();
      } else {
        return result;
      }
    }
    return result;
  }

  function last(): number {
    let result: number = brackets();

    while (currentIndex < arr.length) {
      if (arr[currentIndex] === "*") {
        currentIndex++;
        result *= brackets();
      } else if (arr[currentIndex] === "/") {
        currentIndex++;
        let nextNum = brackets();
        if (nextNum === 0) {
          throw new Error("Деление на ноль!");
        } else {
          result /= nextNum;
        }
      } else {
        return result;
      }
    }
    return result;
  }

  function brackets(): number {
    let result: number = 1;

    if (arr[currentIndex] === "-") {
      result *= -1;
      currentIndex++;
    }

    if (arr[currentIndex] === "(") {
      currentIndex++;
      result *= num();
      if (arr[currentIndex] !== ")") {
        errorOfBrackets();
      }
      currentIndex++;
      return result;
    }

    result = result * parseFloat(arr[currentIndex]);
    currentIndex++;
    return result;
  }
  return answer;
}
