<script>
export default {
  name: 'Diary',
  data() {
    return {
      // 把导入的变量都放到 data 里，模板才能访问
      profile1,
      profile2,
      profile3,
      profile4,
      profile5
    }
  },
  methods: {
    goToLogout() {
    this.$router.push({ name: 'Logout' })  // 跳转到 Logout 页
    }
  },
  mounted() {
    // 1. RTL 模式
    const isRTL = JSON.parse(localStorage.getItem('isRTL'));
    if (isRTL) {
      const linkDefault = document.getElementById('style-default');
      const userLinkDefault = document.getElementById('user-style-default');
      if (linkDefault) linkDefault.disabled = true;
      if (userLinkDefault) userLinkDefault.disabled = true;
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      const linkRTL = document.getElementById('style-rtl');
      const userLinkRTL = document.getElementById('user-style-rtl');
      if (linkRTL) linkRTL.disabled = true;
      if (userLinkRTL) userLinkRTL.disabled = true;
    }

    // 2. Fluid 布局
    const isFluid = JSON.parse(localStorage.getItem('isFluid'));
    if (isFluid) {
      const container = document.querySelector('[data-layout]');
      if (container) {
        container.classList.remove('container');
        container.classList.add('container-fluid');
      }
    }

    // 3. Navbar 风格
    const navbarStyle = localStorage.getItem('navbarStyle');
    if (navbarStyle && navbarStyle !== 'transparent') {
      const navVert = document.querySelector('.navbar-vertical');
      if (navVert) navVert.classList.add(`navbar-${navbarStyle}`);
    }

    // 4. Navbar 位置
    const navbarPosition = localStorage.getItem('navbarPosition') || '';
    const navVertical    = document.querySelector('.navbar-vertical');
    const navTopVertical = document.querySelector('.content .navbar-top');
    // 注意下面这一行，fix 缺少的 ‘]’
    const navTop         = document.querySelector('[data-layout] .navbar-top:not([data-double-top-nav])');
    const navDoubleTop   = document.querySelector('[data-double-top-nav]');
    const navTopCombo    = document.querySelector('.content [data-navbar-top="combo"]');

    // 如果选了 double-top，就给 html 加 class
    if (navbarPosition === 'double-top') {
      document.documentElement.classList.add('double-top-nav-layout');
    }

    // 工具函数：安全移除节点、恢复显示
    const safeRemove = el => { if (el) el.remove(); };
    const safeShow   = el => { if (el) el.removeAttribute('style'); };

    if (navbarPosition === 'top') {
      safeShow(navTop);
      safeRemove(navTopVertical);
      safeRemove(navVertical);
      safeRemove(navTopCombo);
      safeRemove(navDoubleTop);
    }
    else if (navbarPosition === 'combo') {
      safeShow(navVertical);
      safeShow(navTopCombo);
      safeRemove(navTop);
      safeRemove(navTopVertical);
      safeRemove(navDoubleTop);
    }
    else if (navbarPosition === 'double-top') {
      safeShow(navDoubleTop);
      safeRemove(navTop);
      safeRemove(navTopVertical);
      safeRemove(navVertical);
      safeRemove(navTopCombo);
    }
    else {
      // 默认 vertical
      safeShow(navVertical);
      safeShow(navTopVertical);
      safeRemove(navTop);
      safeRemove(navDoubleTop);
      safeRemove(navTopCombo);
    }
  }
}
</script>
<temple>

</temple>
<style>

</style>