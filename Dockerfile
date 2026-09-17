FROM python:3.6-slim-buster
WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .
EXPOSE 4000
CMD sh -c 'echo "Application running at http://127.0.0.1:4000/"; flask run --host=0.0.0.0 --port=4000'