import fetch from 'node-fetch';

const webhookURL = 'https://chat.googleapis.com/v1/spaces/AAAASAUsDJo/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=qBmhRgPpSbsNJ1I-cQO9CLXfs4_yyawDt8kRVbpyUFE%3D'

const data = JSON.stringify({
  'text': 'Hello from a Node script!',
});

fetch(webhookURL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  body: data,
}).then((response) => {
  console.log(response);
});