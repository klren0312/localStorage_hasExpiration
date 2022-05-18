import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
export default {
  input: 'src/index.ts',
  output: [{
    file: 'dist/zstorage.min.js',
    format: 'umd',
    name: 'Storage'
  }],
  plugins: [ terser(), typescript() ]
}
