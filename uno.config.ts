import { defineConfig, presetAttributify, presetUno, presetIcons } from "unocss";
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetAttributify(), 
    presetUno({
      extract: {
        include: ['src/**/*.{vue,html,jsx,tsx}'],
        exclude: ['node_modules', '.git'],
      },
    })
  ],
  transformers: [
    transformerAttributifyJsx()
  ],
  theme: {
    animation: {
      keyframes: {
        toastShow: `{
          0% {
            bottom: calc(-1rem - 20px);
          }
          100% {
            bottom: 50px;
          }
        }`
      }
    },
    colors: {
      primary: {
        d: '#5985eb',
        a: '#4e6fbb'
      },
      error: {
        d: '#e5544b',
        h: '#c95047',
        a: '#99362f'
      }
    }
  }
})