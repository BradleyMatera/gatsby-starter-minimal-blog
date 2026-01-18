# Environment

| Variable | Purpose | Example | Notes |
| --- | --- | --- | --- |
| `ANALYSE_BUNDLE` | Toggles `gatsby-plugin-webpack-statoscope` in `gatsby-config.ts`. When truthy (`1`, `true`), the build writes reports to `public/.statoscope/`. | `ANALYSE_BUNDLE=1 npm run build` | Only useful for bundle analysis. No value = plugin is omitted. |
| `NETLIFY` | Read in `package.json`’s `postinstall` hook to rebuild `sharp` for Netlify’s Linux x64 environment. | `NETLIFY=true npm install` | Set automatically by Netlify; locally set when debugging the sharp rebuild warning. |
| `XAI_API_KEY` | Required by `projecthub-proxy/server.js` to authenticate with `https://api.x.ai/v1/chat/completions`. | `XAI_API_KEY=sk-...` | Keep this secret. Without it, `/api/chat` returns `400` because the proxy cannot forward requests. |
| `PORT` | Defines the listening port for `projecthub-proxy/server.js`, defaulting to `3000` if absent. | `PORT=4000 node projecthub-proxy/server.js` | Changing the port means updating the front-end URL that hits the proxy. |
| `USER_POOL_ID` | Referenced in the Cognito-Lambda example inside `content/posts/secure-authentication-cognito-react/index.mdx`. | `USER_POOL_ID=us-east-1_abcd1234` | **Assumption:** This blog post snippet expects Cognito values; the Gatsby site itself does not read them. *How to verify:* run `rg "USER_POOL_ID" -n content/posts/secure-authentication-cognito-react/index.mdx` and note the snippet only documents the flow. |
| `CLIENT_ID` | Same Cognito sample, used by `aws-jwt-verify` in the same MDX snippet. | `CLIENT_ID=1h2jk3l4m5n6op7q8r9s0t` | **Assumption:** Only the illustrated Lambda needs it; Gatsby builds succeed without defining it. *How to verify:* comment out the snippet and rebuild; Gatsby still compiles. |
