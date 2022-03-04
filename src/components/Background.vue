<template >
    <div>
        <section>
            <div class="fundo">
                <div class="mt-16 text--white"></div>
            </div>
        </section>
    </div>
</template>
<script>

export default {};
</script>
<style >




.fundo {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-image: url(../../public/backgrounds-image.jpg);
    
}




html,
body {
    
    min-height: 100%;
}

body {
    font-family: "Oswald", sans-serif;
    color: #fff;
    background-color: rgb(0, 0, 0);
}





* {
    
    margin: 0;
    padding: 0;
}
header {
    background-color: rgba(0, 0, 0, 0.9);
    color: #ffffff;
    display: block;
    font: 14px/1.3 Arial, sans-serif;
    height: 50px;
    position: relative;
    z-index: 5;
}
h2 {
    margin-top: 30px;
    text-align: center;
}
header h2 {
    font-size: 22px;
    margin: 0 auto;
    padding: 10px 0;
    width: 80%;
    text-align: center;
}
header a,
a:visited {
    text-decoration: none;
    color: #fcfcfc;
}


</style>