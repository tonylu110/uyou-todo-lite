import { renderSlot, useSlots } from 'vue'
import List from '../List'

const SettingList: SetupFC = () => {
  defineSlots<{
    default: () => any
  }>()

  const slots = useSlots()

  return () => (
    <List>
      {renderSlot(slots, 'default')}
    </List>
  )
}

export default SettingList
