module.exports = {
  apps: [
    {
      name: "next-app",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3002",
      cwd: "/home/frdevelop2/public_html",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
