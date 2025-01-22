# Use an official Python image as a parent image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV PORT 8000

# Set the working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project files
COPY . .

# Expose the port (This is the port that will be used by Railway)
EXPOSE 8000

# Set the entrypoint command to run Gunicorn
CMD ["sh", "-c", "gunicorn todo.wsgi:application --bind 0.0.0.0:$PORT"]
