import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  route("login", "routes/login.tsx"),
  layout("layouts/protected-layout.tsx", [
    index("routes/dashboard.tsx"),
    route("profil", "routes/profil.tsx"),
  ]),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
