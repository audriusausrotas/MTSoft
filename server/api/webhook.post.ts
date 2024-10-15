import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default defineEventHandler(async (event) => {
  console.log("asdf")
  const body = await readBody(event);

  // Log the received webhook for debugging
  console.log('Received webhook:', body);

  try {
    // Command to pull latest changes and rebuild
    const { stdout, stderr } = await execAsync('git pull && npm install && npm run build && pm2 restart MTSoft');

    // Log the output
    console.log(`stdout: ${stdout}`);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return sendError(event, new Error('Error during execution'));
    }

    // Respond with a success message
    return { message: 'Application updated successfully' };
  } catch (error:any) {
    console.error(`Error executing command: ${error.message }`);
    return sendError(event, new Error('Error executing command'));
  }
});

