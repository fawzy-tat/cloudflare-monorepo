// <docs-tag name="full-workflow-example">
import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent } from 'cloudflare:workers';
import { drizzle } from 'drizzle-orm/d1';
import { users } from '@shared/db-schema';

type Env = {
	// Add your bindings here, e.g. Workers KV, D1, Workers AI, etc.
	NOTIFY_WORKFLOW: Workflow;
	DB: D1Database;
};

// User-defined params passed to your workflow
type Params = {
	email: string;
	metadata: Record<string, string>;
};

// <docs-tag name="workflow-entrypoint">
class NotifyWorkflow extends WorkflowEntrypoint<Env, Params> {
	async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
		// Can access bindings on `this.env`
		// Can access params on `event.payload`

		console.log('NotifyWorkflow run', event);

		const db = drizzle(this.env.DB);
		const result = await db.select().from(users);
		console.log('result', result);

		const files = await step.do('my first step', async () => {
			// Fetch a list of files from $SOME_SERVICE
			return {
				inputParams: event,
				files: [
					'doc_7392_rev3.pdf',
					'report_x29_final.pdf',
					'memo_2024_05_12.pdf',
					'file_089_update.pdf',
					'proj_alpha_v2.pdf',
					'data_analysis_q2.pdf',
					'notes_meeting_52.pdf',
					'summary_fy24_draft.pdf',
				],
			};
		});

		const apiResponse = await step.do('some other step', async () => {
			let resp = await fetch('https://api.cloudflare.com/client/v4/ips');
			return await resp.json<any>();
		});

		await step.sleep('wait on something', '1 minute');
	}
}

// // ✅ Ensure a named export
export { NotifyWorkflow };

// // ✅ Add a default export with the workflow instance
// export default { NotifyWorkflow };
