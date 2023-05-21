import { defineComponent, ref, watchEffect } from "vue";
import emitter from "../../utils/emitter";

export default defineComponent({
  props: {
    title: {
      default: 'title',
      type: String
    },
    showLeftImg: {
      default: false,
      type: Boolean
    },
    leftImg: {
      default: 'i-fluent:chevron-left-16-filled',
      type: String
    },
    showRightImg: {
      default: false,
      type: Boolean
    },
    bgColor: {
      default: 'default',
      type: String
    }
  },
  emits: ['leftFn'],
  setup(props, { emit }) {
    const isLight = ref(props.bgColor === 'light')

    watchEffect(() => {
      isLight.value = props.bgColor === 'light'
      emitter.emit('titleColor', isLight.value)
    })

    return () => (
      <div 
        backdrop-blur-5px
        bg={isLight.value ? 'white/50' : '#7a695cdd'} sticky top-41px
        h-50px w-screen z-1
        flex justify-center items-center
        shadow="md black/20"
      >
        {props.showLeftImg ? (
        <div
          absolute left-10px
          border="1px solid #594b4230"
          h-30px w-30px cursor-pointer
          flex justify-center items-center
          rounded-5px bg="hover:black/10 active:black/20" 
          onClick={() => emit('leftFn')}
        >
          <div className={props.leftImg} c={isLight.value ? '#333' : 'white'} text-20px></div>
        </div>) : null}
        <div font-bold c={isLight.value ? '#333' : 'white'}>{props.title}</div>
        {props.showRightImg ? 
        <div 
          absolute right-10px
          border="1px solid #594b4230"
          h-30px w-30px cursor-pointer
          flex justify-center items-center
          rounded-5px bg="hover:black/10 active:black/20" 
          onClick={() => emitter.emit('showAddItem')}
        >
          <div i-mdi-plus c-white text-20px></div>
        </div> : null}
      </div>
    )
  }
})