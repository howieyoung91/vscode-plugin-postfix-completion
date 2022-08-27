-   ### C/C++

|         postfix |                                                                                |
| --------------: | ------------------------------------------------------------------------------ |
|         **.if** | `if (${expr}) {}`                                                              |
|        **.not** | `!{expr}`                                                                      |
|       **.fori** | `for (int i = 0; i < ${expr}; i++) {}`                                         |
|       **.forr** | `for (int i = ${expr}; i >= 0; i--) {}`                                        |
|      **.while** | `while(${expr}) {}`                                                            |
|     **.return** | `return {expr};`                                                               |
|    **.include** | `#include "${expr}"`                                                           |
|     **.define** | `#define ${expr}`                                                              |
|       **.cout** | `std::cout << ${expr} <<std::endl;`                                            |
|        **.cin** | `std::cin >> ${expr};`                                                         |
|   **.template** | `template <${expr}>` 输入: E T.template 生成:`template<typename E,typename T>` |
|      **.class** | `class ${expr} {}`                                                             |
|     **.struct** | `struct ${expr} {}`                                                            |
|        **.ptr** | `*${expr} `                                                                    |
|       **.null** | `if (${expr} == NULL) {}`                                                      |
|    **.notnull** | `if (${expr} != NULL) {}`                                                      |
|    **.nullptr** | `if (${expr} == nullptr) {}`                                                   |
| **.notnullptr** | `if (${expr} != nullptr) {}`                                                   |

-   ## Java

|         后缀 | 补全结果                                |
| -----------: | --------------------------------------- |
|     **.var** | `class varName = ${expr};`              |
|      **.if** | `if (${expr}) {}`                       |
|     **.not** | `!{expr}`                               |
|    **.null** | `if (${expr} == null) {}`               |
| **.notnull** | `if (${expr} != null) {}`               |
|    **.fori** | `for (int i = 0; i < ${expr}; i++) {}`  |
|    **.forr** | `for (int i = ${expr}; i >= 0; i--) {}` |
| **.foreach** | `for (var item : ${expr}) {}`           |
|   **.while** | `while(${expr}) {}`                     |
|    **.sout** | `System.out.println(${expr});`          |
|    **.souf** | `System.out.printf("$1",${expr});`      |
|    **.serr** | `System.err.println(${expr});`          |
|  **.assert** | `assert ${expr};`                       |
|  **.return** | `return {expr};`                        |

-   ### JavaScript/TypeScript

|        后缀 | 补全结果                                |
| ----------: | --------------------------------------- |
|     **.if** | `if (${expr}) {}`                       |
|    **.not** | `!{expr}`                               |
|   **.fori** | `for (let i = 0; i < ${expr}; i++) {}`  |
|   **.forr** | `for (let i = ${expr}; i >= 0; i--) {}` |
|  **.forof** | `for (const item of ${expr}) {}`        |
|  **.forin** | `for (let i in ${expr}) {}`             |
|    **.log** | `console.log(${expr})`                  |
|   **.warn** | `console.warn(${expr})`                 |
|  **.error** | `console.error(${expr})`                |
|  **.while** | `while(${expr}) {}`                     |
| **.return** | `return {expr};`                        |

-   ### Python

|         后缀 | 补全结果                                                                                           |
| -----------: | -------------------------------------------------------------------------------------------------- |
|     **.len** | `len(${expr})`                                                                                     |
|  **.return** | `return ${expr}`                                                                                   |
|     **.for** | `for i in range(${expr}): ` or `for i in ${expr}`                                                  |
|      **.if** | `if ${expr}:`                                                                                      |
|    **.none** | `if ${expr} is None:`                                                                              |
| **.notnone** | `if ${expr} is not None:`                                                                          |
|     **.not** | `not ${expr}****`                                                                                  |
|   **.print** | `print(${expr})`                                                                                   |
|     **.var** | `varName = ${expr}`                                                                                |
|   **.while** | `while ${expr}:`                                                                                   |
|  **.matrix** | `生成二维矩阵 输入 1 2 3 4 2(矩阵的行) 2(矩阵的列).matrix 会生成一个 2 行 2 列的矩阵[[1,2],[3,4]]` |

-   ### Golang

|           后缀 | 补全结果                         |
| -------------: | -------------------------------- |
|       **.var** | `varName := ${expr}`             |
|     **.const** | `const varName type = ${expr}`   |
|       **.for** | `for i, elem in range ${expr}{}` |
|        **.if** | `if (${expr}) {}`                |
|       **.nil** | `if ${expr} == nil {}`           |
|    **.notnil** | `if ${expr} != nil {}`           |
|    **.switch** | `switch ${expr} {}`              |
|       **.err** | `errors.New(${expr}) `           |
| **.interface** | `type ${expr} interface {}`      |
|    **.struct** | `type ${expr} struct {}`         |
|    **.printf** | `fmt.Printf("%+v\n",${expr})`    |
|   **.println** | `fmt.Println(${expr})`           |
|       **.len** | `len(${expr})`                   |
|    **.return** | `return ${expr}`                 |

**Happy coding!**
