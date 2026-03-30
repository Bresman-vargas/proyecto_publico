import app from "./app.js";
import { PORT } from "./cofing.js";

async function main() {
  try {
    app.listen(PORT);
    console.log(`El server del papu está corriendo ${PORT}`);
  } catch (error) {
    console.error(error);
  }
}

main();  
                           