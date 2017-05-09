""" The general code for the Pizza Roulette web page """
from flask import Flask, render_template, request
from urllib.request import urlopen
from bs4 import BeautifulSoup
app = Flask(__name__)


@app.route("/")
def index():
    """ Renders the index web page """
    return render_template('index.html')


@app.route("/pizza")
def pizza():
    """ Renders the resulting pizza from randomization """
    url = str(request.args.get('url'))
    html = urlopen(url).read()
    pizzas = parseHtml(html)
    return pizzas


def parseHtml(html):
    soup = BeautifulSoup(html, 'html.parser')
    menu_list = soup.find("div", class_="menu__list")
    print(menu_list)
    return menu_list


if __name__ == "__main__":
    app.run()
