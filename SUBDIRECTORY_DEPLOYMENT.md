# Subdirectory Deployment Guide

This guide explains how to deploy your Laravel application to a subdirectory (for example, `http://127.0.0.1/s_h/` or `https://yourdomain.com/subfolder/`).

## Quick Setup for Subdirectory Deployment

### Step 1: Upload Files

Upload your entire Laravel project to the subdirectory. For example:
- For `http://127.0.0.1/s_h/`, upload to the `s_h` folder
- For `https://yourdomain.com/myapp/`, upload to the `myapp` folder

**Directory Structure:**
```
/s_h/                   (or your subdirectory name)
|-- app/
|-- bootstrap/
|-- config/
|-- database/
|-- public/             (keep this directory)
|-- index.php
|-- .htaccess
|-- build/
|-- resources/
|-- routes/
|-- storage/
|-- vendor/
|-- artisan
`-- composer.json
```

### Step 2: Configure .env File

Set your `APP_URL` to include the subdirectory path, and set `ASSET_URL` so Vite assets use the same base:

```env
APP_URL=http://127.0.0.1/s_h
ASSET_URL=/s_h
# OR for production:
APP_URL=https://yourdomain.com/subfolder
ASSET_URL=/subfolder
```

**Important:**
- Include the subdirectory name in both `APP_URL` and `ASSET_URL`
- Do NOT include a trailing slash
- Use `http://` for local development, `https://` for production

### Step 3: Build and Verify Assets

The `.htaccess` files are already configured to route traffic correctly. For Vite assets:
1. Set `ASSET_URL` to your subdirectory (as above, no trailing slash)
2. Build your assets: `npm run build`
3. Ensure `public/build` contains your compiled assets
4. Laravel and Vite will emit asset URLs with the correct base path

### Step 4: Set File Permissions

```bash
chmod -R 755 storage
chmod -R 755 bootstrap/cache
```

### Step 5: Run Laravel Setup Commands

```bash
php artisan key:generate
php artisan storage:link
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## How It Works

The `.htaccess` files are configured to:
1. Route requests to `public/index.php` even from a subdirectory
2. Block direct access to sensitive files
3. Work the same for root (`/`), subdirectory (`/s_h/`), or nested subdirectory (`/folder/subfolder/`)

## Testing

After deployment, test these URLs:
- `http://127.0.0.1/s_h/` - Should load your application
- `http://127.0.0.1/s_h/public/` - Should also work (rewrites to public)
- `http://127.0.0.1/s_h/storage/` - Should be blocked (protected)

## Common Issues

### Issue: 404 Not Found
- Verify `.htaccess` files are uploaded
- Check that `mod_rewrite` is enabled on your server
- Ensure `APP_URL` and `ASSET_URL` include the subdirectory path
- Clear cache: `php artisan config:clear`

### Issue: Assets Not Loading
- Set `ASSET_URL` to the subdirectory
- Run `npm run build` to rebuild assets
- Clear config cache: `php artisan config:clear && php artisan config:cache`
- Check browser console for 404 errors on asset files

### Issue: CSS/JS Return 404
- Ensure `public/build` directory exists and contains files
- Check that Vite manifest exists: `public/build/manifest.json`
- Verify file permissions on `public/build` directory

### Issue: Routes Not Working
- Clear route cache: `php artisan route:clear && php artisan route:cache`
- Verify `APP_URL` is correct in `.env`
- Check that `.htaccess` in `public/` exists

## Environment Configuration Example

For `http://127.0.0.1/s_h/`:

```env
APP_NAME="Your App"
APP_ENV=local
APP_KEY=base64:your-generated-key-here
APP_DEBUG=true
APP_URL=http://127.0.0.1/s_h
ASSET_URL=/s_h

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## Production Deployment

For production with a subdirectory:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com/subfolder
ASSET_URL=/subfolder
```

## Notes

- `.htaccess` handles routing; no code changes are needed after setting `APP_URL` and `ASSET_URL`
- Always rebuild assets after changing `ASSET_URL`
- Keep `APP_DEBUG` set to `false` in production
