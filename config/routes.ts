/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/workbench',
    name: 'workbench',
    icon: 'desktop',
    component: './Workbench',
  },
  // 添加资源管理导航及子导航
  {
    path: '/resource',
    name: '资源管理',
    icon: 'database',
    routes: [
      {
        path: '/resource/list',
        name: '资源列表',
        component: './Resource/List',
      },
      {
        name: '资源申请',
        path: '/resource/apply',
        component: './Resource/Apply', // 资源申请页面
        routes: [
          {
            path: '/resource/apply',
            redirect: '/resource/apply/mysql',
          },
          {
            path: '/resource/apply/mysql',
            component: './Resource/Apply/MySQL',
            hideInMenu: true,
            routes: [
              {
                path: '/resource/apply/mysql',
                redirect: '/resource/apply/mysql/user',
              },
              {
                path: '/resource/apply/mysql/user',
                component: './Resource/Apply/MySQL/User',
                hideInMenu: true,
              },
              {
                path: '/resource/apply/mysql/program',
                component: './Resource/Apply/MySQL/Program',
                hideInMenu: true,
              },
              {
                path: '/resource/apply/mysql/newdb',
                component: './Resource/Apply/MySQL/NewDB',
                hideInMenu: true,
              },
            ],
          },
          {
           // name: 'Redis资源',
            path: '/resource/apply/redis',
            component: './Resource/Apply/Redis',
            hideInMenu: true,
          },
          {
            path: '/resource/apply/redis',
            component: './Resource/Apply/Redis',
            hideInMenu: true,
            routes: [
              {
                path: '/resource/apply/redis',
                redirect: '/resource/apply/redis/user',
              },
              {
                path: '/resource/apply/redis/user',
                component: './Resource/Apply/Redis/User',
                hideInMenu: true,
              },
              {
                path: '/resource/apply/redis/program',
                component: './Resource/Apply/Redis/Program',
                hideInMenu: true,
              },
              {
                path: '/resource/apply/redis/newdb',
                component: './Resource/Apply/Redis/NewDB',
                hideInMenu: true,
              },
            ],
          },
          {
           // name: 'Elasticsearch资源',
            path: '/resource/apply/elasticsearch',
            component: './Resource/Apply/Elasticsearch',
            hideInMenu: true,
          },
          {
           // name: '其他资源',
            path: '/resource/apply/other',
            component: './Resource/Apply/Other',
            hideInMenu: true,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    redirect: '/user/login',  // 修改这里，重定向到登录页
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
