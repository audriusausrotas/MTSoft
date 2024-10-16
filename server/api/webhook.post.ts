// server/middleware/webhook.js
import { exec } from 'child_process';


export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body)
  console.log("veikia?")
console.log("action" + body.action)
  // Check if the action is a push
  if (body.action === 'push') {
    return new Promise((resolve, reject) => {
      // Execute the deployment commands
      console.log("executina")
      exec('git pull && npm install && npm run build && pm2 restart MTSoft', { cwd: 'C:/MTwebsite/MTSoft' }, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return reject(createError({ statusCode: 500, statusMessage: 'Deployment failed' }));
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
        }
        console.log(`Stdout: ${stdout}`);
        return resolve({ message: 'Deployment successful' });
      });
    });
  }

  return { status: 'success' };
});
