import { Hono } from 'hono';
import { NotifyWorkflow } from '../../../workflows/notify-workflow/src';



const app = new Hono<{ Bindings: Env }>();

app.get('/trigger-workflow', async (c) => {
	// Define workflow parameters
	const params = {
		email: "user@example.com",
		metadata: { key1: "value1", key2: "value2" }
	};

	// Start a new workflow instance
	const instance = await c.env.NOTIFY_WORKFLOW.create({
		params,
		id: `notify-workflow-${Date.now()}`,
	});

	return Response.json({
		id: instance.id,
		details: await instance.status(),
	});
});

export default {
	fetch: app.fetch,
};

export { NotifyWorkflow };