module.exports = {
  apps : [{
    name: "next-app",
    script: "npm",
    args: "start",
    cwd: "/src",
    watch: true,
    env: {
      NODE_ENV: "production",
    }
  }]
};