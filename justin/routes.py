from urllib.parse import urlparse
from flask import request, render_template, redirect, url_for, flash
from flask_mail import Message
from justin import app, mail
from justin.forms import MessageForm


@app.before_request
def redirect_to_io():
    urlparts = urlparse(request.url)

    if urlparts.netloc == "justin-le.herokuapp.com":
        return redirect(f"https://www.justinle.io{urlparts.path}", code=301)

    return None


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/projects")
def projects():
    return render_template("projects.html")


@app.route("/contact", methods=["GET", "POST"])
def contact():
    form = MessageForm()
    select_options = [
        ("", "Choose your option."),
        ("Personal Referral", "Personal Referral"),
        ("Linkedin", "Linkedin"),
        ("Indeed", "Indeed"),
        ("AngelList", "AngelList"),
        ("Google", "Google"),
        ("Other", "Other")
    ]
    form.connection.choices = select_options

    if form.validate_on_submit():
        msg = Message(form.subject.data, recipients=['jaylehyun@gmail.com'])
        msg.body = f"You received a message from {form.name.data.strip()} <{form.email.data.strip()}> with a connection from [{form.connection.data}].\n\n{form.message.data}"

        try:
            mail.send(msg)

            flash(f"Message was succesfully sent!", "teal lighten-1")
        except Exception as e:
            print(e)
            flash(f"Oops, something went wrong. If you want to contact me please shoot me an email at jaylehyun@gmail.com. Thank you!",
                  "background-color: #e57373;")

        return redirect(url_for("contact"), code=302)

    return render_template("contact.html", form=form)
