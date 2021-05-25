<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  @apply mt-5 flex justify-center items-center text-center mx-auto;
}

button {
  @apply bg-green-300 text-2xl font-bold p-4 rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.chart-wrapper {
  margin: 20px;
}

@-webkit-keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.corners {
  width: 60px;
  height: 60px;
  position: relative;
  transform-origin: center;
  -webkit-animation: spin 3s infinite linear;
          animation: spin 3s infinite linear;
}
.corner {
  width: 100%;
  height: 100%;
  position: absolute;
}
.corner::before {
  display: block;
  width: 48%;
  height: 48%;
  border-radius: 0 40% 0 40%;
  background-color: #6DC82A;
  content: '';
}
@-webkit-keyframes spin1 {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(0deg);
  }
  70% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin1 {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(0deg);
  }
  70% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes spin2 {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(270deg);
  }
  70% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin2 {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(270deg);
  }
  70% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes spin3 {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(180deg);
  }
  70% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin3 {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(180deg);
  }
  70% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes spin4 {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(90deg);
  }
  70% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin4 {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(90deg);
  }
  70% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.corner--1 {
  -webkit-animation: spin1 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
          animation: spin1 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
.corner--2 {
  -webkit-animation: spin2 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
          animation: spin2 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
.corner--3 {
  -webkit-animation: spin3 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
          animation: spin3 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
.corner--4 {
  -webkit-animation: spin4 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
          animation: spin4 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

button {
  animation: 1s appear;
  margin: auto;
}


.SlogenWrpapper {
  @apply flex-1 justify-center items-center text-center mx-auto;
  animation: 1s appear;
  margin: auto;
}
.ButtonWrpapper {
  @apply flex-1 justify-center items-center text-center mx-auto;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
    animation: 1s appear;
  margin: auto;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

</style>
