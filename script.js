// Select the button and add a click event listener
document.querySelector('button').addEventListener('click', handleClick);

function handleClick(e) {
    const imageLink = 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Tokyo_Sky_Tree_2012.JPG';
    const downloadSize = 8185374;
    
    // Hide loader content and display loader
    const loaderContent = document.querySelector('.loader-content');
    const loader = document.querySelector('.loader');
    loaderContent.classList.add('hide');
    loader.classList.remove('hide');
    
    // Record start time for download
    const time_start = new Date().getTime();
    
    // Create a new image element
    const downloadSrc = new Image();
    
    // Add a timestamp to avoid caching
    const cacheImg = `?nn=${time_start}`;
    downloadSrc.src = imageLink + cacheImg;
    
    // When the image is loaded
    downloadSrc.onload = function () {
        const time_end = new Date().getTime();
        const timeDuration = (time_end - time_start) / 1000;
        const loadedBytes = downloadSize * 8;
        const totalSpeed = ((loadedBytes / timeDuration) / 1024 / 1024).toFixed(2);

        // Animate displaying the download speed
        displayDownloadSpeed(totalSpeed);

        // Show loader content, update UI, and change button text
        loaderContent.classList.remove('hide');
        loaderContent.classList.add('result');
        loader.classList.add('hide');
        document.querySelector('.content').classList.remove('hide');
        e.target.innerText = 'CHECK AGAIN';
    };
}

function displayDownloadSpeed(totalSpeed) {
    let i = 0;

    // Function to animate displaying the download speed
    function animate() {
        const content = document.querySelector('.content');
        if (i < totalSpeed) {
            content.innerHTML = i.toFixed(2) + '<small>Mbps</small>';
            setTimeout(animate, 20);
            i += 1.02;
        } else {
            content.innerHTML = totalSpeed + '<small>Mbps</small>';
        }
    }

    // Start the animation
    animate();
}
