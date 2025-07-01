<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineOptions } from 'vue'

// —— 1. 用 new URL 强制生成静态资源链接 —— 
const logo     = new URL('../../assets/img/logo.png', import.meta.url).href
const profile1 = new URL('../../assets/img/profile/1.jpg', import.meta.url).href
const profile2 = new URL('../../assets/img/profile/2.jpg', import.meta.url).href
const profile3 = new URL('../../assets/img/profile/3.jpg', import.meta.url).href
const profile4 = new URL('../../assets/img/profile/4.jpg', import.meta.url).href
const profile5 = new URL('../../assets/img/profile/5.jpg', import.meta.url).href

// 声明组件名
defineOptions({ name: 'UserDefined' })

// 路由跳转方法
const router = useRouter()
function goToDashboard()      { router.push({ name: 'Dashboard' }) }
function goToLogout()         { router.push({ name: 'Logout' }) }
function goToCalendar()       { router.push({ name: 'Calendar' }) }
function goToCreateAnEvent()  { router.push({ name: 'CreateAnEvent' }) }
function goToEventDetail()    { router.push({ name: 'EventDetail' }) }
function goToEventList()      { router.push({ name: 'EventList' }) }
function goToLogs()           { router.push({ name: 'Logs' }) }
function goToMonitor()        { router.push({ name: 'Monitor' }) }
function goToChat()           { router.push({ name: 'Chat' }) }
function goToUserReview()     { router.push({ name: 'UserReview' }) }
function goToOperationReview()     { router.push({ name: 'OperationReview' }) }
function goToDescriptiveStatistics()     { router.push({ name: 'DescriptiveStatistics' }) }
function goToComparativeAnalysis()     { router.push({ name: 'ComparativeAnalysis' }) }
function goToCorrelationAnalysis()     { router.push({ name: 'CorrelationAnalysis' }) }
function goToTrendAnalysis()     { router.push({ name: 'TrendAnalysis' }) }
function goToUserDefined()     { router.push({ name: 'UserDefined' }) }




onMounted(() => {
  // 1. RTL
  const isRTL = JSON.parse(localStorage.getItem('isRTL'))
  if (isRTL) {
    const linkDefault   = document.getElementById('style-default')
    const userLinkDefault = document.getElementById('user-style-default')
    if (linkDefault)   linkDefault.disabled = true
    if (userLinkDefault) userLinkDefault.disabled = true
    document.documentElement.setAttribute('dir', 'rtl')
  } else {
    const linkRTL       = document.getElementById('style-rtl')
    const userLinkRTL   = document.getElementById('user-style-rtl')
    if (linkRTL)       linkRTL.disabled = true
    if (userLinkRTL)   userLinkRTL.disabled = true
  }

  // 2. Fluid 布局
  const isFluid = JSON.parse(localStorage.getItem('isFluid'))
  if (isFluid) {
    const container = document.querySelector('[data-layout]')
    if (container) {
      container.classList.remove('container')
      container.classList.add('container-fluid')
    }
  }

  // 3. Navbar 风格
  const navbarStyle = localStorage.getItem('navbarStyle')
  if (navbarStyle && navbarStyle !== 'transparent') {
    const navVert = document.querySelector('.navbar-vertical')
    if (navVert) navVert.classList.add(`navbar-${navbarStyle}`)
  }

  // 4. Navbar 位置
  const navbarPosition = localStorage.getItem('navbarPosition') || ''
  const navVertical    = document.querySelector('.navbar-vertical')
  const navTopVertical = document.querySelector('.content .navbar-top')
  const navTop         = document.querySelector('[data-layout] .navbar-top:not([data-double-top-nav])')
  const navDoubleTop   = document.querySelector('[data-double-top-nav]')
  const navTopCombo    = document.querySelector('.content [data-navbar-top="combo"]')

  if (navbarPosition === 'double-top') {
    document.documentElement.classList.add('double-top-nav-layout')
  }

  const safeRemove = el => el && el.remove()
  const safeShow   = el => el && el.removeAttribute('style')

  if (navbarPosition === 'top') {
    safeShow(navTop)
    safeRemove(navTopVertical)
    safeRemove(navVertical)
    safeRemove(navTopCombo)
    safeRemove(navDoubleTop)
  } else if (navbarPosition === 'combo') {
    safeShow(navVertical)
    safeShow(navTopCombo)
    safeRemove(navTop)
    safeRemove(navTopVertical)
    safeRemove(navDoubleTop)
  } else if (navbarPosition === 'double-top') {
    safeShow(navDoubleTop)
    safeRemove(navTop)
    safeRemove(navTopVertical)
    safeRemove(navVertical)
    safeRemove(navTopCombo)
  } else {
    // 默认 vertical
    safeShow(navVertical)
    safeShow(navTopVertical)
    safeRemove(navTop)
    safeRemove(navDoubleTop)
    safeRemove(navTopCombo)
  }
})
</script>
<template>

</template>
<style>

</style>