from django.shortcuts import render,redirect
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.decorators import login_required
from .models import *
from .mails import *
from .utility import *
from django.contrib.auth.models import User
from django.utils import timezone
# Create your views here.

def forgot_password(request):
    return render(request, 'forgot_pass.html')

## citizens
def citizen_login(request):
    if request.method == 'POST':
        mec_id = request.POST("mec")
        if Citizen.objects.filter(MEC_no=mec_id).exists(): 
            citizen = Citizen.objects.filter(MEC_no=mec_id)
            user = User.objects.get(id=citizen)
            auto_otp = otp_generate() ## generate the otp
            otp= OTP.objects.create(
                user=user,
                otp=auto_otp,
                otp_created_at=timezone.now()
            )
            otp.save()
            # OTP_mail(otp,user.email) ## send the mail to the user email
            ## mec_id verification
    return render(request, 'citizen_login.html')

def citizen_reg(request):
    return render(request, 'citizen_reg.html')

@login_required
def home(request):
    return render(request, 'citizen_landing.html')

def citizen_skillset(request):
    return render(request, 'citizen_skillset.html')

def citizen_education_profile(request):
    return render(request, 'citizen_education_profile.html')

def personal_profile(request):
    return render(request, 'citizen_personal_profile.html')

## institutions
def institution_login(request): 
    if request.method == "POST":
        lic = request.POST["lic"]
        psw = request.POST["psw"]
        if User.objects.filter(username=lic).exists():
            institute = authenticate(request,username=lic,password=psw)
            if institute is not None:
                    login(request,institute)  ## institution login
                    request.session['institute_name'] = institute
                    return redirect("/institution")
            else:
                return redirect("/institution-login")
    return render(request, 'institution_login.html')

def institution_reg(request):
    return render(request,"institution_reg.html")

@login_required
def institution_logout(request):
    logout(request) ## institution logout
    return redirect("/institution-login")

# @login_required
def institution(request):
    # institute_name = request.session.get['institute_name']
    # institute = EducationProfile.objects.filter(inst=institute_name)
    return render(request, 'institution_landing.html')

def institution_staff(request):
    if request.method == "POST":
        addname = request.POST["addname"]
        addphone = request.POST["addphone"]
        addemail = request.POST["addemail"]
        dept = request.POST["dept"]
        adddesig = request.POST["adddesig"]
        addaoi = request.POST["addaoi"]
    return render(request, 'institution_staff_manage.html')

# @login_required
def institution_student(request):
    if request.method == "POST":
        addmecid = request.POST['addmecid']
        addnamestu = request.POST['addnamestu']
        addrollstu = request.POST['addrollstu']
        addregstu = request.POST['addregstu']
        addphonestu = request.POST['addphonestu']
        addemailstu = request.POST['addemailstu']
        dept = request.POST['dept']
        course = request.POST['course']
        syear = request.POST['syear']
        eyear = request.POST['eyear']
        status = request.POST['status']
        edp_id =edp_id_generator()
        if not User.objects.filter(username=addmecid).exists() and not EducationProfile.objects.filter(edp_id=edp_id).exists():
            user = User.objects.create(username=addmecid,email=addemailstu)
            citizen = Citizen.objects.create(
                MEC_no=user.username,
                name=addnamestu,
                phone=addphonestu)
            course_id = course_id_generator()
            course = Course.objects.create()
            education_profile = EducationProfile.objects.create(
                edp_id=edp_id,
                roll=addrollstu,
                department=dept,
                registration_no=addregstu,
                registration_year=syear,
                passing_year=eyear,
                status=status)

    return render(request, 'institution_student_manage.html')

@login_required
def institution_course(request):
    if request.method == "POST":
        coursecode = request.POST["coursecode"]
        coursename = request.POST["coursename"]
        duration = request.POST["duration"]
        totalsem = request.POST["totalsem"]
        department = request.POST["department"]
        if not Course.objects.filter(course_id=coursecode).exists():
            course = Course.objects.create(
                course_id=coursecode,
                course_name=coursename,
                duration=duration,
                department=department,
                totalsem=totalsem,
                type="deg",
                medium="offline")
            course.save()
    return render(request, 'institution_course_manage.html')

def institution_result(request):
    return render(request, 'institution_result_manage.html')

# ## employes
# def employer_login(request):
#     return render(request, 'employer_login.html')


# def search_job(request):
#     return render(request, 'search_jobs.html')
