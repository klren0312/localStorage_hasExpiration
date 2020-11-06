import { terser } from 'rollup-plugin-terser'
export default {
  input: 'index.js',
  output: [{
    file: 'dist/zstorage.min.js',
    format: 'umd',
    name: 'Storage'
  }],
  plugins: [ terser() ]
}
