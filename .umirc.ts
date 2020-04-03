import { defineConfig } from 'umi';

export default defineConfig({
  locale: { antd: true },
  routes: [
    { exact: true, path: '/', component: '@/pages/logins' },
    { exact: true, path: '/products', component: '@/pages/products' },
    // { exact: true, path: '/dbMessages', component: '@/pages/dbMessages' },
    {
      exact: true,
      component: '@/components/layout/Main',
      routes: [
        { exact: true, path: '/dbMessages', component: '@/pages/dbMessages' },
      ]
    },
  ],
});
