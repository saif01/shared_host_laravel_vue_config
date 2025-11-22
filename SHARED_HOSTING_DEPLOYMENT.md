# Shared Hosting Deployment Guide

This guide will help you deploy this Laravel 12 application with Vue 3 to a shared hosting environment.

## Prerequisites

- PHP 8.2 or higher
- Composer (for local setup)
- Node.js and npm (for building assets)
- Access to cPanel or similar hosting control panel
- FTP/SFTP access or File Manager

## Step 1: Prepare Your Local Environment

### 1.1 Build Production Assets

Before uploading, build your production assets:

```bash
npm install
npm run build
```

This will create optimized assets in the `public/build` directory.

### 1.2 Optimize Laravel

Run these commands to optimize Laravel for production:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

**Note:** Do NOT run `php artisan optimize` as it's deprecated in Laravel 11+.

### 1.3 Generate Application Key (if not set)

```bash
php artisan key:generate
```

## Step 2: Upload Files to Shared Hosting

### 2.1 File Structure on Shared Hosting

On most shared hosting providers, your domain points to the `public_html` directory. You have three options:

#### Option A: Deploy to Subdirectory (e.g., /s_h/ or /myapp/)

**For accessing via `http://127.0.0.1/s_h/` or `https://yourdomain.com/subfolder/`:**

1. Upload **ALL** project files to the subdirectory folder (e.g., `s_h` or `myapp`)
2. Keep the `public` folder as-is (don't move it)
3. Set `APP_URL` in `.env` to include the subdirectory: `APP_URL=http://127.0.0.1/s_h`
4. The `.htaccess` files are already configured to work with subdirectories

**See `SUBDIRECTORY_DEPLOYMENT.md` for detailed subdirectory deployment instructions.**

#### Option B: Deploy to public_html (Recommended for root domain)

1. Upload **ALL** project files to your hosting account
2. Move the contents of the `public` folder to `public_html`
3. Update the `public_html/index.php` paths (see Step 3)

#### Option C: Deploy with public as document root (If supported)

1. Upload all files maintaining the directory structure
2. Point your domain's document root to the `public` directory
3. This is the preferred method but not all shared hosts support it

### 2.2 Files to Upload

Upload these files and directories:
- `app/`
- `bootstrap/`
- `config/`
- `database/`
- `public/` (or its contents to public_html)
- `resources/`
- `routes/`
- `storage/`
- `vendor/` (or run `composer install --no-dev` on server)
- `.htaccess` (root and public)
- `artisan`
- `composer.json`
- `composer.lock`

**Do NOT upload:**
- `node_modules/` (not needed in production)
- `.env` (create it on the server)
- `.git/`
- `tests/`

## Step 3: Configure Paths (If using Option A)

If you deployed using Option A (public_html), you need to update `public_html/index.php`:

```php
<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
(require_once __DIR__.'/../bootstrap/app.php')
    ->handleRequest(Request::capture());
```

**Important:** Adjust the paths (`../storage`, `../vendor`, `../bootstrap`) based on your actual directory structure.

## Step 4: Set Up Environment Variables

### 4.1 Create .env File

Create a `.env` file in your project root (or where `artisan` is located) with these settings:

```env
APP_NAME="Your App Name"
APP_ENV=production
APP_KEY=base64:YOUR_APP_KEY_HERE
APP_DEBUG=false
APP_URL=https://yourdomain.com
ASSET_URL=

# For subdirectory deployment, include the subdirectory in APP_URL:
# APP_URL=http://127.0.0.1/s_h
# APP_URL=https://yourdomain.com/subfolder
# And set ASSET_URL so Vite assets use the subdirectory (no trailing slash):
# ASSET_URL=/s_h
# ASSET_URL=https://yourdomain.com/subfolder

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

### 4.2 Generate Application Key

If you haven't generated the key locally, SSH into your server and run:

```bash
php artisan key:generate
```

Or manually add the key to your `.env` file.

### 4.3 Set ASSET_URL for Vite (subdirectory only)

If your app is served from a subdirectory, set `ASSET_URL` to that path so built Vite assets load correctly:

```env
APP_URL=https://yourdomain.com/subfolder
ASSET_URL=/subfolder
```

For a local subdirectory such as `http://127.0.0.1/s_h`:

```env
APP_URL=http://127.0.0.1/s_h
ASSET_URL=/s_h
```

### 4.4 Get Database Credentials

Get your database credentials from your hosting control panel (cPanel, etc.) and update the `DB_*` variables in `.env`.

## Step 5: Set File Permissions

Set proper permissions for Laravel directories:

```bash
# Storage and cache directories (755 or 775)
chmod -R 755 storage
chmod -R 755 bootstrap/cache

# If 755 doesn't work, try 775
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

**Note:** Some shared hosts may require different permissions. Check with your hosting provider.

## Step 6: Create Storage Symbolic Link

Run this command to create the storage link:

```bash
php artisan storage:link
```

If symbolic links aren't supported, you may need to:
1. Create a `storage` folder inside `public` or `public_html`
2. Manually copy files or use a different storage method

## Step 7: Run Database Migrations

Run migrations to set up your database:

```bash
php artisan migrate --force
```

The `--force` flag is needed in production.

## Step 8: Clear and Cache Configuration

After setting up your `.env` file, run:

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Then cache for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Step 9: Verify Deployment

1. Visit your domain in a browser
2. Check that assets (CSS/JS) are loading correctly
3. Test your application functionality
4. Check error logs: `storage/logs/laravel.log`

## Common Issues and Solutions

### Issue: 500 Internal Server Error

**Solutions:**
- Check file permissions (storage, bootstrap/cache)
- Verify `.env` file exists and has correct values
- Check `storage/logs/laravel.log` for detailed errors
- Ensure `APP_KEY` is set in `.env`
- Verify PHP version is 8.2+

### Issue: Assets Not Loading

**Solutions:**
- Ensure `npm run build` was run before deployment
- Check that `public/build` directory exists and contains files
- Verify `APP_URL` in `.env` matches your domain
- Clear browser cache

### Issue: Permission Denied Errors

**Solutions:**
- Set storage and bootstrap/cache to 755 or 775
- Some hosts require 777 (less secure, use only if necessary)
- Check ownership of files matches your hosting account

### Issue: Database Connection Failed

**Solutions:**
- Verify database credentials in `.env`
- Ensure database user has proper permissions
- Check if `localhost` should be replaced with actual DB host
- Some hosts use `127.0.0.1` instead of `localhost`

### Issue: Composer Dependencies Missing

**Solutions:**
- Run `composer install --no-dev --optimize-autoloader` on server
- Or upload the `vendor` directory from local

### Issue: Vite Assets Not Found

**Solutions:**
- Ensure `npm run build` was executed
- Check `public/build/manifest.json` exists
- Verify `APP_ENV=production` in `.env`
- Clear config cache: `php artisan config:clear`

## Security Checklist

- [ ] `APP_DEBUG=false` in production
- [ ] `APP_ENV=production` in production
- [ ] `.env` file is not publicly accessible (protected by .htaccess)
- [ ] Storage directory is protected
- [ ] Sensitive files are protected by .htaccess
- [ ] File permissions are set correctly (not 777 unless necessary)
- [ ] Application key is set and secure

## Maintenance Mode

To put your site in maintenance mode:

```bash
php artisan down
```

To bring it back up:

```bash
php artisan up
```

## Updating Your Application

When updating your application:

1. Upload new files (excluding `.env`)
2. Run `composer install --no-dev --optimize-autoloader`
3. Run `php artisan migrate` (if database changes)
4. Run `npm run build` (if frontend changes)
5. Clear and recache: `php artisan config:clear && php artisan config:cache`

## Setting Up Cron Jobs

Laravel requires a cron job to run scheduled tasks. Set up a cron job in your hosting control panel:

### Via cPanel Cron Jobs:

1. Go to cPanel → Cron Jobs
2. Add a new cron job with these settings:
   - **Minute:** `*`
   - **Hour:** `*`
   - **Day:** `*`
   - **Month:** `*`
   - **Weekday:** `*`
   - **Command:** `/usr/bin/php /home/username/path/to/your/project/artisan schedule:run >> /dev/null 2>&1`

   Replace:
   - `/usr/bin/php` with your PHP path (check with `which php` via SSH)
   - `/home/username/path/to/your/project` with your actual project path
   - Some hosts may use `/usr/local/bin/php` or a different path

### Alternative Command Format:

If the above doesn't work, try:
```bash
cd /home/username/path/to/your/project && /usr/bin/php artisan schedule:run >> /dev/null 2>&1
```

### Verify Cron Job:

After setting up, you can test it by running the command manually via SSH:
```bash
php artisan schedule:run
```

## Additional Notes

- Some shared hosts have restrictions on certain PHP functions
- Cron jobs may need to be set up via cPanel for scheduled tasks
- Email configuration may require SMTP settings from your host
- Check your host's PHP version and extensions requirements
- Some hosts may require specific PHP.ini settings
- If queue jobs are used, you may need to set up a queue worker (check your host's capabilities)

## Support

If you encounter issues:
1. Check `storage/logs/laravel.log` for errors
2. Enable temporary debug mode: `APP_DEBUG=true` (remember to disable after)
3. Contact your hosting provider for server-specific issues
4. Review Laravel documentation: https://laravel.com/docs

