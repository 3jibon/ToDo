FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy project files into the container
COPY . /app

# Install dependencies
RUN pip install -r requirements.txt

# Copy static files
COPY ./static /app/static

# Expose the app port
EXPOSE 8000

# Run the app
CMD ["gunicorn", "app:app", "-b", "0.0.0.0:8000"]
