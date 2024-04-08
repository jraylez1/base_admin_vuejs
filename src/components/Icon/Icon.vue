<template>
  <FontAwesomeIcon :icon="icon" :class="className" />
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCaretDown,
  faChartPie,
  faPlus,
  faEnvelope,
  faHouse,
  faInbox,
  faLock,
  faMoon,
  faPenToSquare,
  faRightFromBracket,
  faSitemap,
  faSliders,
  faSun,
  faTrash,
  faUser,
  faUserTie
} from '@fortawesome/free-solid-svg-icons'

const iconList = {
  admin: faUserTie,
  email: faEnvelope,
  lock: faLock,
  sun: faSun,
  moon: faMoon,
  sliders: faSliders,
  role: faSitemap,
  user: faUser,
  dashboard: faChartPie,
  box: faInbox,
  arrowDown: faCaretDown,
  logout: faRightFromBracket,
  home: faHouse,
  circlePlus: faPlus,
  trash: faTrash,
  update: faPenToSquare
}

const props = defineProps({
  name: String,
  className: {
    type: String,
    default: ''
  }
})

const icon = iconList[props.name] || null
</script>

<style lang="scss" scoped></style>
