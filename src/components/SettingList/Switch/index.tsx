const Switch: SetupFC = () => {
  const props = withDefaults(defineProps<{
    swichState: boolean
  }>(), {
    swichState: true,
  })

  const emit = defineEmits<{
    switch: []
  }>()

  return () => (
    <div
      h="1.75em" w="3.45em" right-10px rounded="1em"
      bg="white dark:#333/70" absolute
      flex items-center overflow-hidden
      border="1px solid #00000030" cursor-pointer
      onClick={() => emit('switch')}
    >
      <div
        flex items-center justify-between
        ml=".575em"
      >
        <div
          translate={props.swichState ? '' : 'x-[-1.75em]'}
          w-8px h-8px rounded-full
          bg="primary-d dark:primary-a" border="1px solid primary-d dark:primary-a"
          transition-transform-300
        />
        <div
          translate={props.swichState ? '' : 'x-[-1.75em]'}
          w="1.65em" h="1.65em" rounded-full
          bg="white dark:#555/70"
          border="1px solid #00000020"
          transition-transform-300
          ml=".53em"
        />
        <div
          translate={props.swichState ? '' : 'x-[-1.75em]'}
          w-8px h-8px rounded-full
          bg="#eee dark:#444/70" border="1px solid #ccc dark:#444/70"
          transition-transform-300 ml=".55em" mt=".05em"
        />
      </div>
    </div>
  )
}

export default Switch
