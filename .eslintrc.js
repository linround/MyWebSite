// eslint-disable-next-line no-undef
module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'semi': ['error', 'never'], // 分号禁止
        'quotes': ['error', 'single'], // 使用单引号
        'no-param-reassign': ['error'], // 不要直接给函数参数赋值.
        'prefer-spread': 'error', // 使用扩展语法来调用可变参数的函数.
        'function-paren-newline': ['error', { 'minItems': 3 }], // 参数超过3个时换行
        'arrow-spacing': ['error', { 'before': true, 'after': true }], // 箭头函数的前后空格
        'arrow-parens': ['error', 'always'], // 为了清晰和一致，始终在参数周围加上括号  最小化修改后的差异
        'arrow-body-style': ['error', 'as-needed'], // 将头函数的返回必要时用大括号包裹
        'no-confusing-arrow': 'error', // 避免混淆箭头（=>）和符号（=> <=）
        'implicit-arrow-linebreak': ['error', 'beside'], // 隐式返回时在箭头同行，右大括号包裹时换行
    
        /**
         * 对于class的一些见解
         */
        // 尽量使用class语法代替原型语法 类语法更简洁，更容易推理
        // 使用 extends进行继承 这是一种自建的方式继承原型的功能，从而不破换原型链
        // 方法中还回this，从而实现链式调用
        // 在类中定义原型方法，从而也避免了对于原型原有方法的副作用
        
        
        'no-useless-constructor': 'error', // 类中避免无效的 constructor
        'no-dupe-class-members': 'error', // 类中避免重复定义方法
        // 'class-methods-use-this': 'error', // 类中不使用this应该定义为 static ；使用this 定义为正常属性
        
        // 关于模块的见解
        // 不要使用通配符导入 确保上个模块有默认导出
        // 不要直接从导入中导出 尽管单线很简洁，但有一种清晰的导入方式和一种清晰的导出方式会使事情保持一致
    
    
        'no-duplicate-imports': 'error', // 仅仅从一个地方导入  因为同一路径导入多行会使代码维护困难
         // 不要导出可变的值， 通常导出一个引用来处理这些问题
        
}
}
