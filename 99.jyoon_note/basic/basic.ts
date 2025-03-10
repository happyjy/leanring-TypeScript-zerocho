const a: number = 5;
function add(x: number, y: number): number {
  return x + y;
}

//---
// 함수로 표현하는 방법에는 아래 3가지 방법이 있으며 case1,2 방법을 많이 사용한다.

// case1
const add1: (x: number, y: number) => number = (x, y) => x + y;

// case2
type Add = (x: number, y: number) => number;
const add2: Add = (x, y) => x + y;

// case3
interface Add1 {
  (x: number, y: number): number;
}
const add3: Add1 = (x, y) => x + y;

//---
const arr: string[] = ["123", "456"];
const arr2: number[] = [123, 456];
const arr3: Array<number> = [123, 456]; // 제네릭 표현 방법

//--- tuple
const arr4: [number, number, string] = [123, 456, "aaa"];

//---
const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

// let aa = 123;
// aa = "hi" as unknown as number;

// - 빈배열일때 never 타입으로 추론한다.
try {
  const array1 = []; // const array: never[]
  const array: number[] = []; // const array: never[]
  array.push(0);
} catch (error) {
  error;
}

//- 최대 한 ! 대신 if를 쓸 것
// const head: Element = document.querySelector("#head");
// const head1: Element = document.querySelector("#head")!;

// - string과 String은 다름. 소문자로 하는 것 기억하기.
const aa: string = "hello";
const bb: String = "hell"; // new String()
// function cc(a1: string, b2: string){}
function cc(a1: string, b2: String) {}
cc(aa, bb);

// - 템플릿 리터럴 타입이 존재(유니언 등 사용 가능)
type World = "world" | "hell";
const a1: World = "world";
// type Greeting = "hello world"
type Greeting = `hello ${World}`;
const c: Greeting = "hello hell";
const c1: Greeting = "hello world";

// - 배열, 튜플 문법
function rest(a, ...args: string[]) {
  console.log("rest: ", a, args); // 1 [ '2', '3' ]
}
rest("1", "2", "3");

const tuple: [string, number] = ["1", 1];
// tuple[2] = "hello"; // ts가 이건 막음
tuple.push("hello"); // ts가 이건 못 막음
console.log("tuple: ", tuple);

// - enum, keyof, typeof
const enum EDirection {
  Up = 3,
  Down,
  Left,
  Right,
}
console.log("EDirection.Left: ", EDirection.Left);

const ODirection = {
  Up: 100,
  Down: 101,
  Left: 102,
  Right: 103,
} as const;
console.log("ODirection.Left: ", ODirection.Left);

type key1 = keyof typeof ODirection; // ⭐️ type key1 = "Up" | "Down" | "Left" | "Right"
type Direction = (typeof ODirection)[key1]; // ⭐️ type Direction = 100 | 101 | 102 | 103

const obj1 = { a: 1, b: 2, c: 3 } as const;
type key = keyof typeof obj1; // obj1 객체의 key들만 타입으로 뽑아내고 싶을때
// == type key = "a" | "b" | "c"

function run(dir: Direction) {
  console.log("### run > dir: ", dir);
}

// - union, intersection
type A = {
  a: string;
};
type B = {
  b: string;
};

const aa1: A | B = { a: "hello", b: "world" };
const aa2: A | B = { a: "hello" };

const bb1: A & B = { a: "hello", b: "world" };
// const bb2: A & B = { a: "hello" }; // ⭐️ & 연산자로 A, B 두 타입을 엮었기 때문에 a, b 변수가 모두 있어야 한다.

// - type, interface 상속

type Animal = { breath: true };
type Mammal = Animal & { breed: true };
type Human = Mammal & { think: true };

const man: Human = { breath: true, breed: true, think: true };

// - ⭐️ type은 이와 같이 사용할 곳에서 사용할 수 있다. 하지만 interface는 불가능
const man1: Animal & { breed: true; think: true } = {
  breath: true,
  breed: true,
  think: true,
};

interface IAnimal {
  breath: true;
}
interface IMammal extends IAnimal {
  breed: true;
}
interface IHuman extends IMammal {
  think: true;
}

// - ⭐️ interface, type을 섞어서 사용 가능
interface IHuman1 extends Mammal {
  think: true;
}
type Human1 = IMammal & { think: true };

const man2: IHuman1 = { breath: true, breed: true, think: true };
const man3: Human1 = { breath: true, breed: true, think: true };

// - ⭐️ interface는 선언 할때 마다 합쳐 진다.
interface A1 {
  talk: () => void;
}
interface A1 {
  eat: () => void;
}
interface A1 {
  shit: () => void;
}
const a3: A1 = { talk() {}, eat() {}, shit() {} };

// - 넓은 타입, 좁은 타입
type A2 = string | number; // 넓은 타입
type A3 = string; // 좁은 타입
type A4 = string & number; //

// - 넓은 타입, 좁은 타입
type A5 = { name: string }; // 넓은 타입
type A6 = { age: number }; // 넓은 타입

type A5A6 = A5 | A6; // 넓은 타입

type A7 = { name: string; age: number }; // 좁은 타입(구체적일 수록 좁은타입)
type A8 = A5 & A6; // A7과 같은 의미

const a5a6: A5A6 = { name: "jyoon" };
const a5a6_1: A5A6 = { name: "jyoon", age: 34 };
// const a5a6_2: A5A6 = { name: "jyoon", age: 34 };

const a7: A8 = { name: "jyoon", age: 34 }; // ⭐️ intersection을 사용하면 모든 타입이 선언해야 한다.
// const a7_1: A8 = { name: "jyoon" }; //  error: Property 'age' is missing in type

// - 넓은 타입, 좁은 타입을 서로 할당 할 때
// const a7_2: A8 = a5a6_1; // ⭐️ 넓은 타입(a5a6_1)을 좁은 타입(a7_2)으로 할당 할때 에러가 난다.
const a5a6_3: A8 = a7; // ⭐️ 좁은 타입(a7)을 넓은 타입 a5a6_3으로 할당 가능하다

// - 객체 리터럴은 잉여 속성 검사가 있음.
// const a7_3: A8 = { name: "jyoon", age: 34, married: true }; // ⭐️ 잉여 속성 검사 때문에 married 부분에 에러가 난다. , 하지만 a7_4와 같은 과정을 거치면 잉여 속성 검사를 하지 않아 에러가 나지 않는다.
const a7_4 = { name: "jyoon", age: 34, married: true };
const a7_5: A8 = a7_4;

// - 3곳에서 사용할 수 있는 void
function a4(): void {
  // return null; // error
  // return undefined; // ok
  // return; // ok
  // ok
}

/* 
  3가지 위치에서 사용하는 void
  void_1. 함수 void 
  void_2. 매개변수 callback function void
  void_3. 메서드로 선언할때 void

  void_1, void2: ⭐️ error를 발생하지 않는다. 
    * 이유는 return을 사용하지 않겠다 라는 의미 
  void_3: ⭐️ error 발생.
    * return 값이 없어야 한다.
*/
function a5(callback: () => void /* void_2 */): void /* void_1 */ {
  // return 2; // error, bcz void_1
}

a5(() => 2 /* void_2 */);
interface Human2 {
  talk: () => void /* void_3 */;
}

const human: Human2 = {
  talk() {
    return 3;
  },
};
const talkRst = human.talk(); // ⭐️ talkRst의 type: void
const talkRst1 = human.talk() as unknown as number; // ⭐️ talkRst의 type은 number
// const talkRst2 = <number><unknown>human.talk(); // 위와 같은 의미
console.log("talkRst: ", talkRst);

//- void 타입은 return값을 사용하지 안 겠다는 뜻(메서드나 매개변수에서는 리턴값 사용 가능, but 조심해야 함)

// declare: 구형도를 사용하지 않고 function forEach를 사용할 수 있는 방법, 외부에서 선언한 것을 사용하기 위해서 declare를 선언하고 사용한다.

// declare function forEach(
//   arr: number[],
//   callback: (el: number) => undefined /* 원인은 undefined */
// ): void; // ⭐️ error: target.push의 반환값은 int 값이다. 여기서 callback 부분에 undefined와 상이하기 때문에 error가 발생한다.

// declare function forEach(arr: number[], callback: (el: number) => void): void;

let target: number[] = [];
// forEach([1, 2, 3], (el) => target.push(el));
// [1, 2, 3].forEach((el) => target.push(el));

// -

try {
} catch (error) {
  error; // type: unknown
}

// - 타입 가드

class A9 {
  aaa() {}
}

class B3 {
  bbb() {}
}

function aOrB(param: A9 | B3) {
  if (param instanceof A9) {
    param.aaa();
  }
}
aOrB(new A9());
aOrB(new B3());

type B4 = { type: "b"; bbb: string };
type C = { type: "c"; ccc: string };
type D = { type: "d"; ddd: string };
type A10 = B4 | C | D;
function typeCheck(a: A10) {
  if (a.type === "b") {
    a.bbb;
  } else if (a.type === "c") {
    a.ccc;
  } else {
    a.ddd;
  }

  if ("bbb" in a) {
    a.type;
  } else if ("ccc" in a) {
    a.ccc;
  } else {
    a.ddd;
  }
}

// - 커스텀 타입 가드(is, 형식 조건자)

interface Cat {
  meow: number;
}
interface Dog {
  bow: number;
}
function catOrDog(
  a: Cat | Dog
): a is Dog /* ⭐️ 이게 있어야 조건문에서 분기가 가능하다. */ {
  if ((a as Cat).meow) {
    return false;
  }
  return true;
}

function pet(pet: Cat | Dog) {
  if (catOrDog(pet)) {
    console.log("pet > dog: ", pet.bow);
  }
  if ("meow" in pet) {
    console.log("pet > cat: ", pet.meow);
  }
}

const cat: Cat | Dog = { meow: 3 };
pet(cat);

// const isRejected = (
//   input: PromiseSettledResult<unknown>
// ): input is PromiseRejectedResult /*⭐️ */ => {
//   return input.status === "rejected";
// };

// const isFulfilled = <T>(
//   input: PromiseSettledResult<T>
// ): input is PromiseFulfilledResult<T> /*⭐️ */ => {
//   return input.status === "fulfilled";
// };

// {
//   /*

// Promise -> Pending -> Settled(Resolved, Rejected)
// promise.then().catch()
//         -------------- -> Settled
//         ------ -> Resolved
//                ------- -> Rejected

// */
// }

// const promises = await Promise.allSettled([
//   Promise.resolve("a"),
//   Promise.resolve("b"),
// ]);
// const errors = promises.filter((promise) => promise.status === "rejected");
// const errors = promises.filter(isRejected);

// - readonly, 인덱스드 시그니처, 맵드 타입스

//인덱스드 시그니처
// type A11 = { a: string; b: string; c: string; d: string };
type A11 = { [key: string]: string };
type A12 = { [key: string]: number };
const a8: A11 = { a: "hi", b: "hello", c: "jyoon", d: "world" };
const a9: A12 = { a: 11, b: 11, c: 11, d: 11 };

// 맵드 타입스
type A13 = "Human" | "Mammal" | "Animal";
type A14 = { [key in A13]: number };
const a10: A14 = {
  Human: 11,
  Mammal: 11,
  Animal: 11,
};

type A15 = { [key in A13]: A13 };
const a11: A15 = {
  Human: "Human",
  Mammal: "Mammal",
  Animal: "Animal",
};

// interface로는 아래 처럼 |(intersection), &로 표현하지 못한다.
type A16 = "Human" | "Mammal" | "Animal";
type A17 = "Human" & "Mammal" & "Animal";

// - class 기초

class A18 {
  a: string;
  b: number;
  c?: number;

  /* ⭐️ 기본값이 있을때 는 ? 연산자를 쓰지못한다. */
  constructor(a: string, b: number = 123, c?: number) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  method() {}
}

new A18("1234");

type A19 = A18;
const a12: A19 = new A18("1234"); // 클래스 이름은(A19) 인스턴스를 가르킨다.
const a13: typeof A18 = A18; // typeof A19: class 자체
// const a13: typeof A18 = new A18("1234"); // error

// typescript의 private을 사용하는것이 더 좋다고함
//  (하지만 js로 변환시 public으로 변한다고 한다. 하지만, ts에서 작업할때는 접근이 불가능해 컴파일이 안된다. 즉 사용해도 된다. )
// 이유는 typescript는 protected도 제공해주지만 js에서는 제공하지 않음.
class A20 {
  private a: string; // private: typescript에서 제공
  // #b: number;

  constructor(a: string, b: number = 123) {
    this.a = a;
    // this.#b = b;
  }

  method() {}
}

// private은 "속한 클래스"에서만 사용 가능
// protected는 "속한 클래스 + 상속된 클래스"에서 사용 가능
// public은 "속한 클래스 + 상속된 클래스 + 인스턴스"에서 사용 가능
interface A21 {
  a: string;
  b: string;
  c: string;
  d: string;
}
// 아래 private, protexted, public접근제한자 를 사용하면 ts 에러가나오고 있음.
class B6 implements A21 {
  /* private */ a: string = "12341";
  /* protected */ b: string = "1234";
  /* public */ c: string = "wow";
  d: string = "wow";

  method() {
    console.log(this.a);
    console.log(this.b);
    console.log(this.c);
    console.log(this.d);
  }
}
class C2 extends B6 {
  method() {
    // console.log(this.a); // a 접근 제한 됨
    console.log(this.b);
    console.log(this.c);
    console.log(this.d);
  }
}
// console.log("new C2().a: ", new C2().a);
// console.log("new C2().b: ", new C2().b);
console.log("new C2().c: ", new C2().c);
