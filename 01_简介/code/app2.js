function main() {
    main1();
}
function main1() {
    console.log('--------- main1 类型声明');
    // 变量foo的后面使用冒号，声明了它的类型为string
    var foo;
    // 函数toString()的参数num的类型是number。
    // 参数列表的圆括号后面，声明了返回值的类型是string。
    function toString(num) {
        console.log('');
        return String(num);
    }
    // 注意，变量的值应该与声明的类型一致，如果不一致，TypeScript 就会报错。
    // let bar:string = 123; // 报错！
    // 变量x没有赋值就被读取，导致报错。
    var x;
    // console.log(`@@ ---- x`,x); // 报错！
}
function main2() {
    console.log('--------- main2 类型推断');
    // 类型声明并不是必需的，如果没有，TypeScript 会自己推断类型。
    var foo = 123;
    // foo = 'hello'; // 报错！
    // 函数toString()没有声明返回值的类型，但是 TypeScript 推断返回的是字符串。
    // 正是因为 TypeScript 的类型推断，所以函数返回值的类型通常是省略不写的。
    function toString(num) {
        return String(num);
    }
}
main();
