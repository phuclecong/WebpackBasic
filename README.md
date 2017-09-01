# Command
**Clean**
```
npm run clean
```

**Build**
```
npm run build
```

**Start with webpack-dev-server**
```
npm run start
```

# Webpack

## [Configuration](https://webpack.github.io/docs/configuration.html)
```
npm i --save-dev webpack
```

```js
//webpack.config.js
const path = require('path');
const vendorLibs = ['react'];

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('styles.[chunkhash].css');

const webpack = require('webpack');
const commonChunk = new webpack.optimize.CommonsChunkPlugin({
    name: ['vendor', 'manifest']
})

const HtmlWebpackPlugin = require('html-webpack-plugin');
const html = new HtmlWebpackPlugin({
    template: 'src/index.html',
    "assets": {
        "style"  : "styles.[chunkHash].css",
    }
});

const config = {
    entry: {
        bundle: './src/index.js',
        vendor: vendorLibs
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[chunkhash].js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader'],
            //     exclude: /node_modules/
            // },
            {
                test: /\.css$/,
                use: extractCSS.extract([ 'css-loader']),
                exclude: /node_modules/
            },

            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40000
                        }
                    },
                    'image-webpack-loader'
                ]
            }

        ]
    },

    plugins: [
        extractCSS,
        commonChunk,
        html
    ],

    devtool: 'source-map'
}

module.exports = config;


```

## JS module
![](https://drive.google.com/uc?id=0B_-Qo3g6wqWedE1tSDhvWm9pY1U)

![](https://drive.google.com/uc?id=0B_-Qo3g6wqWeRU81YXI5REZOeDA)

![](https://drive.google.com/uc?id=0B_-Qo3g6wqWeQm9qemlzOUExWjA)


```js
//sum.js
const sum = (a, b) => a + b;

export default sum;
```

```js
//index.js
import sum from './sum';

const total = sum(5, 10);

console.log(total);

```

```js
//webpack.config.js
const path = require('path');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}

module.exports = config;

```

```js
//package.json
"scripts": {
  "build": "webpack"
}
```

```
npm run build
```

## Loader

### [babel-loader](https://github.com/babel/babel-loader)

![](https://drive.google.com/uc?id=0B_-Qo3g6wqWeMUlVRjFjejF1X1k)

```
npm i --save-dev babel-loader babel-core babel-preset-env
```

```js
//.babelrc
{
  "presets": ["env"]
}
```

```js
//webpack.config.js
module: {
    rules: [
        {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }
    ]
}
```

### [style-loader](https://github.com/webpack-contrib/style-loader), [css-loader](https://github.com/webpack-contrib/css-loader)

![](https://drive.google.com/uc?id=0B_-Qo3g6wqWeN1hKSTBOT3RQUjg)

```
npm i --save-dev style-loader css-loader
```

```js
//webpack.config.js
{
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
    exclude: /node_modules/
}
```

```css
/* image-viewer/style.css */
.image-viewer {
    border: 5px solid #000;
}
```

```js
/* image-viewer/index.js */
import './style.css';

class ImageViewer {
    constructor() {

    }

    renderImage(src) {
        const image = document.createElement('img');
        image.src = src;
        image.className = 'image-viewer';

        document.body.appendChild(image);
    }
}

export default ImageViewer;

```

```js
// index.js
import ImageViewer from './image-viewer';

const NewImageViewer = new ImageViewer();

NewImageViewer.renderImage('http://lorempixel.com/300/300/');

```

### [Extract Text Plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)

```
npm i --save-dev extract-text-webpack-plugin
```

```js
//webpack.config.js

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('styles.css');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader'],
            //     exclude: /node_modules/
            // },
            {
                test: /\.css$/,
                use: extractCSS.extract([ 'css-loader']),
                exclude: /node_modules/
            }

        ]
    },

    plugins: [
        extractCSS
    ]
}

module.exports = config;

```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <link rel="stylesheet" href="./build/styles.css">
    </head>
    <body>

    <script type="text/javascript" src="./build/bundle.js"></script>
    </body>
</html>

```

### [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader), [url-loader](https://github.com/webpack-contrib/url-loader)

> image ====> image-webpack-loader ====> url-loader ====> is the image small?
> - yes: return raw data
> - no: export image and return url

```
brew install libpng
npm i --save-dev image-webpack-loader url-loader file-loader
```

```js
//webpack.config.js

// output
output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'build/' //folder for url-loader output images
},

// module - rules
{
    test: /\.(gif|png|jpe?g|svg)$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 40000
            }
        },
        'image-webpack-loader'
    ]
}
```

```js
/* image-viewer/index.js */
import './style.css';
import big from './images/big.png';
import small from './images/small.png';

class ImageViewer {
    constructor() {

    }

    renderImage(src) {
        const image = document.createElement('img');
        image.src = src;
        image.className = 'image-viewer';

        document.body.appendChild(image);
    }

    renderBig() {
        this.renderImage(big);
    }

    renderSmall() {
        this.renderImage(small);
    }
}

export default ImageViewer;
```

```js
// index.js
import ImageViewer from './image-viewer';

const NewImageViewer = new ImageViewer();

NewImageViewer.renderImage('http://lorempixel.com/300/300/');
NewImageViewer.renderSmall();
NewImageViewer.renderBig();
```

## [Lazy loading](https://webpack.js.org/guides/lazy-loading/)

```js
const button = document.createElement('button');

button.innerText = 'Show image';
button.onclick = () => {
    System.import('./image-viewer').then(module => {
        const ImageViewer = module.default;
        const NewImageViewer = new ImageViewer();

        NewImageViewer.renderSmall();
    })
}

document.body.appendChild(button);
```

## [Split app and vendor code](https://webpack.github.io/docs/code-splitting.html)
```js
// webpack.config.js
const vendorLibs = ['react'];

entry: {
    bundle: './src/index.js',
    vendor: vendorLibs
},

output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name][chunkhash].js',
},
```

## [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/)
Problem:
- vendor.js:
> react
- bundle.js:
> import react from 'react';

=> react codes was import twice: one on vendor.js, one on bundle.js

** CommonsChunkPlugin will resolve this problem **

```js
// webpack.config.js
const webpack = require('webpack');
const commonChunk = new webpack.optimize.CommonsChunkPlugin({
    name: ['vendor']
})

//Entry
entry: {
    bundle: './src/index.js',
    vendor: vendorLibs
},

//Plugin
plugins: [
    extractCSS,
    commonChunk,
    html
]
```

## [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)
> The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles.

```
npm install --save-dev html-webpack-plugin
```

```js
//webpack.config.js
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('styles.[chunkhash].css');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const html = new HtmlWebpackPlugin({
    template: 'src/index.html',
    "assets": {
        "style"  : "styles.[chunkHash].css",
    }
});

//Plugins
plugins: [
    extractCSS,
    commonChunk,
    html
]
```

```html
<!-- src/index.html -->
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>

    </head>
    <body>

    </body>
</html>
```

## [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
> Use webpack with a development server that provides live reloading. This should be used for development only.

```
npm install --save-dev webpack-dev-server
```

```js
// pakage.json
"scripts": {
  "clean": "rimraf build",
  "build": "npm run clean && webpack",
  "server": "webpack-dev-server"
},
```

```
npm run server
```
