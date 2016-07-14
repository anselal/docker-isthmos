import sys

from app.backend import app

reload(sys)
sys.setdefaultencoding('utf-8')

if __name__ == '__main__':
    app.config['DEBUG'] = True
    app.run(host='0.0.0.0', port=5000)
