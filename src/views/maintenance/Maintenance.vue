<template >
    <div>
        
        
    </div>
</template>
<script>

export default {
    
    data() {
        return {
           
        }
    },
    mounted() {
        
    },
    methods: {
     
    }
}

</script>
<style lang="scss">
#c {
    height: 200px;
    width: 400px;
    border: 1px solid gray;
}
.lista-naves {
    padding-top: 50vh;
    display: flex;
    flex-direction: row;
}

div.tremendo {
    animation: shake 1s;
    animation-iteration-count: infinite;
}

#nave {
    max-width: 78px;
    width: 78px;
    height: auto;
}

.fogueira {
    transform: rotateX(180deg);
    width: 20px;
}

#fogueiras {
    display: flex;
    justify-content: space-around;
    max-width: 78px;
}

@keyframes shake {
    0% {
        transform: translate(1px, 1px) rotate(0deg);
    }

    10% {
        transform: translate(-1px, -2px) rotate(-1deg);
    }

    20% {
        transform: translate(-3px, 0px) rotate(1deg);
    }

    30% {
        transform: translate(3px, 2px) rotate(0deg);
    }

    40% {
        transform: translate(1px, -1px) rotate(1deg);
    }

    50% {
        transform: translate(-1px, 2px) rotate(-1deg);
    }

    60% {
        transform: translate(-3px, 1px) rotate(0deg);
    }

    70% {
        transform: translate(3px, 1px) rotate(-1deg);
    }

    80% {
        transform: translate(-1px, -1px) rotate(1deg);
    }

    90% {
        transform: translate(1px, 2px) rotate(0deg);
    }

    100% {
        transform: translate(1px, -2px) rotate(-1deg);
    }
}

@keyframes scale-display {
    from {
        opacity: 0;
        /* -webkit-transform: scale(0); */
    }

    to {
        opacity: 1;
        /* -webkit-transform: scale(1); */
    }
}
</style>