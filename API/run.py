from flask import Flask
from app import createApp


app = Flask(__name__)

app = createApp()


if __name__ == "__main__":
    app.run()

