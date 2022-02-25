function changeBg() {

    const grad = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),"
    const images = [
        'url("https://static.thatsup.co/content/img/article/13/sep/h%C3%A4r-hittar-du-stockholms-b%C3%A4sta-renodlade-hamburgerrestauranger.jpg")',
        'url("https://www.forumdaily.com/wp-content/uploads/2018/07/Depositphotos_88670080_m-2015.jpg")'
    ]

    // const body = document.getElementsByTagName("BODY")[0]
    let bg = images[Math.floor(Math.random() * images.length)];
    // body.style.backgroundImage = `${grad}${bg}`;
    bg = `${grad}${bg}`
    $('body').fadeTo('slow', 0.3, function () {
        $(this).css('background-image', bg);
    }).delay(1000).fadeTo('slow', 1);

    console.log("works")

}

setInterval(changeBg, 1000)

// console.log('skjlah')