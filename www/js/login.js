(function(){
	var loginModel = new Vue({
		el: '#sj-login',
		data: function() {
			return {
				params: {
					id: 'bboy',
					pwd: 'MYTEST001',
				},
				order: '',
				messages: [],
			}
		},
		mounted: function() {
			IO.on('success', this.message);
		},
		methods: {
			login: function() {
				var _this = this;
				IO.emit('login', this.params)
			},
			message: function(data) {
				// console.log(data)
				// const colorData = data.replace(/\S?\[(\S{1,5})m/gm, 'color');
				const colorData = this.colour(data);
				this.messages = this.messages.concat(colorData);
			},
			colour: function(data) {
				const colors = {
					/*  Foreground Colors  */
					"0;30m": "Black",
					"0;31m": "Red",
					"0;32m": "Green",
					"0;33m": "Yellow",
					"0;34m": "Blue",
					"0;35m": "Magenta",
					"0;36m": "Cyan",
					"0;37m": "White",

					/*  Hi Intensity Foreground Colors  */
					"1;31m": "Red",
					"1;32m": "Green",
					"1;33m": "Yellow",
					"1;34m": "Blue",
					"1;35m": "Magenta",
					"1;36m": "Cyan",
					"1;37m": "White",

					/*  Hi Intensity Background Colors  */
					"41;1m":" Red",
					"42;1m":" Green",
					"43;1m":" Yellow",
					"44;1m":" Blue",
					"45;1m":" Magenta",
					"46;1m":" Cyan",
					"47;1m":" White",

					/*  Background Colors  */
					"40m": "Black",
					"41m": "Red",
					"42m": "Green",
					"43m": "Yellow",
					"44m": "Blue",
					"45m": "Magenta",
					"46m": "Cyan",
					"47m": "White",
					/* Puts everything back to normal */
					"0;0m": "orange"
				};
				var colorData =	data.replace(/(\d{1,2};)?\d{1,2}m/gm, function(color) {
					console.log(color);
					const colorValue = colors[color] ? colors[color] : 'red';
					return `<span style="color: ${colorValue}">`;
				});
				colorData = colorData.replace(/(\s\[){1,2}/gm, function(data, o) {
					console.log(data, o, 11)
				});
				return colorData.split('BLANK');
			},
			sendOrder: function() {
				IO.emit('order', this.order);
			},
			logout: function() {
				IO.emit('logout');
			}
		}
	});
})()