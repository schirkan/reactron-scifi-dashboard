import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript';
import ts from 'typescript';

export default {
    input: './src/browser/index.ts',
    output: [{
        file: './dist/bundle.browser.js',
        format: 'system',
        sourcemap: true
    }],
    plugins: [
        typescript({
            typescript: ts
        }),
        postcss({
            modules: true
        }),
        babel({
            exclude: 'node_modules/**'
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        resolve(),
        commonjs(),
    ],
    external: [
        'react',
        'react-dom',
        'moment',
        'moment-timezone'
    ]
};