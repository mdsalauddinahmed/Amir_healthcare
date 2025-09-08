import app from "./app.js";
import { Server } from "http";
const PORT = 3000;

async function main(){
    const server: Server =app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
}

main();