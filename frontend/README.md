# animalinfo - frontend
A RESTful API for Animalinfo Database with Node Express
---

## First
```bash
echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## Installation & Run
```bash
git clone {project URL}
cd animalinfo/frontend
yarn install
yarn run start

URL : http://127.0.0.1:8088
```


Before running Service, you should set the src/config.jsx file with yours or set the your config with my values on [.src/config.jsx-sample]
```
export const BACKEND_API = "http://localhost:8081";
```
