# Step 1: Start with a base image that has Python installed
FROM python:3.10-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the current directory contents into the container's /app folder
COPY . /app/

# Step 4: Upgrade pip to avoid issues with older versions
RUN python -m pip install --upgrade pip

# Step 5: Install project dependencies from requirements.txt
RUN pip install -r requirements.txt

# Step 6: Expose port 8000 for the application (adjust if needed)
EXPOSE 8000

# Step 7: Define the command to run the application (adjust if needed)
CMD ["gunicorn", "--workers", "3", "--worker-class", "gevent", "todo.wsgi:application"]
