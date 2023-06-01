import { createRouter, createWebHistory } from 'vue-router';
import StartingPoint from '../views/StartingPoint.vue';
import SelfAssesment from '../views/SelfAssesment.vue';
import AboutView from '../views/AboutView.vue';
import AllIndicators from '@/views/AllIndicators.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      
      component: StartingPoint
    },
    {
      path: '/session',
      name: 'newSession',
      props: true,
/*       <SelfAssesment :loadSessionId="loadId" :loadLocalSession="localSession" :sessionStart="sessionInput" :backend="backend" :header="header" :mode="sessionMode"/>
 */      component: SelfAssesment
    },
    {
      path: '/session/:id',
      name: 'session',
      props: true,

      component: SelfAssesment
    },
    {
      path: '/about',
      name: 'about',

      component: AboutView
    },
    {
      path: '/indicators',
      name: 'indicators',

      component: AllIndicators
    },

  ]
})

export default router
