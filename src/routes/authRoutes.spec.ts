import router from "./authRoutes.js";

test("auth routes are registered", () => {
  const routes = router.stack.filter((layer: any) => layer.route);
  const paths = routes.map((layer: any) => layer.route.path);
  expect(paths).toContain("/admin/login");
  expect(paths).toContain("/admin/register");
  expect(paths).toContain("/student/login");
});
