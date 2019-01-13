from flask_wtf import FlaskForm, RecaptchaField
from wtforms import StringField, TextAreaField, SelectField, SubmitField
from wtforms.validators import InputRequired, Email, Length


class MessageForm(FlaskForm):
    name = StringField("Your Name", validators=[InputRequired(), Length(min=2, max=50)])
    email = StringField("Your Email", validators=[InputRequired(), Email()])
    subject = StringField("Subject", validators=[Length(max=100)])
    message = TextAreaField("Your Message", validators=[InputRequired(), Length(min=2)])
    connection = SelectField("How did you find me?")
    recaptcha = RecaptchaField()
    submit = SubmitField("Send")
