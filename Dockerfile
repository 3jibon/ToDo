# Base image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PORT=8000  

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy project files
COPY . .

# Expose port
EXPOSE $PORT

# Start the Django server
CMD ["sh", "-c", "python manage.py runserver 0.0.0.0:$PORT"]
