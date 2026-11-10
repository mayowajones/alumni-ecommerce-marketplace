# Alumni Marketplace Frontend

React and Vite storefront for the Alumni Marketplace.

## Local development

```bash
npm ci
npm run dev
```

Without `VITE_API_URL`, local API requests use Vite's proxy to `http://localhost:5000`.

## Vercel deployment

Import this folder as its own GitHub repository/project in Vercel. Vercel detects Vite automatically; use `npm run build` and `dist` if prompted. Set the project environment variable `VITE_API_URL` to the deployed backend origin, without a trailing slash (for example, `https://your-backend-service.onrender.com`). Redeploy after changing environment variables.

The backend must allow the deployed frontend origin through its `CLIENT_URL` setting.