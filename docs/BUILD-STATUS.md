
# Build status

Netlify builds use npm and Node 18.20.x.

If a build fails:
1. Check deploy logs for missing env vars.
2. Clear the Netlify build cache and redeploy.
3. Confirm `packageManager` in `package.json` remains npm.

## Read next
- `../LAUNCH_CHECKLIST.md`
