# Use an official PHP image as the base image
FROM php:7.4-fpm

# Set the working directory to /app
WORKDIR /app

# Copy the composer.json and composer.lock files to the image
COPY composer.json composer.lock ./

# Run the composer install command to install dependencies
RUN composer install --no-scripts --no-dev --optimize-autoloader

# Copy the rest of the Laravel app files to the image
COPY . .

# Expose port 9000 for the PHP FPM process
EXPOSE 9000

# Run the PHP FPM process as the default command
CMD ["php-fpm"]
