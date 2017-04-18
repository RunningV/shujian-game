(function(){
	var loginModel = new Vue({
		el: '#sj-index',
		data: function() {
			return {
				order: '',
				messages: [],
			}
		},
		mounted: function() {
			IO.on('message', this.message);
		},
		methods: {
			message: function(data) {
				var dataArray = data.match(/\S+\r/gm)
				if(dataArray) {
					dataArray = dataArray.filter(item => {
						return !!item;
					});
					dataArray = dataArray.map(item => {
						return this.colour(item);
					});
					this.messages = this.messages.concat(dataArray);
					setTimeout(() => {
						this.$refs.messageBox.scrollTop = this.$refs.messageBox.scrollHeight;
					}, 0);
				}
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
				var colorData =	data.replace(/\[(\d*\;?\d{1,2}m)/gm, function(color, value) {
					const colorValue = colors[value] ? colors[value] : 'red';
					return `</span><span style="color: ${colorValue}">`;
				});
				colorData = colorData.slice(0, 7) === '</span>' ? colorData.slice(7) : colorData;
				return colorData;
			},
			sendOrder: function() {
				console.log(this.order)
				IO.emit('order', this.order);
			},
			logout: function() {
				IO.emit('logout');
			}
		}
	});
})()