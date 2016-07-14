FROM anselal/python:v1

MAINTAINER Anastasios Selalmazidis <t.selalmasidis@gmail.com>

#
# Add files
#
ADD run.py /isthmos/
ADD app /isthmos/app/
ADD requirements.txt /isthmos/

#
# Install requirements
#
RUN pip install -r /isthmos/requirements.txt

#
# Run app
#
WORKDIR /isthmos
CMD python run.py
