//JS Module
import sum from './sum';
const total = sum(5, 10);
console.log(total);


//Loader
import ImageViewer from './image-viewer';

const NewImageViewer = new ImageViewer();
NewImageViewer.renderImage('http://lorempixel.com/300/300/');
NewImageViewer.renderSmall();
NewImageViewer.renderBig();


//Lazy loading
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

//CommonsChunkPlugin
//import react from 'react';
