<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineOptions } from 'vue'
import { login as apiLogin } from '@/api/user.js'

// 声明组件名
defineOptions({ name: 'Login' })

// 路由跳转方法
const router = useRouter()
function goToDashboard()      { router.push({ name: 'Dashboard' }) }
function goToRegister()     { router.push({ name: 'Register' }) }
function goToForgotPassword()     { router.push({ name: 'ForgotPassword' }) }

// 当前选中的角色
const selectedRole = ref('RESEARCHER')

// 登录表单字段
const username = ref('')
const password = ref('')
const errorMsg = ref('')

// 切换 Tab
function handleRoleChange(role) {
  selectedRole.value = role
}

// 登录方法
async function handleLogin() {
  // 检查用户名和密码是否为空
  if (!username.value || !password.value) {
    alert('用户名和密码不能为空');
    return;
  }

  // 调用user.js中的login方法
  const result = await apiLogin(username.value, password.value)

  if (result.success) {
    // 登录成功，存储 token 和用户信息
    localStorage.setItem('token', result.token)
    localStorage.setItem('userRole', result.user.role)

    // 跳转到仪表盘
    goToDashboard();
  } else {
    alert(result.message || '登录失败');
  }
}


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
})

</script>


<template>
    <!-- ===============================================--><!--    Main Content--><!-- ===============================================-->
    <main class="main" id="top">
      <div class="container-fluid">
        <div class="row min-vh-100 flex-center g-0">
          <div class="col-lg-8 col-xxl-5 py-3 position-relative"><img class="bg-auth-circle-shape" src="../../assets/img/icons/spot-illustrations/bg-shape.png" alt="" width="250"><img class="bg-auth-circle-shape-2" src="../../assets/img/icons/spot-illustrations/shape-1.png" alt="" width="150">
            <div class="card overflow-hidden z-1">
              <div class="card-body p-0">
                <div class="row g-0 h-100">
                  <div class="col-md-5 text-center bg-card-gradient">
                    <div class="position-relative p-4 pt-md-5 pb-md-7" data-bs-theme="light">
                      <div class="bg-holder bg-auth-card-shape" style="background-image:url(https://prium.github.io/falcon/v3.24.0/assets/img/icons/spot-illustrations/half-circle.png);"></div><!--/.bg-holder-->
                      <div class="z-1 position-relative"><a class="link-light mb-4 font-sans-serif fs-5 d-inline-block fw-bolder" href="../../../index.html">健康大数据研究中心</a>
                        <p class="opacity-75 text-white">欢迎来到健康大数据研究中心</p>
                      </div>
                    </div>
                    <div class="mt-3 mb-4 mt-md-4 mb-md-5" data-bs-theme="light">
                      <p class="text-white">还没有账号？<br><a class="text-decoration-underline link-light" @click="goToRegister" href="">开始吧！</a></p>
                      <p class="mb-0 mt-4 mt-md-5 fs-10 fw-semi-bold text-white opacity-75">阅读我们的<a class="text-decoration-underline text-white" href="#!">使用条款</a>和<a class="text-decoration-underline text-white" href="#!">条件</a></p>
                    </div>
                  </div>
                  <div class="col-md-7 d-flex flex-center">
                    <div class="p-4 p-md-5 flex-grow-1">
                      <form @submit.prevent="handleLogin">
                        <div class="row flex-between-center">
                            <div class="col-auto">
                                <h3>登录</h3>
                            </div>
                            <div>
                              <div class="">
                                  <div class="card-body bg-body-tertiary">
                                  <div class="tab-content">
                                    <div 
                                      class="tab-pane preview-tab-pane active"
                                      role="tabpanel"
                                      aria-labelledby="tab-dom-263af82c-6d94-42c0-8081-a68cd71368d4"
                                      id="dom-263af82c-6d94-42c0-8081-a68cd71368d4"
                                    >
                                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                                          <li class="nav-item">
                                            <a
                                              class="nav-link"
                                              :class="{ active: selectedRole === 'RESEARCHER' }"
                                              @click="handleRoleChange('RESEARCHER')"
                                              id="home-tab"
                                              data-bs-toggle="tab"
                                              href="#tab-home"
                                              role="tab"
                                              aria-controls="tab-home"
                                              aria-selected="true"
                                            >研究员</a>
                                          </li>
                                          <li class="nav-item">
                                            <a
                                              class="nav-link"
                                              :class="{ active: selectedRole === 'REVIEWER' }"
                                              @click="handleRoleChange('REVIEWER')"
                                              id="profile-tab"
                                              data-bs-toggle="tab"
                                              href="#tab-profile"
                                              role="tab"
                                              aria-controls="tab-profile"
                                              aria-selected="false"
                                            >审核员</a>
                                          </li>
                                          <li class="nav-item">
                                            <a
                                              class="nav-link"
                                              :class="{ active: selectedRole === 'ADMIN' }"
                                              @click="handleRoleChange('ADMIN')"
                                              id="contact-tab"
                                              data-bs-toggle="tab"
                                              href="#tab-contact"
                                              role="tab"
                                              aria-controls="tab-contact"
                                              aria-selected="false"
                                            >管理员</a>
                                          </li>
                                        </ul>
                                      <div class="tab-content border-top-0 p-3" id="myTabContent">
                                        <!-- 研究员 Pane -->
                                        <div
                                          class="tab-pane fade show active"
                                          id="tab-home"
                                          role="tabpanel"
                                          aria-labelledby="home-tab"
                                        >
                                          <div class="mb-3">
                                            <label
                                              class="form-label"
                                              :for="`card-username-${selectedRole}`"
                                            >Username</label>
                                            <input
                                              class="form-control"
                                              v-model="username"
                                              :id="`card-username-${selectedRole}`"
                                              type="text"
                                            />
                                          </div>
                                          <div class="mb-3">
                                            <div class="d-flex justify-content-between">
                                              <label
                                                class="form-label"
                                                :for="`card-password-${selectedRole}`"
                                              >Password</label>
                                            </div>
                                            <input
                                              class="form-control"
                                              v-model="password"
                                              :id="`card-password-${selectedRole}`"
                                              type="password"
                                            />
                                          </div>
                                        </div>
                                        <!-- 审核员 Pane -->
                                        <div
                                          class="tab-pane fade"
                                          id="tab-profile"
                                          role="tabpanel"
                                          aria-labelledby="profile-tab"
                                        >
                                          <div class="mb-3">
                                            <label
                                              class="form-label"
                                              :for="`card-username-${selectedRole}`"
                                            >Username</label>
                                            <input
                                              class="form-control"
                                              v-model="username"
                                              :id="`card-username-${selectedRole}`"
                                              type="text"
                                            />
                                          </div>
                                          <div class="mb-3">
                                            <div class="d-flex justify-content-between">
                                              <label
                                                class="form-label"
                                                :for="`card-password-${selectedRole}`"
                                              >Password</label>
                                            </div>
                                            <input
                                              class="form-control"
                                              v-model="password"
                                              :id="`card-password-${selectedRole}`"
                                              type="password"
                                            />
                                          </div>
                                        </div>
                                        <!-- 管理员 Pane -->
                                        <div
                                          class="tab-pane fade"
                                          id="tab-contact"
                                          role="tabpanel"
                                          aria-labelledby="contact-tab"
                                        >
                                          <div class="mb-3">
                                            <label
                                              class="form-label"
                                              :for="`card-username-${selectedRole}`"
                                            >Username</label>
                                            <input
                                              class="form-control"
                                              v-model="username"
                                              :id="`card-username-${selectedRole}`"
                                              type="text"
                                            />
                                          </div>
                                          <div class="mb-3">
                                            <div class="d-flex justify-content-between">
                                              <label
                                                class="form-label"
                                                :for="`card-password-${selectedRole}`"
                                              >Password</label>
                                            </div>
                                            <input
                                              class="form-control"
                                              v-model="password"
                                              :id="`card-password-${selectedRole}`"
                                              type="password"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      </div>
                                  </div>
                                  </div>
                              </div>
                            </div> 
                      </div>
                              <div class="row flex-between-center">
                                <div class="col-auto">
                                  <div class="form-check mb-0">
                                      <input class="form-check-input" type="checkbox" id="card-checkbox" checked="checked" />
                                      <label class="form-check-label mb-0" for="card-checkbox">Remember me</label>
                                  </div>
                                </div>
                                <div class="col-auto"><a class="fs-10" @click="goToForgotPassword" href="">忘记密码?</a></div>
                              </div>
                        <div class="mb-3"><button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">登录</button></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- ===============================================--><!--    End of Main Content--><!-- ===============================================-->

    <!--右边侧边栏-->
    <div class="offcanvas offcanvas-end settings-panel border-0" id="settings-offcanvas" tabindex="-1" aria-labelledby="settings-offcanvas">
      <div class="offcanvas-header settings-panel-header justify-content-between bg-shape">
        <div class="z-1 py-1">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h5 class="text-white mb-0 me-2"><span class="fas fa-palette me-2 fs-9"></span>设置</h5><button class="btn btn-primary btn-sm rounded-pill mt-0 mb-0" data-theme-control="reset" style="font-size:12px"> <span class="fas fa-redo-alt me-1" data-fa-transform="shrink-3"></span>Reset</button>
          </div>
          <p class="mb-0 fs-10 text-white opacity-75">设置你喜欢的风格！</p>
        </div>
        <div class="z-1" data-bs-theme="dark">
          <button class="btn-close z-1 mt-0" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
      </div>
      <div class="offcanvas-body scrollbar-overlay px-x1 h-100" id="themeController">
        <h5 class="fs-9">颜色主题</h5>
        <p class="fs-10">请挑选你最喜欢的主题</p>
        <div class="btn-group d-block w-100 btn-group-navbar-style">
          <div class="row gx-2">
            <div class="col-4"><input class="btn-check" id="themeSwitcherLight" name="theme-color" type="radio" value="light" data-theme-control="theme" /><label class="btn d-inline-block btn-navbar-style fs-10" for="themeSwitcherLight"> <span class="hover-overlay mb-2 rounded d-block"><img class="img-fluid img-prototype mb-0" src="../../assets/img/generic/falcon-mode-auto.jpg" alt=""/></span><span class="label-text">Light</span></label></div>
            <div class="col-4"><input class="btn-check" id="themeSwitcherDark" name="theme-color" type="radio" value="dark" data-theme-control="theme" /><label class="btn d-inline-block btn-navbar-style fs-10" for="themeSwitcherDark"> <span class="hover-overlay mb-2 rounded d-block"><img class="img-fluid img-prototype mb-0" src="../../assets/img/generic/falcon-mode-dark.jpg" alt=""/></span><span class="label-text"> Dark</span></label></div>
            <div class="col-4"><input class="btn-check" id="themeSwitcherAuto" name="theme-color" type="radio" value="auto" data-theme-control="theme" /><label class="btn d-inline-block btn-navbar-style fs-10" for="themeSwitcherAuto"> <span class="hover-overlay mb-2 rounded d-block"><img class="img-fluid img-prototype mb-0" src="../../assets/img/generic/falcon-mode-default.jpg" alt=""/></span><span class="label-text"> Auto</span></label></div>
          </div>
        </div>
        <hr />
        <h5 class="fs-9 d-flex align-items-center">侧边栏风格</h5>
        <p class="fs-10 mb-0">请挑选你最喜欢的侧边栏风格</p>
        <div class="btn-group d-block w-100 btn-group-navbar-style">
          <div class="row gx-2">
            <div class="col-6"><input class="btn-check" id="navbar-style-transparent" type="radio" name="navbarStyle" value="transparent" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-transparent"> <img class="img-fluid img-prototype" src="../../assets/img/generic/default.png" alt="" /><span class="label-text"> Transparent</span></label></div>
            <div class="col-6"><input class="btn-check" id="navbar-style-inverted" type="radio" name="navbarStyle" value="inverted" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-inverted"> <img class="img-fluid img-prototype" src="../../assets/img/generic/inverted.png" alt="" /><span class="label-text"> Inverted</span></label></div>
            <div class="col-6"><input class="btn-check" id="navbar-style-card" type="radio" name="navbarStyle" value="card" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-card"> <img class="img-fluid img-prototype" src="../../assets/img/generic/card.png" alt="" /><span class="label-text"> Card</span></label></div>
            <div class="col-6"><input class="btn-check" id="navbar-style-vibrant" type="radio" name="navbarStyle" value="vibrant" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-vibrant"> <img class="img-fluid img-prototype" src="../../assets/img/generic/vibrant.png" alt="" /><span class="label-text"> Vibrant</span></label></div>
          </div>
        </div>
      </div>
    </div>
    <a class="card setting-toggle" href="#settings-offcanvas" data-bs-toggle="offcanvas">
      <div class="card-body d-flex align-items-center py-md-2 px-2 py-1">
        <div class="bg-primary-subtle position-relative rounded-start" style="height:34px;width:28px">
          <div class="settings-popover"><span class="ripple"><span class="fa-spin position-absolute all-0 d-flex flex-center"><span class="icon-spin position-absolute all-0 d-flex flex-center"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.7369 12.3941L19.1989 12.1065C18.4459 11.7041 18.0843 10.8487 18.0843 9.99495C18.0843 9.14118 18.4459 8.28582 19.1989 7.88336L19.7369 7.59581C19.9474 7.47484 20.0316 7.23291 19.9474 7.03131C19.4842 5.57973 18.6843 4.28943 17.6738 3.20075C17.5053 3.03946 17.2527 2.99914 17.0422 3.12011L16.393 3.46714C15.6883 3.84379 14.8377 3.74529 14.1476 3.3427C14.0988 3.31422 14.0496 3.28621 14.0002 3.25868C13.2568 2.84453 12.7055 2.10629 12.7055 1.25525V0.70081C12.7055 0.499202 12.5371 0.297594 12.2845 0.257272C10.7266 -0.105622 9.16879 -0.0653007 7.69516 0.257272C7.44254 0.297594 7.31623 0.499202 7.31623 0.70081V1.23474C7.31623 2.09575 6.74999 2.8362 5.99824 3.25599C5.95774 3.27861 5.91747 3.30159 5.87744 3.32493C5.15643 3.74527 4.26453 3.85902 3.53534 3.45302L2.93743 3.12011C2.72691 2.99914 2.47429 3.03946 2.30587 3.20075C1.29538 4.28943 0.495411 5.57973 0.0322686 7.03131C-0.051939 7.23291 0.0322686 7.47484 0.242788 7.59581L0.784376 7.8853C1.54166 8.29007 1.92694 9.13627 1.92694 9.99495C1.92694 10.8536 1.54166 11.6998 0.784375 12.1046L0.242788 12.3941C0.0322686 12.515 -0.051939 12.757 0.0322686 12.9586C0.495411 14.4102 1.29538 15.7005 2.30587 16.7891C2.47429 16.9504 2.72691 16.9907 2.93743 16.8698L3.58669 16.5227C4.29133 16.1461 5.14131 16.2457 5.8331 16.6455C5.88713 16.6767 5.94159 16.7074 5.99648 16.7375C6.75162 17.1511 7.31623 17.8941 7.31623 18.7552V19.2891C7.31623 19.4425 7.41373 19.5959 7.55309 19.696C7.64066 19.7589 7.74815 19.7843 7.85406 19.8046C9.35884 20.0925 10.8609 20.0456 12.2845 19.7729C12.5371 19.6923 12.7055 19.4907 12.7055 19.2891V18.7346C12.7055 17.8836 13.2568 17.1454 14.0002 16.7312C14.0496 16.7037 14.0988 16.6757 14.1476 16.6472C14.8377 16.2446 15.6883 16.1461 16.393 16.5227L17.0422 16.8698C17.2527 16.9907 17.5053 16.9504 17.6738 16.7891C18.7264 15.7005 19.4842 14.4102 19.9895 12.9586C20.0316 12.757 19.9474 12.515 19.7369 12.3941ZM10.0109 13.2005C8.1162 13.2005 6.64257 11.7893 6.64257 9.97478C6.64257 8.20063 8.1162 6.74905 10.0109 6.74905C11.8634 6.74905 13.3792 8.20063 13.3792 9.97478C13.3792 11.7893 11.8634 13.2005 10.0109 13.2005Z" fill="#2A7BE4"></path></svg></span></span></span></div>
        </div><small class="text-uppercase text-primary fw-bold bg-primary-subtle py-2 pe-2 ps-1 rounded-end">customize</small>
      </div>
    </a>
</template>

<style>
</style>