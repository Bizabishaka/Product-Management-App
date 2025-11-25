import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

// Pages
import Login from "../pages/Login.vue";
import Products from "../pages/Products.vue";
import ProductView from "../pages/ProductView.vue";
import AddProduct from "../pages/AddProduct.vue";
import Orders from "../pages/Orders.vue";
import Customers from "../pages/Customers.vue";

// Layouts
import SidebarLayout from "../layout/SidebarLayout.vue";
import NavbarLayout from "../layout/NavbarLayout.vue";
import CenterLayout from "../layout/CenterLayout.vue";

const routes = [
  // Public route
  { path: "/login", name: "Login", component: Login },

  // Products page → sidebar layout
  {
    path: "/",
    component: SidebarLayout,
    children: [
      { path: "", redirect: "/products" },
      { path: "products", name: "Products", component: Products },
    ],
  },

  // Pages with top navbar → navbar layout
  {
    path: "/",
    component: NavbarLayout,
    children: [
      { path: "products/:id", name: "ProductView", component: ProductView, props: true },
      { path: "orders", name: "Orders", component: Orders },
      { path: "customers", name: "Customers", component: Customers },
    ],
  },

  // Standalone centered layout (e.g., AddProduct)
  {
    path: "/products/new",
    component: CenterLayout,
    children: [
      { path: "", name: "AddProduct", component: AddProduct },
    ],
  },

  // Fallback route
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Router guard
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
