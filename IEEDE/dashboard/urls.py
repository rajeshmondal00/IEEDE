from django.contrib import admin
from django.urls import path
from dashboard import views

urlpatterns = [
    path('',views.home , name="home"),
    ## citizens
    path('citizen-reg/',views.citizen_reg , name="citizen_reg"),
    path('citizen-login/',views.citizen_login , name="citizen_login"),
    path('forgot-password/',views.forgot_password , name="forgot_password"),
    path('citizen-skillset/',views.citizen_skillset , name="citizen_skillset"),
    path('personal-profile/',views.personal_profile , name="personal_profile"),
    path('citizen-education-profile/',views.citizen_education_profile , name="citizen_education_profile"),
    ## institutions
    path('institution-reg/',views.institution_reg , name="institution_reg"),
    path('institution-login/',views.institution_login , name="institution_login"),
    path('institution-logout/',views.institution_logout , name="institution_logout"),
    path('institution/',views.institution , name="institution"),
    path('institution-staff/',views.institution_staff , name="institution_staff"),
    path('institution-student/',views.institution_student , name="institution_student"),
    path('institution-course/',views.institution_course , name="institution_course"),
    path('institution-result/',views.institution_result , name="institution_result"),
    # ## employes
    # path('search-job/',views.search_job , name="search_job"),
    # path('employer-login/',views.employer_login , name="employer_login"),
]
