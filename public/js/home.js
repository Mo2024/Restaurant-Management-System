
function changeBg() {

    const grad = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),"
    const images = [
        'url("/icons/burger1.jpg")',
        'url("/icons/burger2.jpg")',
        'url("/icons/burger3.jpg")'
    ]

    const body = document.getElementsByTagName("BODY")[0]
    let bg = images[Math.floor(Math.random() * images.length)];
    body.style.backgroundImage = `${grad}${bg}`;
}

setInterval(changeBg, 5000);