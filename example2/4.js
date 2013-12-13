/*global Ext:false */
var global_store,global_panel;
Ext.onReady(function () {
    var itemsPerPage = 4; // set the number of items you want per page
    var store = Ext.create('Ext.data.Store', {
        id: 'simpsonsStore',
        autoLoad: false,
        fields: ['label', 'url', 'type'],
        pageSize: itemsPerPage, // items per page
        proxy: {
            type: 'ajax',
            url: '4.json', 
            reader: {
                type: 'json',
                root: 'seeAlso',
                totalProperty: 'total'
            }
        }
    });
    global_store=store;

    // specify the page you want to load
    store.loadPage(1);

    global_panel=Ext.create('Ext.grid.Panel', {
        title: 'Simpsons',
        store: store,
        columns: [
	{
	/*
            header: 'Id',
            dataIndex: 'id'
        }, {
	*/
            header: 'Label',
            dataIndex: 'label'
        }, {
            header: 'Url',
            dataIndex: 'url',
            flex: 1
        }, {
            header: 'Type',
            dataIndex: 'type'
        }
	],
        width: 400,
        height: 125,
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: store, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
        }],
        renderTo: Ext.getBody()
    });
});
