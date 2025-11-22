# Shared Hosting Deployment Checklist

Use this checklist to ensure a smooth deployment to shared hosting.

## Pre-Deployment (Local)

- [ ] **Build Assets**
  - [ ] Run `npm install`
  - [ ] Run `npm run build`
  - [ ] Verify `public/build` directory contains assets

- [ ] **Optimize Laravel**
  - [ ] Run `php artisan config:cache`
  - [ ] Run `php artisan route:cache`
  - [ ] Run `php artisan view:cache`
  - [ ] Run `php artisan event:cache`

- [ ] **Environment Setup**
  - [ ] Create `.env` file for production
  - [ ] Set `APP_ENV=production`
  - [ ] Set `APP_DEBUG=false`
  - [ ] Generate `APP_KEY` with `php artisan key:generate`
  - [ ] Configure database credentials
  - [ ] Set correct `APP_URL`
  - [ ] Set `ASSET_URL` if deploying to a subdirectory (e.g., `/s_h`)

- [ ] **Security Check**
  - [ ] Remove any test/development data
  - [ ] Review `.env` for sensitive information
  - [ ] Ensure no debug routes are enabled

## File Upload

- [ ] **Upload Required Files**
  - [ ] Upload `app/` directory
  - [ ] Upload `bootstrap/` directory
  - [ ] Upload `config/` directory
  - [ ] Upload `database/` directory (migrations, seeders)
  - [ ] Upload `public/` directory (or contents to public_html)
  - [ ] Upload `resources/` directory
  - [ ] Upload `routes/` directory
  - [ ] Upload `storage/` directory (ensure subdirectories exist)
  - [ ] Upload `vendor/` directory OR run `composer install` on server
  - [ ] Upload `.htaccess` files (root and public)
  - [ ] Upload `artisan` file
  - [ ] Upload `composer.json` and `composer.lock`

- [ ] **Do NOT Upload**
  - [ ] `node_modules/` directory
  - [ ] `.env` file (create on server)
  - [ ] `.git/` directory
  - [ ] `tests/` directory (optional)
  - [ ] Development files

## Server Configuration

- [ ] **Environment File**
  - [ ] Create `.env` file on server
  - [ ] Copy production values from local `.env`
  - [ ] Update database credentials
  - [ ] Update `APP_URL` to production domain
  - [ ] Verify `APP_KEY` is set

- [ ] **File Permissions**
  - [ ] Set `storage/` to 755 or 775
  - [ ] Set `bootstrap/cache/` to 755 or 775
  - [ ] Verify files are readable by web server

- [ ] **Directory Structure**
  - [ ] Verify Laravel root structure is correct
  - [ ] If using public_html, update `index.php` paths
  - [ ] Ensure storage directories exist:
    - [ ] `storage/app/public`
    - [ ] `storage/framework/cache`
    - [ ] `storage/framework/sessions`
    - [ ] `storage/framework/views`
    - [ ] `storage/logs`

## Post-Deployment

- [ ] **Composer Dependencies**
  - [ ] Run `composer install --no-dev --optimize-autoloader` (if vendor not uploaded)

- [ ] **Laravel Setup**
  - [ ] Run `php artisan storage:link`
  - [ ] Run `php artisan migrate --force`
  - [ ] Run `php artisan config:clear`
  - [ ] Run `php artisan cache:clear`
  - [ ] Run `php artisan route:clear`
  - [ ] Run `php artisan view:clear`
  - [ ] Run `php artisan config:cache`
  - [ ] Run `php artisan route:cache`
  - [ ] Run `php artisan view:cache`

- [ ] **Testing**
  - [ ] Visit homepage - check for errors
  - [ ] Verify CSS/JS assets are loading
  - [ ] Test database connectivity
  - [ ] Test file uploads (if applicable)
  - [ ] Test authentication (if applicable)
  - [ ] Check `storage/logs/laravel.log` for errors

- [ ] **Security Verification**
  - [ ] Verify `.env` is not accessible via browser
  - [ ] Verify `storage/` is not accessible
  - [ ] Verify `vendor/` is not accessible
  - [ ] Check that sensitive files are protected

## Troubleshooting

If you encounter issues:

- [ ] Check `storage/logs/laravel.log` for detailed errors
- [ ] Verify PHP version is 8.2 or higher
- [ ] Check required PHP extensions are installed
- [ ] Verify file permissions are correct
- [ ] Ensure `.env` file exists and is properly configured
- [ ] Clear all caches and rebuild
- [ ] Check database connection settings
- [ ] Verify `APP_URL` matches your domain

## Maintenance

- [ ] Set up cron jobs for scheduled tasks (if needed)
- [ ] Configure email settings (SMTP)
- [ ] Set up backup procedures
- [ ] Monitor `storage/logs/laravel.log` regularly

