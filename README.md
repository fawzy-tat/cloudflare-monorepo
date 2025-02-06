- To install dependencies for all packages, run `pnpm install` in the root directory.
- To import the shared packages in the workers, run `import { db } from "@shared/db-schema"` in the worker files.
  Example:

```typescript
import { db } from "@shared/db-schema";
```

- Same as above for workflows.
  Example:

```typescript
import { db } from "@shared/db-schema";
```

- The shared directory is a workspace package.
- To add a new package to the workspace, run `pnpm add <package> --workspace` in the root directory.
- To remove a package from the workspace, run `pnpm remove <package> --workspace` in the root directory.
- To add a new dependency to all packages, run `pnpm add <dependency>` in the root directory.
- To remove a dependency from all packages, run `pnpm remove <dependency>` in the root directory.

- To run a query on the database, run `pnpm run db:query:<env>` in the worker directory.
  Example:

```bash
pnpm run db:query:staging
```

- To seed the database,
  1. add a seed file in the seeds directory
     2 - edit the command in the package.json file and add the file name.
  2. run `pnpm run db:seed:<env>` in the worker directory.
     Example:

```bash
pnpm run db:seed:staging
```
