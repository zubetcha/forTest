from src.database import WhoisDog_db
from werkzeug.security import check_password_hash
from flask import Blueprint, render_template, request, flash, jsonify, url_for, session,redirect


import jwt
import datetime
import timedelta


SECRET_KEY = 'WHOISDOG'

login_pages = Blueprint('login_pages', __name__, url_prefix="/login")


@login_pages.route("/")
def login():
    return render_template("login.html")


@login_pages.route('/api/sign_in', methods=["POST"])
def api_sign_in():
    email_receive = request.form['email_give']
    password_receive = request.form['password_give']

    # 회원가입 때와 같은 방법으로 pw를 암호화합니다.
    # 회원가입 때와 같은 방법으로 pw를 암호화합니다.
    #  id, 암호화된 pw을 가지고 해당 유저를 찾습니다.
    user = WhoisDog_db.users.find_one({'email': email_receive})
    if user is None:
        return jsonify({'result': 'fail', 'msg': '아이디가 없습니다..'})
    elif not check_password_hash(user['password'], password_receive):
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})

    else:
        payload = {
            'id': email_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        print(token)
        return jsonify({'result': 'success', 'token': token})


