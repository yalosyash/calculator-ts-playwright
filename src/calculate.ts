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
  if (!isSignPlacedGood(separatedArr)) {
    errorOfSigns();
  }
  return solveExample(separatedArr);
}

// Функция проверяет, совпадает ли количество открытых и закрытых скобок в массиве значений
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

// Функция проверяет, есть ли знаки действий в начале, в конце и друг за другом в массиве значений
function isSignPlacedGood(arr: string[]): boolean {
  const listOfSigns: string[] = ["*", "/", "+"];
  if (
    listOfSigns.includes(arr[arr.length - 1]) ||
    arr[arr.length - 1] === "-" ||
    listOfSigns.includes(arr[0])
  ) {
    return false;
  }

  for (let i: number = 0; i < arr.length; i++) {
    if (listOfSigns.includes(arr[i]) && listOfSigns.includes(arr[i + 1])) {
      return false;
    }
  }
  return true;
}

// Функция выбрасывает исключение, если знаки расставлены неверно
function errorOfSigns(): void {
  throw new Error("Знаки расставлены неверно!");
}

// Функция выбрасывает исключение, если скобки расставлены неверно
function errorOfBrackets(): void {
  throw new Error("Скобки расставлены неверно!");
}

// Функция разделяет строку на массив с элементами примера: скобки, знаки, числа
function separateStrToArr(str: string): string[] {
  const listOfSeparatorChars: string[] = ["(", ")", "*", "/", "-", "+"];
  let currentElement: string = "";
  let arr: string[] = [];

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

// Функция решает пример, последовательно проходя по каждому элементу массива
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
