const app = require("./app");
const swaggerDocs = require("./v1/config/swagger");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
    🚀 Server is Ready to rock and roll! 🎸✨
    ------------------------------
    |  Let's make some noise! 🎉  |
    ------------------------------
    |  Port: ${PORT}             |
    ------------------------------
    |  Keep calm and code on! 👨‍💻  |
    ------------------------------
`);
});

swaggerDocs(app,PORT);
