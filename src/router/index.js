import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SurveyView from "../views/SurveyView.vue";
import ChatGptView from "../views/ChatGptView.vue";
import NetworkView from "../views/NetworkView.vue";
import NewsView from "../views/NewsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  // {
  //   path: "/:propValue",
  //   name: "DynamicNetwork",
  //   component: HomeView,
  // },
  {
    path: "/network",
    name: "network",
    component: NetworkView,
  },
  {
    path: "/survey",
    name: "survey",
    component: SurveyView,
  },
  {
    path: "/chatgpt",
    name: "chatgpt",
    component: ChatGptView,
  },
  {
    path: "/nyheder",
    name: "nyheder",
    component: NewsView,
  },
  {
    path: "/liveblog",
    name: "liveblog",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LiveBlogView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
