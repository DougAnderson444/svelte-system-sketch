<script>
	export let value;

	let el;

	function handleInput(e) {
		el.setAttribute('data-heading', el.innerText);
		console.log('el.innerText', el.innerText);
		console.log('attr: ', el.attributes['data-heading'].nodeValue, { el });
	}
</script>

<!--  data-heading={value}  -->
<div bind:this={el} on:input={handleInput} contenteditable>{@html value}</div>

<style>
	:root {
		--size: 12vw;
		--drop1: #65f28300;
		--drop2: #dac24900;
		--fuzzy: rgba(106, 241, 120, 0);
	}
	div {
		font-family: 'Luckiest Guy', sans-serif;
		text-transform: uppercase;
		font-size: var(--size);
		text-align: center;
		line-height: 1;
		margin: 0;
		top: 0%;
		left: 0%;
		position: absolute;
		color: #f98ca4;
		text-shadow: -1px -1px 0 #6e1f58, 1px -1px 0 #6e1f58, -1px 1px 0 #6e1f58, 1px 1px 0 #6e1f58,
			1px 0px 0px var(--drop1), 0px 1px 0px var(--drop1), 2px 1px 0px var(--drop1),
			1px 2px 0px var(--drop1), 3px 2px 0px var(--drop1), 2px 3px 0px var(--drop1),
			4px 3px 0px var(--drop1), 3px 4px 0px var(--drop1), 5px 4px 0px var(--drop1),
			3px 5px 0px #6e1f58, 6px 5px 0px #6e1f58, -1px 2px 0 black, 0 3px 0 #6e1f58, 1px 4px 0 #6e1f58,
			2px 5px 0px #6e1f58, 2px -1px 0 #6e1f58, 3px 0 0 #6e1f58, 4px 1px 0 #6e1f58,
			5px 2px 0px #6e1f58, 6px 3px 0 #6e1f58, 7px 4px 0 #6e1f58, 10px 10px 4px var(--drop2);
	}
	div:after,
	div:before {
		content: attr(data-heading);
		position: absolute;
		overflow: hidden;
		left: 0;
		width: 100%;
		top: 0;
		z-index: 5;
	}
	div:before {
		text-shadow: -1px -1px 0 #9e132c, 1px -1px 0 #9e132c, -1px 1px 0 #9e132c, 1px 1px 0 #9e132c,
			1px 0px 0px #f5b10b, 0px 1px 0px #f5b10b, 2px 1px 0px #f5b10b, 1px 2px 0px #f5b10b,
			3px 2px 0px #f5b10b, 2px 3px 0px #f5b10b, 4px 3px 0px #f5b10b, 3px 4px 0px #f5b10b,
			5px 4px 0px #f5b10b, 3px 5px 0px #9e132c, 6px 5px 0px #9e132c, -1px 2px 0 black,
			0 3px 0 #9e132c, 1px 4px 0 #9e132c, 2px 5px 0px #9e132c, 2px -1px 0 #9e132c, 3px 0 0 #2f3e9c,
			4px 1px 0 #9e132c, 5px 2px 0px #9e132c, 6px 3px 0 #9e132c, 7px 4px 0 #9e132c,
			10px 10px 4px var(--fuzzy);
		color: var(--drop1);
		height: 66%;
	}
	div:after {
		height: 33%;
		color: #4ad9db;
		text-shadow: -1px -1px 0 #2f3e9c, 1px -1px 0 #2f3e9c, -1px 1px 0 #2f3e9c, 1px 1px 0 #2f3e9c,
			1px 0px 0px #f98ca4, 0px 1px 0px #f98ca4, 2px 1px 0px #f98ca4, 1px 2px 0px #f98ca4,
			3px 2px 0px #f98ca4, 2px 3px 0px #f98ca4, 4px 3px 0px #f98ca4, 3px 4px 0px #f98ca4,
			5px 4px 0px #f98ca4, 3px 5px 0px #2f3e9c, 6px 5px 0px #2f3e9c, -1px 2px 0 black,
			0 3px 0 #2f3e9c, 1px 4px 0 #2f3e9c, 2px 5px 0px #2f3e9c, 2px -1px 0 #2f3e9c, 3px 0 0 #2f3e9c,
			4px 1px 0 #2f3e9c, 5px 2px 0px #2f3e9c, 6px 3px 0 #2f3e9c, 7px 4px 0 #2f3e9c;
	}
	@font-face {
		font-family: 'Luckiest Guy';
		font-style: normal;
		font-weight: 400;
		src: url(https://fonts.gstatic.com/s/luckiestguy/v17/_gP_1RrxsjcxVyin9l9n_j2hTd52.woff2)
			format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
</style>
