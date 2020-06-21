# Welcome to my Portfolio Repo
I'm in the process of completely converting the CSS into SCSS using Gulp and will also be using it to minify libraries and stylesheets, as well as revamp the file structure.

```docker build -t html-server-image:v1 .```

```docker run -d -p 8100:80 -v <path-to-site-directory>:/usr/share/nginx/html  html-server-image:v1```

Install Gulp

```npm install --save-dev gulp gulp-concat```

```npm install --save-dev gulp-clean-css gulp-minify```