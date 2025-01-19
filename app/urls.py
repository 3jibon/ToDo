from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
from django.contrib import admin

urlpatterns = [
    # Authentication routes
    path('', views.login, name='login'),  # Handles login
    path('logout/', views.logout, name='logout'),  # Handles logout
    path('signup/', views.signup, name='signup'),  # Handles signup
    path('forgot/', views.forgot, name='forgot'),  # Forgot password page

    # Password Reset views
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='forgot.html'), name='password_reset'),
    path('password_reset_done/', auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'), name='password_reset_done'),
    path('password_reset_confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'), name='password_reset_confirm'),
    path('password_reset_complete/', auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'), name='password_reset_complete'),

    # Task routes
    path('dashboard/', views.dashboard, name='dashboard'),
    path('task_list/', views.task_list, name='task_list'),  # View all tasks
    path('add_task/', views.add_task, name='add_task'),  # Add a new task
    path('completed/',views.completed,name='completed'),
    path('edit_task/<int:task_id>/', views.edit_task, name='edit_task'),  # Edit a task
    path('task_list/<int:task_id>/delete/', views.delete_task, name='delete_task'),  # Delete a task
    path('update_status/<int:task_id>/', views.update_task_status, name='update_task_status'),  # Update task status
]
admin.site.site_header = "ToDo App"
admin.site.site_title = "ToDo App Admin Panel"
admin.site.index_title = "Welcome to ToDo App admin panel"