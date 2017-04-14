(function(){
	var loginModel = new Vue({
		el: '#sj-login',
		data: function() {
			return {
				params: {
					id: 'bboy',
					pwd: 'MYTEST001',
				}
			}
		},
		methods: {
			login: function() {
				var _this = this;
				console.log(this.params);
				IO.send(this.params)
			}
		},
	});
})()