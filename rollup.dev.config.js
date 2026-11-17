import { browserOnlyLazPerf } from './rollup.browser-only.js';
import {nodeResolve} from '@rollup/plugin-node-resolve';

export default {
    input: './src/index.js',
    output: [
        {
            file: './dist/xeokit-sdk.es.js',
            format: 'es',
            name: 'bundle'
        }
    ],
    plugins: [
        browserOnlyLazPerf(),
        nodeResolve({
            browser: true,
            preferBuiltins: false
        })
    ]
}