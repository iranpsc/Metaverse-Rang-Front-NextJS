module.exports = {
  apps : [{
    name: "next-app",
    script: "npm",
    args: "start",
    cwd: "/src/app",
    watch: true,
    env: {
      NODE_ENV: "production",
    }
  }]
};