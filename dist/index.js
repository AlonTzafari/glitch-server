import express from 'express';
const PORT = Number(process.env.PORT ?? 80);
const HOST = process.env.HOST ?? 'localhost';
const SSL = process.env.SSL === 'true' || false;
const app = express();
app.get('/health', (req, res) => {
    res.status(200).send("OK");
});
//comment
app.listen(PORT, HOST, () => {
    console.log(`server ready at ${SSL ? 'https' : 'http'}://${HOST}:${PORT}/health`);
});
//# sourceMappingURL=index.js.map