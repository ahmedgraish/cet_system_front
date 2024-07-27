<script>
export default {
    data: () => {
        return {
            typeValue: "",
            typeStatus: false,
            displayTextArray: [
                "نشاط الطالب",
                "نشاط الاستاذ",
            ],
            typingSpeed: 100,
            erasingSpeed: 100,
            newTextDelay: 2000,
            displayTextArrayIndex: 0,
            charIndex: 0
        };
    },
    props: {},
    created() {
        setTimeout(this.typeText, this.newTextDelay + 200);
    },
    methods: {
        typeText() {
            if (
                this.charIndex <
                this.displayTextArray[this.displayTextArrayIndex].length
            ) {
                if (!this.typeStatus) this.typeStatus = true;
                this.typeValue += this.displayTextArray[
                    this.displayTextArrayIndex
                ].charAt(this.charIndex);
                this.charIndex += 1;
                setTimeout(this.typeText, this.typingSpeed);
            } else {
                this.typeStatus = false;
                setTimeout(this.eraseText, this.newTextDelay);
            }
        },
        eraseText() {
            if (this.charIndex > 0) {
                if (!this.typeStatus) this.typeStatus = true;
                this.typeValue = this.displayTextArray[
                    this.displayTextArrayIndex
                ].substring(0, this.charIndex - 1);
                this.charIndex -= 1;
                setTimeout(this.eraseText, this.erasingSpeed);
            } else {
                this.typeStatus = false;
                this.displayTextArrayIndex += 1;
                if (this.displayTextArrayIndex >= this.displayTextArray.length)
                    this.displayTextArrayIndex = 0;
                setTimeout(this.typeText, this.typingSpeed + 1000);
            }
        }
    }
};
</script>

<template>
    <div class="font-Somar  text-3xl xl:text-5xl font-theme-heading text-center lg:text-right text-curious-blue-700">
        <h1 class=" text-curious-blue-900">
            <span class="blinking-cursor">|</span>
            <span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
            منصة إدارة
            <span class="text-curious-blue-300">{{ typeValue }}</span>
        </h1>
    </div>
</template>



<style>
/* // Cursor blinking CSS Starts... */
.blinking-cursor {
    -webkit-animation: 1s blink step-end infinite;
    -moz-animation: 1s blink step-end infinite;
    -ms-animation: 1s blink step-end infinite;
    -o-animation: 1s blink step-end infinite;
    animation: 1s blink step-end infinite;
}

@keyframes blink {

    from,
    to {
        color: transparent;
    }

    50% {
        color: #2c3e50;
    }
}

@-moz-keyframes blink {

    from,
    to {
        color: transparent;
    }

    50% {
        color: #2c3e50;
    }
}

@-webkit-keyframes blink {

    from,
    to {
        color: transparent;
    }

    50% {
        color: #2c3e50;
    }
}

@-ms-keyframes blink {

    from,
    to {
        color: transparent;
    }

    50% {
        color: #2c3e50;
    }
}

@-o-keyframes blink {

    from,
    to {
        color: transparent;
    }

    50% {
        color: #2c3e50;
    }
}

/* // Cursor blinking CSS Ends... */
</style>