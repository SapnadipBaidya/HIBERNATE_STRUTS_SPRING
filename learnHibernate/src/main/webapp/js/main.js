Ext.define('MyApp', {
	extend: 'Ext.Panel',
	xtype: "MyApp",
	config: {
		myProp1: null,
		myProp2: null
	},

	constructor: function(config) {
		this.callParent(arguments);

		// Set properties passed in through the constructor
		if (config) {
			this.setConfig(config);
		}
	},

	initComponent: function() {
		// Set up the component using the properties
		// defined in the config object
		this.title = this.getMyProp1();
		this.html = this.getMyProp2();

		this.callParent(arguments);
	}
});



Ext.onReady(function() {



	Ext.create("Ext.container.Container", {
		layout: { type: "vbox", pack: "center", align: "center" },
		height: 700,
		items: [{ xtype: "custom.RegisterBox" }], renderTo: Ext.getBody()
	})

});

