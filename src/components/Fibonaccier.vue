<template>
  <div>
    <h1>The Fibonaccier</h1>
    <div class="container">
      <div class="next">
        <router-link v-bind:to="`/fib/${currentFibIndex + 1}`"
                     v-bind:class="{ disabled: animation !== '' }">Next &gt;&gt;</router-link>
      </div>
      <div class="number" v-bind:class="animation">
        <span v-on:animationend="animation = ''">{{fibonacci(currentFibIndex - 1)}}</span>
      </div>
      <div class="prev">
        <router-link v-bind:to="`/fib/${currentFibIndex - 1}`"
                     v-bind:class="{ disabled: currentFibIndex === 1 || animation !== '' }">&lt;&lt; Previous</router-link>
        </div>
      <div class="jumpTo">
        <a href="#" v-on:click="openJump" v-show="!showJump">Jump to...</a>
        <span v-show="showJump"><input v-model="jumpTo" type="number" min="1"> <button v-on:click="jump()">Go!</button></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      currentFibIndex: 1,
      showJump: false,
      fibMem: {},
      jumpTo:'',
      animation: ''
    }
  },
   beforeRouteEnter (to, from, next) {
      next(vm => {
        if (to.params.index) vm.currentFibIndex = parseInt(to.params.index);        
      });
  },
  beforeRouteUpdate (to, from, next) {
      let newIndex = parseInt(to.params.index);
      //timeout to sync value change with the animation
      setTimeout(() => {
        this.currentFibIndex = newIndex;
      }, 350);      
      window.localStorage.setItem('fib-index', newIndex);
      //set animation direction
      this.animation = newIndex > parseInt(this.$router.history.current.params.index) ? 'forward' : 'backward';
      next();
  },
  methods: {
    //memoized fibonacci function
    fibonacci: function(num) {

      if (this.fibMem[num]) return this.fibMem[num];
      if (num <= 1) return 1;

      return this.fibMem[num] = this.fibonacci(num - 1) + this.fibonacci(num - 2);
    },
    openJump: function(e) {
      //prevent adding # to the url
      e.preventDefault();
      this.jumpTo = '';
      this.showJump = true;
    },
    jump: function() {
      this.showJump = false;
      if (this.$router.history.current.params.index !== this.jumpTo) {
        this.$router.push(`/fib/${this.jumpTo}`);
      }
    }
  },
  created() {
    let index = window.localStorage.getItem('fib-index');
    if (this.$router && this.$router.history.current.path === '/') {
      this.$router.push(`/fib/${index ? index : 1}`);
    }    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .container {
    display: grid;
    justify-content: center;
    grid-template-columns: 100px 120px 100px;
    grid-template-rows: auto;
    align-items: center;
    grid-template-areas:
        "prev number next"
        "jump jump jump";

    .number {
      border: 1px solid black;
      grid-area: number;
      padding: 30px 0 30px 0;
      align-self: center;
      display: flex;
      justify-content: center;

      &.forward span {
        animation:switch 0.7s linear;
      }

      &.backward span {
        animation:switch 0.7s linear;
        animation-direction: reverse;
      }
    }

    .next {
      grid-area:next;
    }

    .prev {
      grid-area:prev;
      user-select: none;
    }

    .disabled {
        color:grey;
        pointer-events: none;
    }

    .jumpTo {
      grid-area:jump;
      margin-top:10px;

      input {
        width:40px;

        &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }

  @keyframes switch { 
    50% {transform:rotate(180deg) scale(0)}
    100% {transform:rotate(360deg) scale(1)}
  }

  @media (max-width:480px) {
    .container {
      grid-template-columns: 100px 100px;
      grid-template-areas:
          "number number"
          "prev next"
          "jump jump";

        .number {
          width: 120px;
          justify-self: center;
          margin-bottom: 10px;
        }
    }
  }
</style>
