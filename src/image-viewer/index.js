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
