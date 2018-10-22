from app.backend import app


if __name__ == '__main__':
    app.config['DEBUG'] = True
    app.run(host='0.0.0.0', port=5000)
