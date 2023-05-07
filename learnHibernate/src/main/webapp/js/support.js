let myStore = Ext.create('Ext.data.Store', {
	storeId: "myStore",
	fields: ['name', 'age', 'email'],
	data: [
		{ name: 'John', password: 12345, email: 'john@example.com' },
		{ name: 'Jane', password: 12345, email: 'jane@example.com' },
		{ name: 'Bob', password: 12345, email: 'bob@example.com' }
	]
});


console.log(myStore.getData().items)

let enableRegisterBtn = () => {
	//console.log('The value of the field has changed', field, newValue, oldValue, eOpts);
	const fields = [Ext.getCmp("username"), Ext.getCmp("email"), Ext.getCmp("password"), Ext.getCmp("cpassword")]
	Ext.getCmp("regBtn").setDisabled(true)
	if (fields.map((item) => (item.getValue(), item.getValue().length > 0)).every(item => item == true)) {
		Ext.getCmp("regBtn").setDisabled(false)

	}
}
Ext.define("custom.RegisterBox", {
	id: "registerbox",
	xtype: "custom.RegisterBox",
	extend: "Ext.form.Panel",

	style: { padding: "10px", border: "solid 1px black" },
	items: [
		{
			xtype: "container",
			layout: { type: "hbox", pack: "center", align: "center" },

			items: [

				{
					xtype: "container",
					layout: { type: "hbox", pack: "top", align: "top" },
					style: { paddingRight: "40px" },
					items: [{
						xtype: 'displayfield',
						value: '<h2>Hyd Readiness 2023</h2>'
					}]
				},
				{

					xtype: "container",
					layout: { type: "hbox", pack: "center", align: "center" },
					items: [{
						xtype: 'image',
						src: './js/images.png',
						width: 120,
						height: 25,
						alt: 'My image'
					}]
				}],
			style: { padding: "10px", border: "solid 1px black" },
			height: 70
		},
		{
			xtype: "container",

			layout: { type: "vbox", pack: "center", align: "center" },
			style: { padding: "5px", border: "solid 1px black", marginTop: "10px" },
			items: [
				{
					xtype: "textfield",
					id: "username",
					fieldLabel: "Username",
					name: "username",
					emptyText: "Username",
					width: 250,
					allowBlank: false,
					listeners: {
						change: () => enableRegisterBtn()
					}
				},
				{
					xtype: "textfield",
					id: "email",
					fieldLabel: "Email",
					name: "email",
					emptyText: "Email",
					width: 250,
					vtype: "email",
					allowBlank: false,
					listeners: {
						change: () => enableRegisterBtn()
					}
				}, {



					xtype: "container",
					layout: { type: "hbox", pack: "center", align: "center" },
					items: [{
						xtype: "textfield",
						id: "password",
						fieldLabel: "Password",
						name: "password",
						emptyText: "Password",
						width: 220,
						inputType: 'password',
						allowBlank: false,
						listeners: {
							change: () => enableRegisterBtn()
						}
					}, {
						xtype: "button",
						id: "hideshowpass",
						iconCls: 'fa fa-eye',
						tooltip: 'Show password',
						name: "hideshowpass",
						width: 30,
						handler: function() {
							Ext.getCmp("password").getValue().length === 0 ? Ext.getCmp("password").focus() : null;
							Ext.getCmp("password").inputEl.dom.type !== "text" && Ext.getCmp("password").getValue().length > 0 ? Ext.getCmp("password").inputEl.dom.type = "text" : Ext.getCmp("password").inputEl.dom.type = "password"
						}
					}]
				}, {

					xtype: "container",
					layout: { type: "hbox", pack: "center", align: "center" },
					items: [{
						xtype: "textfield",
						id: "cpassword",
						fieldLabel: "Confirm password",
						emptyText: "Retype Password",
						name: "cpass",
						width: 220,
						inputType: 'password',
						listeners: {
							change: () => enableRegisterBtn()
						}
					}, {
						xtype: "button",
						id: "hideshowcpass",
						iconCls: 'fa fa-eye',
						tooltip: 'Show password',
						name: "hideshowcpass",
						width: 30,
						handler: function() {
							Ext.getCmp("cpassword").getValue().length === 0 ? Ext.getCmp("cpassword").focus() : null;
							Ext.getCmp("cpassword").inputEl.dom.type !== "text" && Ext.getCmp("cpassword").getValue().length > 0 ? Ext.getCmp("cpassword").inputEl.dom.type = "text" : Ext.getCmp("cpassword").inputEl.dom.type = "password"
						}
					}]
				}, {
					xtype: "container",
					width: 250,
					layout: "center",
					items: [{
						xtype: "button", id: "regBtn",
						text: 'Register',
						align: 'center',
						disabled: true,
						width: 130,
						listeners: {
							click: () => {

								if (Ext.getCmp("password").getValue() === Ext.getCmp("cpassword").getValue()) {
									let form = Ext.getCmp("registerbox").getForm();
									let data = form.getValues()
									console.log(data)
									if (form.isValid()) {
										Ext.Ajax.request({
											url: 'storedata',
											method: 'POST',
											params: { data: JSON.stringify(data) },
											success: function(response) {
												// handle success response
												const jsonData = Ext.JSON.decode(response.responseText).jsonString;
												console.log(jsonData)
												if (!jsonData?.newUser) {
													console.log(jsonData?.newUser)
													Ext.Msg.show({
														title: 'Error', message: `<div>User Already Registered<br>UserName : ${jsonData?.username} </div>`, closable: false, buttons: Ext.Msg.OKCANCEL
													});

													return 0;
												}
												Ext.Msg.alert('SUCCESS', 'Login saved');
												Ext.getCmp("cpassword").setValue('');
												Ext.getCmp("password").setValue('');
												Ext.getCmp("username").setValue('');
												Ext.getCmp("email").setValue('');
											},
											failure: function(response) {
												Ext.Msg.show({
													title: 'Error', message: `<div>User Error Registering <br/> ${response.status}</div>`, closable: false, buttons: Ext.Msg.OKCANCEL
												});
											}
										});
									}


								}
								else {
									Ext.getCmp("cpassword").setValue('');
									Ext.getCmp("cpassword").focus()
									Ext.getCmp("password").inputEl.dom.type !== "text" && Ext.getCmp("password").getValue().length > 0 ? Ext.getCmp("password").inputEl.dom.type = "text" : Ext.getCmp("password").inputEl.dom.type = "password"
									Ext.Msg.alert('Password Mismatch', '<div>Please Enter the same password <br> </div>');
								}

							}
						}
					}]


				}

			]
		},


	],

	height: 400,
	width: 400
})






