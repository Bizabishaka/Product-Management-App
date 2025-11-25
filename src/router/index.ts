import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";


import Login from "../pages/Login.vue";
import Products from "../pages/Products.vue";
import ProductView from "../pages/ProductView.vue";
import AddProduct from "../pages/AddProduct.vue";
import Orders from "../pages/Orders.vue";
import Customers from "../pages/Customers.vue";


import SidebarLayout from "../layout/SidebarLayout.vue";
import NavbarLayout from "../layout/NavbarLayout.vue";
import CenterLayout from "../layout/CenterLayout.vue";

const routes = [
  
  { path: "/login", name: "Login", component: Login },

  
  {
    path: "/",
    component: SidebarLayout,
    children: [
      { path: "", redirect: "/products" },
      { path: "products", name: "Products", component: Products },
    ],
  },

  
  {
    path: "/",
    component: NavbarLayout,
    children: [
      { path: "products/:id", name: "ProductView", component: ProductView, props: true },
      { path: "orders", name: "Orders", component: Orders },
      { path: "customers", name: "Customers", component: Customers },
    ],
  },

  
  {
    path: "/products/new",
    component: CenterLayout,
    children: [
      { path: "", name: "AddProduct", component: AddProduct },
    ],
  },

  
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();
  auth.loadFromStorage();

  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !auth.isAuthenticated) {
    return next("/login");
  }

  if (to.path === "/login" && auth.isAuthenticated) {
    return next("/products");
  }

  next();
});

export default router;
