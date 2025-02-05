import { Hono } from 'hono';

type Bindings = {
	NOTIFY_WORKFLOW: any; // or more specific type if you know the workflow type
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/trigger-workflow', async (c) => {
	const workflow = c.env.NOTIFY_WORKFLOW;
	const response = await workflow.dispatch({ someInput: "Hello from Worker A" });
	return c.json({ message: "Workflow triggered", response });
});

export default app;