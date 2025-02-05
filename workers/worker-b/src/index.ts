import { Hono } from 'hono';
import { NotifyWorkflow } from '../../../workflows/notify-workflow/src';
type Bindings = {
	NOTIFY_WORKFLOW: any; // or more specific type if you know the workflow type
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/trigger-workflow-2', async (c) => {
	const workflow = c.env.NOTIFY_WORKFLOW;
	const response = await workflow.dispatch({ someInput: "Hello from Worker 2" });
	return c.json({ message: "Workflow triggered", response });
});

export default app;

export { NotifyWorkflow };