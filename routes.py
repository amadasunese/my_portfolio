from flask import Blueprint, render_template, request, redirect, url_for, flash
from forms import ContactForm
from flask_mail import Message
from app import mail
import smtplib
# from config import Config

bp = Blueprint('routes', __name__)


# Sample resume data
resume_data = {
    "name": "Your Name",
    "title": "Web Developer",
    "summary": "A passionate web developer with experience in HTML, CSS, JavaScript, and Python.",
    # Add more resume data here
}

@bp.route("/")
def index():
    return render_template("index.html", resume_data=resume_data)

# @bp.route('/contact', methods=['GET', 'POST'])
# def contact():
#     form = ContactForm()
#     if request.method == 'POST':
#         if not form.validate():
#             flash('All fields are required.')
#             return render_template('contact.html', form=form)
#         else:
#             msg = Message(
#                 form.subject.data,
#                 sender='amadasunese@gmail.com',
#                 recipients=['amadasunese@gmail.com']
#             )
#             msg.body = f"""
#             From: {form.name.data} <{form.email.data}>
#             {form.message.data}
#             """
#             try:
#                 mail.send(msg)
#                 return render_template('contact.html', success=True)
#             except Exception as e:
#                 flash(f'An error occurred while sending the email: {str(e)}')
#                 return render_template('contact.html', form=form)
#     elif request.method == 'GET':
#         return render_template('contact.html', form=form)

@bp.route('/contact', methods=['GET', 'POST'])
def contact():
    form = ContactForm()
    if request.method == 'POST':
        if not form.validate():
            flash('All fields are required.')
            return render_template('contact.html', form=form)
        else:
            msg = Message(
                form.subject.data,
                sender='amadasunese@gmail.com',  # Ensure this matches the default sender
                recipients=['amadasunese@gmail.com']
            )
            msg.body = f"""
            From: {form.name.data} <{form.email.data}>
            {form.message.data}
            """
            try:
                mail.send(msg)
                flash('Your message has been sent successfully.')
                return render_template('contact.html', success=True)
            except ConnectionRefusedError:
                flash('Failed to connect to the email server. Please try again later.')
                return render_template('contact.html', form=form)
            except smtplib.SMTPAuthenticationError:
                flash('SMTP authentication error. Please check your email configuration.')
                return render_template('contact.html', form=form)
            except Exception as e:
                flash(f'An unexpected error occurred: {str(e)}')
                return render_template('contact.html', form=form)
    elif request.method == 'GET':
        return render_template('contact.html', form=form)
    
@bp.route('/resume')
def resume():
    return render_template('resume.html')

@bp.route('/projects')
def projects():
    return render_template('project.html')

@bp.route('/about')
def about():
    return render_template('aboutme.html')
