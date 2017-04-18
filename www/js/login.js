(function(){
	var loginModel = new Vue({
		el: '#sj-login',
		data: function() {
			return {
				params: {
					id: 'bboy',
					pwd: 'MYTEST001',
				},
			}
		},
		mounted: function() {
			// IO.on('success', this.message);
			IO.on('success', function(data) {
				window.location.href = 'index';
			})
		},
		methods: {
			login: function() {
				var _this = this;
				IO.emit('login', this.params)
			},
			logout: function() {
				IO.emit('logout');
			}
		}
	});
})()