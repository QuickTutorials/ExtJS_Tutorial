Ext.define('My.model.Author', {
    extend: 'Ext.data.Model',
    fields: [ 'name' ]
});

Ext.define('My.model.Comment', {
    extend: 'Ext.data.Model',
    fields: [ 'emailAddress', 'body' ]
});

Ext.define('My.model.BlogPost', {
    extend: 'Ext.data.Model',
    fields: [ 'title', 'body' ],
    belongsTo: [
        {
            name: 'author',
            instanceName: 'author',
            model: 'My.model.Author',
            getterName: 'getAuthor',
            setterName: 'setAuthor',
            associationKey: 'author'
        }
    ],
    hasMany: [
        {
            name: 'comments',
            model: 'My.model.Comment',
            associationKey: 'comments'
        }
    ],
    proxy: {
        type: 'rest',
        url: 'blog-posts.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

var store = new Ext.data.Store({
    model: 'My.model.BlogPost'
});

store.load(function(records) {
    alert("Loaded " + store.getCount() + " records");
});

/*
for (i in [0,1]){
 My.model.BlogPost.load(i, {
    success: function(record, operation) {
        console.log(record.get('title'));
        console.log(record.getAuthor().get('name'));
        console.log(record.comments().getCount());
	console.log(record.data);
	console.log(record.raw);
    }
 });
}
*/

