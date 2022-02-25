
function changeBg() {

    const grad = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),"
    const images = [
        'url("https://static.thatsup.co/content/img/article/13/sep/h%C3%A4r-hittar-du-stockholms-b%C3%A4sta-renodlade-hamburgerrestauranger.jpg")',
        'url("https://www.forumdaily.com/wp-content/uploads/2018/07/Depositphotos_88670080_m-2015.jpg")'
    ]

    const body = document.getElementsByTagName("BODY")[0]
    let bg = images[Math.floor(Math.random() * images.length)];
    body.style.backgroundImage = `${grad}${bg}`;
}

setInterval(changeBg, 5000);