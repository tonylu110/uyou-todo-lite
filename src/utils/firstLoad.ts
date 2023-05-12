import { useI18n } from "vue-i18n";
import LocalStorage from "./localStorage";

const firstLoad = () => {
  const { t } = useI18n()

  const firstToDo = {
    data: [
      {
        text: t('firstList[0]'),
        id: new Date().getTime(),
        ok: false
      },
      {
        text: t('firstList[1]'),
        id: new Date().getTime() + 1,
        ok: false
      },
      {
        text: t('firstList[2]'),
        id: new Date().getTime() + 3,
        ok: false
      },
      {
        text: t('firstList[3]'),
        id: new Date().getTime() + 4,
        ok: false
      }
    ]
  }
  if (localStorage.getItem('ToDo') === null) {
    LocalStorage('set', firstToDo)
  }
}

export default firstLoad;