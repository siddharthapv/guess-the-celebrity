<template>
    <div class="container-fluid celebritybox-div">
        <div v-if="currentCelebrity" class="row">
            <div class="col-12" align="center">
                <h1><b>Guess the Celebrity</b></h1>
            </div>
            <div class="col-9 celebrity-div">
                <img class="celebrity-img" :src="currentCelebrity.url" width="940" height="660" alt="">
                <div v-for="i in 11" class="block-row" :key="i">
                    <div v-for="j in 16" @click="removeBlock(i, j)" :class="blockClass(i, j)" :key="j">
                        <span class="block-info">{{i}},{{j}}</span>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="col-12">
                    <button type="button" :disabled="showCelebrity" @click="revealCelebrity" class="btn btn-success">Reveal <i :class="showCelebrity ? 'fa-eye' : 'fa-eye-slash'" class="fa-regular"></i></button>
                    <button type="button" :disabled="!showCelebrity && revealedBlocks.length === 0" @click="resetCelebrity" class="btn btn-danger mx-3">Reset <i class="fa-solid fa-arrows-rotate"></i></button>
                </div>
                <div class="col-12 mt-5">
                    <h3 v-show="!showCelebrity"><b>Remaining chances: {{remainingChances}}</b></h3>
                    <h3 v-show="showCelebrity"><b>Current celebrity: {{currentCelebrity.name}}</b></h3>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-primary mt-5" @click="nextCelebrity">Next <i class="fa-solid fa-chevron-right"></i></button>
                    <div v-if="isShowAlert" class="alert alert-success mt-5" role="alert">
                        switched to next celebrity
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import celebrityList from '../scripts/celebrityList';

export default {
    name: 'CelebrityBox',
    data() {
        return {
            revealedBlocks: [],
            showCelebrity: false,
            currentCelebrity: null,
            isShowAlert: false,
            maxChances: 6,
        };
    },
    created() {
        this.selectNewCelebrity();
    },
    methods: {
        selectNewCelebrity() {
            this.currentCelebrity = celebrityList[Math.floor(Math.random() * celebrityList.length)];
        },
        nextCelebrity() {
            Object.assign(this.$data, this.$options.data());
            this.showAlert();
            this.selectNewCelebrity();
        },
        removeBlock(x, y) {
            if (!this.revealedBlocks.some(e => e === `${x}${y}`)) {
                this.revealedBlocks.push(`${x}${y}`);
            }
        },
        revealCelebrity() {
            this.revealedBlocks = [];
            this.showCelebrity = true;
        },
        resetCelebrity() {
            this.revealedBlocks = [];
            this.showCelebrity = false;
        },
        blockClass(x, y) {
            if (this.showCelebrity) return 'single-block-reveal';
            let blockSelected = this.revealedBlocks.some(e => e === `${x}${y}`);
            return blockSelected ? 'single-block-reveal' : 'single-block';
        },
        showAlert() {
            this.isShowAlert = true;
            setTimeout(() => {
                this.isShowAlert = false;
            }, 500);
        }
    },
    computed: {
        remainingChances() {
            return this.maxChances - this.revealedBlocks.length;
        }
    }
}

</script>

<style>
.celebrity-div {
    height: 100%;
}

.block-row {
    position: relative;
    display: flex;
    z-index: 2;
}

.single-block:hover {
    background-color: #b1b100;
    cursor: pointer;
}

.single-block {
    width: 60px;
    height: 60px;
    background-color: yellow;
    border: 1px solid #b1b100;
}

.single-block-reveal {
    width: 60px;
    height: 60px;
}

.single-block-reveal span {
    display: none;
}

.celebrity-img {
    position: absolute;
    z-index: 1;
    left: 21px;
}

.block-info {
    position: relative;
    top: 30%;
    font-size: 18px;
    font-weight: 500;
}
</style>