import { searchForWorkspaceRoot } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";

// https://vitejs.dev/config/
const getViteConfigDev = (port) => ({
  root: "src",
  server: {
    middlewareMode: true,
    port,
    hmr: {
      host: "localhost",
    },
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
  optimizeDeps: {},
  build: {
    commonjsOptions: {
      include: /node_modules/,
    },
  },
  plugins: [
    svelte({
      preprocess: preprocess({}),
    }),
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Access-Control-Allow-Private-Network", "true");
          next();
        });
      },
    },
  ],
});

export default getViteConfigDev;
