from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from .models import Task
from datetime import date
from django.core.mail import send_mail
from django.conf import settings

def login(request):
    if request.user.is_authenticated:
        return redirect('dashboard')  # Redirect to dashboard if already logged in
    
    if request.method == 'POST':
        logemail = request.POST.get('logemail')
        password = request.POST.get('password')

        # Ensure that the user exists with the provided email
        try:
            user = User.objects.get(email=logemail)
        except User.DoesNotExist:
            messages.warning(request, 'This Email is not REGISTERED!')
            return redirect('login')

        # Authenticate the user using username and password
        user = authenticate(request, username=user.username, password=password)

        if user is not None:
            auth_login(request, user)
            return redirect('dashboard')  # Redirect to dashboard after successful login
        else:
            messages.warning(request, 'Invalid Credentials!')
            return redirect('login')  # Redirect back to login page for invalid credentials

    return render(request, 'door.html')  # Render the login page if GET request


def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        logemail = request.POST.get('logemail')
        pass1 = request.POST.get('pass1')
        pass2 = request.POST.get('pass2')

        if pass1 != pass2:
            messages.warning(request, 'Password does not match!')
            return redirect('signup')
        
        if User.objects.filter(username=username).exists():
            messages.warning(request, 'Username already exists!')
            return redirect('signup')

        if User.objects.filter(email=logemail).exists():
            messages.warning(request, 'This email is already registered!')
            return redirect('signup')

        try:
            user = User.objects.create_user(username=username, email=logemail, password=pass1)
            user.save()
            messages.success(request, 'Successfully signed up!')
            return redirect('login')
        except Exception as e:
            messages.warning(request, 'Something went wrong, Please try again!')
            return redirect('signup')
    return render(request, 'signup.html')


def door(request):
    # Check the path to determine whether it's a login or signup
    if "signup" in request.path:
        form_type = 'signup'  # Show the signup form
    else:
        form_type = 'login'  # Default to login form
    
    return render(request, 'door.html', {'form_type': form_type})

def redirect_to_login(request):
    # This is assuming you want to redirect to login or some specific view
    if request.path == "admin":
        return redirect("admin")  # Redirect to the desired path
    else:
        return login(request)

def logout(request):
    auth_logout(request)
    return redirect('login')  # Redirect to login page after logout

def forgot(request):
    return render(request, 'forgot.html')


def update_task_status(request, task_id):
    task = get_object_or_404(Task, id=task_id)

    if request.method == "POST":
        is_complete = request.POST.get("is_complete") == "on"  # Checkbox sends "on" if checked
        task.is_complete = is_complete
        task.save()

    return redirect('task_list')


@login_required
def task_list(request):
    tasks = Task.objects.filter(user=request.user,is_complete=False)
    return render(request, "task_list.html", {'tasks': tasks})


def add_task(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description')
        due_date = request.POST.get('due_date')
        user=request.user

        new_task = Task(title=title, description=description, due_date=due_date ,user=user)
        new_task.save()
    return redirect('task_list')


def delete_task(request, task_id):
    if request.method == 'POST':
        task = get_object_or_404(Task, id=task_id)
        task.delete()
    return redirect('task_list')



def edit_task(request, task_id):
    try:
        task = get_object_or_404(Task, id=task_id)
    except Exception as e:
        print(f"Error retrieving task: {e}")
        return render(request, 'error.html', {'error': 'Task not found'})
    
    if request.method == "POST":
        try:
            task.title = request.POST.get('title', '')
            task.description = request.POST.get('description', '')
            task.due_date = request.POST.get('due_date', '')
            task.save()
            return redirect('task_list')  # Or any other redirect you prefer
        except Exception as e:
            print(f"Error saving task: {e}")
            return render(request, 'error.html', {'error': 'An error occurred while saving the task.'})
    
    return render(request, 'edit_task.html', {'task': task})

def dashboard(request):
    # Get today's date
    today = date.today()

    # Query for today's tasks, pending tasks, and overdue tasks
    todays_reminders = Task.objects.filter(user=request.user, due_date=today, is_complete=False)  # Filter tasks due today and not completed
    pending_tasks = Task.objects.filter(user=request.user, due_date__gte=today, is_complete=False)  # Filter tasks due today or in the future and not completed
    overdue_tasks = Task.objects.filter(user=request.user, due_date__lt=today, is_complete=False)  # Filter tasks that are overdue

    # Send email reminder for today's tasks
    if todays_reminders.exists():
        task_list = "\n".join([f"- {task.title}: {task.description}" for task in todays_reminders])
        subject = "Reminder: Tasks Due Today"
        message = f"Hello {request.user.username},\n\nHere are your tasks due today:\n\n{task_list}\n\nBest,\nYour Task Management Team"
        recipient_email = request.user.email  # Send to logged-in user's email
        
        send_mail(subject, message, settings.EMAIL_HOST_USER, [recipient_email])

    # Render the dashboard template with tasks data
    return render(request, 'dashboard.html', {
        'todays_reminders': todays_reminders,
        'pending_tasks': pending_tasks,
        'overdue_tasks': overdue_tasks
    })
def completed(request):
    # Query completed tasks for the logged-in user
    completed = Task.objects.filter(user=request.user, is_complete=True)

    # Render the completed tasks page
    return render(request, 'completed.html', {'completed': completed})