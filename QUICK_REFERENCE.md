# Quick Reference - Shared Hosting Deployment

## Essential Commands

### Before Uploading (Local)
```bash
npm run build                    # Build production assets
php artisan config:cache         # Cache configuration
php artisan route:cache          # Cache routes
php artisan view:cache           # Cache views
```

### After Uploading (Server)
```bash
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan storage:link
php artisan migrate --force
php artisan config:clear && php artisan config:cache
php artisan route:clear && php artisan route:cache
php artisan view:clear && php artisan view:cache
```

## File Permissions

```bash
chmod -R 755 storage
chmod -R 755 bootstrap/cache
```

If 755 does not work:
```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

## Essential .env Settings

### For Root Deployment
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
```

### For Subdirectory Deployment (e.g., /s_h/)
```env
APP_ENV=local
APP_DEBUG=true
APP_URL=http://127.0.0.1/s_h
ASSET_URL=/s_h
# OR for production:
# APP_URL=https://yourdomain.com/subfolder
# ASSET_URL=/subfolder
```

**Important:** Always include the subdirectory path in `APP_URL` and `ASSET_URL` (no trailing slash). Vite adds `/build/` automatically.

## Common File Paths

- Laravel Root: where `artisan` and `composer.json` are located
- Public Directory: `public/` or `public_html/` (depends on host)
- Storage: `storage/` (must be writable)
- Logs: `storage/logs/laravel.log`

## Troubleshooting Quick Fixes

### 500 Error
1. Check `storage/logs/laravel.log`
2. Verify `.env` exists and `APP_KEY` is set
3. Check file permissions
4. Clear caches

### Assets Not Loading
1. Run `npm run build` locally
2. Upload `public/build` directory
3. Clear browser cache
4. Verify `APP_URL` and `ASSET_URL` in `.env`

### Database Connection Failed
1. Verify credentials in `.env`
2. Check if host is `localhost` or `127.0.0.1`
3. Ensure database user has permissions

## Directory Structure

### Subdirectory Deployment (e.g., /s_h/)
```
/s_h/                  (subdirectory)
|-- public/            (keep as-is)
|-- index.php
|-- .htaccess
|-- build/
|-- app/
|-- bootstrap/
|-- config/
|-- database/
|-- resources/
|-- routes/
|-- storage/
|-- vendor/
|-- artisan
`-- composer.json
```

### Root Deployment (Option A - public_html)
```
/home/username/
|-- public_html/       (move contents of public/ here)
|   |-- index.php
|   |-- .htaccess
|   `-- build/
|-- app/
|-- bootstrap/
|-- config/
|-- database/
|-- resources/
|-- routes/
|-- storage/
|-- vendor/
|-- .env
|-- artisan
`-- composer.json
```

## Directory Structure (Option B - public as root)
```
/home/username/
|-- public/            (document root)
|   |-- index.php
|   `-- build/
|-- app/
|-- bootstrap/
|-- config/
|-- database/
|-- resources/
|-- routes/
|-- storage/
|-- vendor/
|-- .env
|-- artisan
`-- composer.json
```

## Cron Job Command

```bash
* * * * * /usr/bin/php /home/username/path/to/artisan schedule:run >> /dev/null 2>&1
```

## Security Checklist

- [ ] `APP_DEBUG=false`
- [ ] `.env` not accessible via browser
- [ ] `storage/` protected
- [ ] File permissions set correctly
- [ ] `APP_KEY` generated
