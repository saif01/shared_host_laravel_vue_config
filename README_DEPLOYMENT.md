# Deployment Quick Start

## For Subdirectory Deployment (e.g., `http://127.0.0.1/s_h/`)

1. **Upload all files** to your subdirectory folder (e.g., `s_h` folder)

2. **Set APP_URL and ASSET_URL in .env:**
   ```env
   APP_URL=http://127.0.0.1/s_h
   ASSET_URL=/s_h
   ```
   *(No trailing slash; Vite will add `/build/` automatically.)*

3. **Run setup commands:**
   ```bash
   php artisan key:generate
   php artisan storage:link
   php artisan migrate --force
   php artisan config:cache
   ```

4. **Access your app:** `http://127.0.0.1/s_h/`

That's it! The `.htaccess` files are already configured for subdirectory deployment.

## For Root Domain Deployment

See `SHARED_HOSTING_DEPLOYMENT.md` for complete instructions.

## Need Help?

- **Subdirectory deployment:** See `SUBDIRECTORY_DEPLOYMENT.md`
- **Full guide:** See `SHARED_HOSTING_DEPLOYMENT.md`
- **Quick reference:** See `QUICK_REFERENCE.md`
- **Checklist:** See `DEPLOYMENT_CHECKLIST.md`

