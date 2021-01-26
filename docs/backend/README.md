# Backend

_NOTE: There are no specific requirements for a Looker application. While the reference implementation using JavaScript and Express.js, any choice of language, framework and platform can be used. Looker provides pre-built SDKs in JavaScript/TypeScript, Ruby, Python, C#, Kotlin (Android) and Swift (iOS)._

The Looker Data Application Reference Implementation is built in JavaScript and Express.js, to use a single language for the full stack. It serves these main purposes:

1. Authentication services
 - Providing tokens, for both embedding content and making API calls
 - Creating signed URLs for embedded content
 - Updating embed user permissions

2. Backend API examples 
 - Running data queries from the backend to provide the client with data

## Authentication

### Creating signed URLs for embedding
A key step in the embed flow is to generate a signed URL, as explained in the [reference docs](https://docs.looker.com/reference/embedding/sso-embed#building_the_embed_url).
This url can be generated via the Looker API, or your application can do so. By convention, a Looker application provides an `/auth` endpoint.
The full code for generating the signed URL itself is provided in `\auth\auth_utils.js`, which exports a createSignedURL function.
Additional examples in Python, Ruby, Java, C# and PHP are available on the [Looker GitHub repository](https://github.com/looker/looker_embed_sso_examples).

### Embed Secrets
To support embedding, you must [configure a domain allowlist](https://docs.looker.com/admin-options/platform/embed#embedded_domain_allowlist), and set an [embed secret](https://docs.looker.com/admin-options/platform/embed#embed_secret).

The Looker URL and embed secret should be accessed by your application as environment variables (see below).

### API Keys for backend API calls
For backend patterns, where you are accessing Looker's API from the application or server, you must provide the SDK with a Client ID and Secret, plus information about the Looker instance. These should be provided to your application as environment variables (see below)

### Env variables required by backend

PBL_PORT=3000

LOOKERSDK_API_VERSION=4.0
LOOKERSDK_BASE_URL=https://your-instance.looker.com
LOOKERSDK_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxx
LOOKERSDK_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxx
# no protocol for this host
LOOKERSDK_EMBED_HOST=your-instance.looker.com
LOOKERSDK_EMBED_SECRET=xxxxxxxxxxxxxxxxxxxxxx
```