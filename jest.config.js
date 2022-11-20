const transformIgnorePatterns = [
    '/dist/',
    'node_modules/[^/]+?/(?!(es|node_modules)/)',
];

module.exports = {
    collectCoverage: true, // 是否统计覆盖率  
    collectCoverageFrom: ["src/**/*.{js,vue}"], // 测试哪些目录文件的覆盖率  
    coverageDirectory: 'testReport', // 测试覆盖率报告目录 
    moduleFileExtensions: [  // 测试文件的类型    
        'js',
        'jsx',
        'json',
        'vue',
    ],
    testPathIgnorePatterns: ['/node_modules/', 'node'],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|gif|ttf|woff|woff2)$':
            'jest-transform-stub',
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    setupFiles: ["<rootDir>/src/tests/unit/index.js"],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: [
        '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)' // 设置识别哪些文件是测试文件   
    ],
    testURL: 'http://localhost/',
    transformIgnorePatterns
}
