const LAZ_PERF_MODULE_PATH = '@loaders.gl/las/dist/lib/libs/laz-perf.js';

const NODE_ENVIRONMENT_DETECTION = new RegExp(
    [
        "ENVIRONMENT_IS_NODE =\\s*typeof process === 'object' &&",
        "\\s*typeof process\\.versions === 'object' &&",
        "\\s*typeof process\\.versions\\.node === 'string';"
    ].join('')
);

const isLazPerfModule = (moduleId) =>
    moduleId.replace(/\\/g, '/').endsWith(LAZ_PERF_MODULE_PATH);

export function browserOnlyLazPerf() {
    return {
        name: 'browser-only-laz-perf',
        transform(code, moduleId) {
            if (!isLazPerfModule(moduleId)) {
                return null;
            }
            if (!NODE_ENVIRONMENT_DETECTION.test(code)) {
                this.error('Node environment detection not found in ' + LAZ_PERF_MODULE_PATH);
            }
            return {
                code: code.replace(NODE_ENVIRONMENT_DETECTION, ''),
                map: null
            };
        }
    };
}
