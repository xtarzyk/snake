from flask import Flask, render_template, redirect, request
import data_manager
app = Flask(__name__)


@app.route('/')
def menu():
    return render_template('menu.html')


@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/send-result')
def send_result():
    nickname = request.cookies.get('nickname')
    score = int(request.cookies.get('score'))
    data_manager.save_score(nickname=nickname, score=score)
    return redirect('scoreboard')


@app.route('/scoreboard')
def scoreboard():
    score_board = data_manager.get_scoreboard()
    return render_template('scoreboard.html', score_board=score_board)


if __name__ == '__main__':
    app.run()
