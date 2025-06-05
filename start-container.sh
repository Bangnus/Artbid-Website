#!/bin/sh
set -e

# Ensure user and permissions
if [ "$SUPERVISOR_PHP_USER" != "root" ] && [ "$SUPERVISOR_PHP_USER" != "sail" ]; then
    echo "You should set SUPERVISOR_PHP_USER to either 'sail' or 'root'."
    exit 1
fi

if [ ! -z "$WWWUSER" ]; then
    usermod -u $WWWUSER sail
fi

mkdir -p /.composer
chmod -R ugo+rw /.composer

# Production setup
cd /var/www/html

# Run migrations in production
echo "Running migrations..."
php artisan migrate --force || true

# Start Laravel application (artisan serve)
echo "Starting Laravel app..."
exec php -d variables_order=EGPCS artisan serve --host=0.0.0.0 --port=8000
