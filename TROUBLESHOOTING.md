# Troubleshooting Subdirectory Deployment

## Issue: "Forbidden - You don't have permission to access this resource"

### Symptoms:
- `http://127.0.0.1/s_h/` returns "Forbidden"
- `http://127.0.0.1/s_h/public/` works correctly

### Solution:

This happens when the root `.htaccess` isn't properly redirecting to the `public/` directory. 

**Check these:**

1. **Verify `.htaccess` exists in root:**
   - Make sure `.htaccess` file exists in the `s_h` folder (project root)
   - Check that it contains the rewrite rules to redirect to `public/`

2. **Check `mod_rewrite` is enabled:**
   ```bash
   # Check if mod_rewrite is enabled (via SSH or phpinfo)
   php -m | grep rewrite
   ```
   Or check `phpinfo()` output for `mod_rewrite`

3. **Verify file permissions:**
   ```bash
   # .htaccess should be readable
   chmod 644 .htaccess
   ```

4. **Test the rewrite rules:**
   - The root `.htaccess` should redirect `/s_h/` to `/s_h/public/`
   - The `public/.htaccess` should then route to `index.php`

5. **Check Apache configuration:**
   - Some hosts require `AllowOverride All` in Apache config
   - Contact your host if `.htaccess` files aren't being processed

### Alternative Quick Fix:

If the redirect still doesn't work, you can create an `index.php` in the root that redirects:

```php
<?php
// Temporary redirect file in root (s_h/index.php)
header('Location: public/');
exit;
```

But the `.htaccess` method is preferred.

## Issue: Assets Not Loading in Subdirectory

### Solution:

1. **Set APP_URL correctly:**
   ```env
   APP_URL=http://127.0.0.1/s_h
   # No trailing slash!
   ```

2. **Clear config cache:**
   ```bash
   php artisan config:clear
   php artisan config:cache
   ```

3. **Rebuild assets:**
   ```bash
   npm run build
   ```

## Issue: Routes Return 404

### Solution:

1. **Clear route cache:**
   ```bash
   php artisan route:clear
   php artisan route:cache
   ```

2. **Verify APP_URL:**
   ```env
   APP_URL=http://127.0.0.1/s_h
   ```

3. **Check public/.htaccess exists and has correct rules**

## Testing Your Setup

After fixing, test these URLs:

- ✅ `http://127.0.0.1/s_h/` - Should load app (not Forbidden)
- ✅ `http://127.0.0.1/s_h/public/` - Should also work
- ✅ `http://127.0.0.1/s_h/storage/` - Should be blocked (403 Forbidden)
- ✅ `http://127.0.0.1/s_h/.env` - Should be blocked (403 Forbidden)

