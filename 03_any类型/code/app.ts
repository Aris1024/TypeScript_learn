function main() {
    main1();
    main2();
    main3();
    main4();
    main5();
}
function main1() {
    console.log('--------- main1 any类型');
    console.log(`@@ ---- 变量类型一旦设为any，TypeScript 实际上会关闭这个变量的类型检查。即使有明显的类型错误，只要句法正确，都不会报错。`);
    let x: any;
    x = 1;
    x = 'foo';
    x = true;

    let y: any = 'hello';
    y(1);
    x.foo = 100;
}
function main2() {
    console.log('--------- main2');
    // 没有指定类型、TypeScript 必须自己推断类型的那些变量，
    // 如果无法推断出类型，TypeScript 就会认为该变量的类型是any。
    function add(x, y) {
        return x + y;
    }
    add(1, [1, 2, 3]);
}
function main3() {
    console.log('--------- main3 any 污染');
    /* 
        变量x的类型是any，实际的值是一个字符串。
        变量y的类型是number，表示这是一个数值变量，但是它被赋值为x，这时并不会报错。
        然后，变量y继续进行各种数值运算，TypeScript 也检查不出错误，问题就这样留到运行时才会暴露。
        污染其他具有正确类型的变量，把错误留到运行时，这就是不宜使用any类型的另一个主要原因。
     */
    let x: any = 'hello';
    let y: number;
    y = x; // 不报错
    y * 123; // 不报错
    y.toFixed(); // 不报错
}

function main4() {
    console.log('--------- main5 unknown 类型');
    let x: unknown;
    // 变量x的类型是unknown，可以赋值为各种类型的值。
    x = true; // 正确
    x = 42; // 正确
    x = 'hello'; // 正确

    // unknown类型跟any类型的不同之处在于，它不能直接使用。

    // 首先，unknown类型的变量，不能直接赋值给其他类型的变量（除了any类型和unknown类型）。
    // 变量v是unknown类型，赋值给any和unknown以外类型的变量都会报错，这就避免了污染问题，从而克服了any类型的一大缺点

    let v: unknown = 123;
    // let v1: boolean = v; // 报错
    // let v2: number = v; // 报错

    // 其次，不能直接调用unknown类型变量的方法和属性。
    let v1: unknown = { foo: 123 };
    // v1.foo // 报错
    let v2: unknown = 'hello';
    // v2.trim(); // 报错
    let v3: unknown = (n = 0) => n + 1;
    // v3(); // 报错

    /* 
    再次，unknown类型变量能够进行的运算是有限的，
    只能进行比较运算（运算符==、===、!=、!==、||、&&、?）、
    取反运算（运算符!）、typeof运算符和instanceof运算符这几种，其他运算都会报错。
    */
    let a: unknown = 1;
    // a + 1; // 报错! 不允许运算
    a === 1; // 可以编译,可以运行!

    // "类型缩小"
    if (typeof a === 'number') {
        // unknown类型的变量a经过typeof运算以后，能够确定实际类型是number，就能用于加法运算了。
        let r = a + 10; // 正确
    }
    let s: unknown = 'hello';
    if (typeof s === 'string') {
        s.length; // 正确
    }
    // 样设计的目的是，只有明确unknown变量的实际类型，才允许使用它，防止像any那样可以随意乱用，“污染”其他变量。类型缩小以后再使用，就不会报错。
    // unknown可以看作是更安全的any。一般来说，凡是需要设为any类型的地方，通常都应该优先考虑设为unknown类型。
    // unknown也可以视为所有其他类型（除了any）的全集，所以它和any一样，也属于 TypeScript 的顶层类型。

}

function main5() {
    console.log('--------- main5 never 类型');
    // never “空类型”的概念，即该类型为空，不包含任何值
    // 变量x的类型是never，就不可能赋给它任何值，否则都会报错。
    let x: never;
    // 参数变量x可能是字符串，也可能是数值，判断了这两种情况后，剩下的最后那个else分支里面，x就是never类型了。
    function fn(x: string|number) {
        if (typeof x === 'string') {

        } else if (typeof x === 'number') {

        } else {
            x; // never 类型;
        }
    }
    // never类型的一个重要特点是，可以赋值给任意其他类型
    // 函数f()会抛出错误，所以返回值类型可以写成never，即不可能返回任何值。
    function f(): never{
        throw new Error('出错了!');
    }
    let v1:number = f();
    let v2:string = f();
    let v3:boolean = f();
    /* 
    为什么never类型可以赋值给任意其他类型呢？
    这也跟集合论有关，空集是任何集合的子集。
    TypeScript 就相应规定，任何类型都包含了never类型。
    因此，never类型是任何其他类型所共有的，TypeScript 把这种情况称为“底层类型”（bottom type）。
    */
   /* 
   总之，TypeScript 有两个“顶层类型”（any和unknown），但是“底层类型”只有never唯一一个。
    */
}   

main();
