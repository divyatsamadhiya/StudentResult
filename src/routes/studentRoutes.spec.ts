import router from "./studentRoutes.js";

test("student routes are registered", () => {
  const routes = router.stack.filter((layer: any) => layer.route);
  const paths = routes.map((layer: any) => layer.route.path);
  expect(paths).toContain("/students/:id/result");
  expect(paths).toContain("/students");
  expect(paths).toContain("/allStudents");
  expect(paths).toContain("/upload");
});
