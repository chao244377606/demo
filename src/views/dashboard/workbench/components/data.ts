interface GroupItem {
  title: string;
  icon: string;
  color: string;
  desc: string;
  date: string;
  group: string;
}

interface NavItem {
  title: string;
  icon: string;
  color: string;
}

interface DynamicInfoItem {
  avatar: string;
  name: string;
  date: string;
  desc: string;
}

export const navItems: NavItem[] = [
  {
    title: '首页',
    icon: 'ion:home-outline',
    color: '#1fdaca',
  },
  {
    title: '仪表盘',
    icon: 'ion:grid-outline',
    color: '#bf0c2c',
  },
  {
    title: '组件',
    icon: 'ion:layers-outline',
    color: '#e18525',
  },
  {
    title: '系统管理',
    icon: 'ion:settings-outline',
    color: '#3fb27f',
  },
  {
    title: '权限管理',
    icon: 'ion:key-outline',
    color: '#4daf1bc9',
  },
  {
    title: '图表',
    icon: 'ion:bar-chart-outline',
    color: '#00d8ff',
  },
];

export const dynamicInfoItems: DynamicInfoItem[] = [
  {
    avatar: 'dynamic-avatar-1|svg',
    name: '威廉',
    date: '刚刚',
    desc: `<a href="https://bladex.vip/#/market/lemon" style="color: blue">Lemon Admin</a>是基于<a href="https://vvbin.cn/doc-next/" style="color: blue">Vben</a>为<a href="https://bladex.vip/#/" style="color: blue">BladeX</a>定制开发的管理后台前端框架`,
  },
  {
    avatar: 'dynamic-avatar-4|svg',
    name: 'Vben',
    date: '2天前',
    desc: `项目会持续维护对接BladeX后续版本更新，定期同步Vben主版本保持更新`,
  },
  {
    avatar: 'dynamic-avatar-5|svg',
    name: '皮特',
    date: '3天前',
    desc: `提供基础前端代码生成器、相应文档，交流群，方便快速开发`,
  },
  {
    avatar: 'dynamic-avatar-6|svg',
    name: '杰克',
    date: '1周前',
    desc: `售价:<a style="color: blue">￥699</a> 项目地址:<a href="https://bladex.vip/#/market/lemon" style="color: blue">Lemon Admin 购买</a> `,
  },
  {
    avatar: 'dynamic-avatar-3|svg',
    name: '克里斯',
    date: '1天前',
    desc: `技术栈包括不限于： Vue3.0、Vite、 Ant-Design-Vue、TypeScript `,
  },
  {
    avatar: 'dynamic-avatar-2|svg',
    name: '艾文',
    date: '1个小时前',
    desc: `框架本身提供二次封装组件、utils、hooks、动态菜单、权限校验、按钮级别权限控制等功能`,
  },
];

export const groupItems: GroupItem[] = [
  {
    title: 'Github',
    icon: 'carbon:logo-github',
    color: '',
    desc: '不要等待机会，而要创造机会。',
    group: '开源组',
    date: '2021-04-01',
  },
  {
    title: 'Vue',
    icon: 'ion:logo-vue',
    color: '#3fb27f',
    desc: '现在的你决定将来的你。',
    group: '算法组',
    date: '2021-04-01',
  },
  {
    title: 'Html5',
    icon: 'ion:logo-html5',
    color: '#e18525',
    desc: '没有什么才能比努力更重要。',
    group: '上班摸鱼',
    date: '2021-04-01',
  },
  {
    title: 'Angular',
    icon: 'ion:logo-angular',
    color: '#bf0c2c',
    desc: '热情和欲望可以突破一切难关。',
    group: 'UI',
    date: '2021-04-01',
  },
  {
    title: 'React',
    icon: 'bx:bxl-react',
    color: '#00d8ff',
    desc: '健康的身体是实目标的基石。',
    group: '技术牛',
    date: '2021-04-01',
  },
  {
    title: 'Js',
    icon: 'ion:logo-javascript',
    color: '#4daf1bc9',
    desc: '路是走出来的，而不是空想出来的。',
    group: '架构组',
    date: '2021-04-01',
  },
];
