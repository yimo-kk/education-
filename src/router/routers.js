import Main from '@/components/main'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main, 
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/store',
    name: 'store',
    meta: {
      icon: 'ios-aperture-outline',
      title: '店铺管理'
    },
    component: Main,
    children: [
      {
        path: '/store/info',
        name: 'storeInfo',
        meta: {
          icon: 'md-person',
          title: '店铺信息'
        },
        component: () => import('@/view/single-page/store/store.vue')
      }
    ]
  },
  {
    path: '/course',
    name: 'course',
    meta: {
      icon: 'ios-medical-outline',
      title: '课程管理'
    },
    component: Main,
    children: [
      {
        path: '/course/online/list',
        name: 'onlineCourseList',
        meta: {
          icon: 'ios-list-box-outline',
          title: '线上课程列表'
        },
        component: () => import('@/view/single-page/course/online/list.vue')
      },
      {
        path: '/course/online/detail',
        name: 'onlineCourseDetail',
        meta: {
          title: '线上课程详情',
          notCache: true,
          hideInBread: false,
          hideInMenu: true
        },
        component: () => import('@/view/single-page/course/online/detail.vue')
      },
      {
        path: '/course/online/add',
        name: 'onlineAdd',
        meta: {
          title: '添加线上课程',
          notCache: true,
          hideInBread: false,
          hideInMenu: true
        },
        component: () => import('@/view/single-page/course/online/add.vue')
      },
      {
        path: '/course/online/sub/list',
        name: 'onlineSubCourseList',
        meta: {
          title: '线上子课程列表',
          notCache: true,
          hideInBread: false,
          hideInMenu: true
        },
        component: () => import('@/view/single-page/course/online/sub.vue')
      },
      {
        path: '/course/offline/list',
        name: 'offlineCourseList',
        meta: {
          icon: 'ios-list-box-outline',
          title: '线下课程列表'
        },
        component: () => import('@/view/single-page/course/offline/list.vue')
      },
      {
        path: '/course/offline/detail',
        name: 'offlineCourseDetail',
        meta: {
          title: '线下课程详情',
          notCache: true,
          hideInBread: false,
          hideInMenu: true
        },
        component: () => import('@/view/single-page/course/offline/detail.vue')
      },
      {
        path: '/course/offline/add',
        name: 'offlineAdd',
        meta: {
          title: '添加线下课程',
          notCache: true,
          hideInBread: false,
          hideInMenu: true
        },
        component: () => import('@/view/single-page/course/offline/add.vue')
      },
      {
        path: '/course/offline/sub/list',
        name: 'subOfflineCourse',
        meta: {
          title: '线下子课程列表',
          notCache: true,
          hideInBread: false,
          hideInMenu: true
        },
        component: () => import('@/view/single-page/course/offline/sub.vue')
      }
      // {
      //   path: '/audit/list',
      //   name: 'auditList',
      //   meta: {
      //     icon: 'ios-pricetag-outline',
      //     notCache: true,
      //     title: '课程审核列表'
      //   },
      //   component: () => import('@/view/single-page/course/audit/list')
      // },
      // {
      //   path: '/audit/online',
      //   name: 'auditOnline',
      //   meta: {
      //     icon: 'ios-add-circle-outline',
      //     title: '线上课程审核',
      //     notCache: true,
      //     hideInBread: false,
      //     hideInMenu: true
      //   },
      //   component: () => import('@/view/single-page/course/audit/online')
      // },
      // {
      //   path: '/audit/offline',
      //   name: 'auditOffline',
      //   meta: {
      //     icon: 'ios-add-circle-outline',
      //     title: '线下课程审核',
      //     notCache: true,
      //     hideInBread: false,
      //     hideInMenu: true
      //   },
      //   component: () => import('@/view/single-page/course/audit/offline')
      // },
      // {
      //   path: '/classify/categorg',
      //   name: 'classifyCategorg',
      //   meta: {
      //     icon: 'ios-add-circle-outline',
      //     title: '课程分类',
      //     notCache: true
      //   },
      //   component: () => import('@/view/single-page/course/classify/categorg')
      // }
    ]
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      icon: 'ios-albums-outline',
      title: '订单管理'
    },
    component: Main,
    children: [
      {
        path: '/course/online/list',
        name: 'onlineCourseOrder',
        meta: {
          icon: 'ios-book-outline',
          title: '线上课程订单'
        },
        component: () => import('@/view/single-page/order/online/list.vue')
      },
      {
        path: '/course/online/detail',
        name: 'onlineCourseOrderDetail',
        meta: {
          title: '线上课程订单详情',
          notCache: true,
          hideInBread: false,
          hideInMenu: true
        },
        component: () => import('@/view/single-page/order/online/detail.vue')
      },
      {
        path: '/course/offline/list',
        name: 'offlineCourseOrder',
        meta: {
          icon: 'ios-book-outline',
          title: '线下课程订单'
        },
        component: () => import('@/view/single-page/order/offline/list.vue')
      },
      {
        path: '/course/offline/detail',
        name: 'offlineCourseOrderDetail',
        meta: {
          title: '线下课程订单详情',
          notCache: true,
          hideInBread: false,
          hideInMenu: true
        },
        component: () => import('@/view/single-page/order/offline/detail.vue')
      },
      {
        path: '/course/refund/list',
        name: 'refundList',
        meta: {
          icon: 'ios-book-outline',
          title: '课程退单'
        },
        component: () => import('@/view/single-page/order/refund/list.vue')
      },
      {
        path: '/course/refund/detail',
        name: 'refundDetail',
        meta: {
          title: '课程退单详情',
          notCache: true,
          hideInBread: false,
          hideInMenu: true
        },
        component: () => import('@/view/single-page/order/refund/detail.vue')
      },
      {
        path: '/course/online/comment/list',
        name: 'onlineCommentList',
        meta: {
          icon: 'md-heart-outline',
          title: '线上评价管理'
        },
        component: () => import('@/view/single-page/order/comment/online/list.vue')
      },
      {
        path: '/course/online/comment/detail',
        name: 'onlineCommentDetail',
        meta: {
          title: '线上评价详情',
          notCache: true,
          hideInBread: false,
          hideInMenu: true
        },
        component: () => import('@/view/single-page/order/comment/online/detail.vue')
      },
      {
        path: '/course/offline/comment/list',
        name: 'offlineCommentList',
        meta: {
          icon: 'ios-heart-outline',
          title: '线下评价管理'
        },
        component: () => import('@/view/single-page/order/comment/offline/list.vue')
      },
      {
        path: '/course/offline/comment/detail',
        name: 'offlineCommentDetail',
        meta: {
          title: '线下评价详情',
          notCache: true,
          hideInBread: false,
          hideInMenu: true
        },
        component: () => import('@/view/single-page/order/comment/offline/detail.vue')
      }
    ]
  },
  {
    path: '/coupon',
    name: 'coupon',
    meta: {
      icon: 'ios-pricetags-outline',
      title: '营销活动'
    },
    component: Main,
    children: [
      {
        path: '/group/list',
        name: 'groupList',
        meta: {
          icon: 'ios-add-circle-outline',
          title: '团购列表',
          notCache: true
        },
        component: () => import('@/view/single-page/group/list.vue')
      },
      {
        path: '/group/add',
        name: 'groupAdd',
        meta: {
          icon: 'ios-add-circle-outline',
          title: '添加团购',
          notCache: true,
          hideInBread: false,
          hideInMenu: true
        },
        component: () => import('@/view/single-page/group/add.vue')
      },
      {
        path: '/group/edit',
        name: 'groupEdit',
        meta: {
          icon: 'ios-add-circle-outline',
          title: '编辑团购',
          notCache: true,
          hideInBread: false,
          hideInMenu: true
        },
        component: () => import('@/view/single-page/group/edit.vue')
      },
      {
        path: '/group/detail',
        name: 'groupDetail',
        meta: {
          icon: 'ios-add-circle-outline',
          title: '团购详情',
          notCache: true,
          hideInBread: false,
          hideInMenu: true
        },
        component: () => import('@/view/single-page/group/detail.vue')
      },
      {
        path: '/coupon/list',
        name: 'couponList',
        meta: {
          icon: 'ios-pricetag-outline',
          notCache: true,
          title: '优惠券列表'
        },
        component: () => import('@/view/single-page/coupon/list.vue')
      },
      {
        path: '/coupon/add',
        name: 'couponAdd',
        meta: {
          icon: 'ios-add-circle-outline',
          title: '添加优惠券',
          notCache: true,
          hideInBread: false,
          hideInMenu: true
        },
        component: () => import('@/view/single-page/coupon/add.vue')
      }
    ]
  },
  {
    path: '/financial',
    name: 'financial',
    meta: {
      icon: 'ios-flower',
      title: '财务管理'
    },
    component: Main,
    children: [
      {
        path: '/financial/withdrawal',
        name: 'withdrawalList',
        meta: {
          icon: 'ios-recording-outline',
          title: '提现记录'
        },
        component: () => import('@/view/single-page/financial/withdrawal/list.vue')
      },
      {
        path: '/financial/account-check',
        name: 'accountCheck',
        meta: {
          icon: 'md-done-all',
          title: '商家对账'
        },
        component: () => import('@/view/single-page/financial/account-check/list.vue')
      }
    ]
  },
  {
    path: '/statistics',
    name: 'statistics',
    meta: {
      icon: 'ios-pie-outline',
      title: '数据统计管理'
    },
    component: Main,
    children: [
      {
        path: '/statistics/index',
        name: 'statistics',
        meta: {
          icon: 'ios-pie-outline',
          title: '数据统计'
        },
        component: () => import('@/view/single-page/statistics')
      },
      {
        path: '/statistics/orderStatistics',
        name: 'orderStatistics',
        meta: {
          icon: 'ios-podium-outline',
          title: '订单数据总揽'
        },
        component: () => import('@/view/single-page/statistics/orderStatistics')
      },
      {
        path: '/statistics/onlineCourse',
        name: 'onlineCourse',
        meta: {
          icon: 'ios-podium-outline',
          title: '线上课程数据总览'
        },
        component: () => import('@/view/single-page/statistics/onlineCourse')
      },
      {
        path: '/statistics/offlineCourse',
        name: 'offlineCourse',
        meta: {
          icon: 'ios-podium-outline',
          title: '线下课程数据总览'
        },
        component: () => import('@/view/single-page/statistics/offlineCourse')
      }
    ]
  },
  // {
  //   path: '/message',
  //   name: 'message',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: 'message_page',
  //       name: 'message_page',
  //       meta: {
  //         icon: 'md-notifications',
  //         title: '消息中心'
  //       },
  //       component: () => import('@/view/single-page/message/index.vue')
  //     }
  //   ]
  // },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
